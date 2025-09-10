import { NextResponse } from 'next/server';

// API 엔드포인트 설정
const API_BASE_URL = 'https://run.blu2print.site:8082/api';
const SITE_BASE_URL = 'https://www.cheongyakplanet.site';

// API 호출 함수들
async function fetchAllSubscriptions() {
  try {
    // 첫 번째 요청으로 총 페이지 수를 확인
    const firstResponse = await fetch(`${API_BASE_URL}/info/subscription?page=0&size=50`);
    const firstData = await firstResponse.json();

    if (!firstData.data || !firstData.data.content) {
      return [];
    }

    const totalPages = firstData.data.totalPages || 1;
    let allSubscriptions = [...firstData.data.content];

    // 나머지 페이지들을 병렬로 가져오기
    if (totalPages > 1) {
      const promises = [];
      for (let page = 1; page < totalPages; page++) {
        promises.push(
          fetch(`${API_BASE_URL}/info/subscription?page=${page}&size=50`)
            .then((res) => res.json())
            .then((data) => data.data?.content || []),
        );
      }

      const additionalPages = await Promise.all(promises);
      allSubscriptions = allSubscriptions.concat(...additionalPages);
    }

    return allSubscriptions;
  } catch (error) {
    console.error('Error fetching all subscriptions:', error);
    return [];
  }
}

async function fetchAllCommunityPosts() {
  try {
    // 첫 번째 요청으로 총 페이지 수를 확인
    const firstResponse = await fetch(`${API_BASE_URL}/community/posts?sort=time&page=0&size=50`);
    const firstData = await firstResponse.json();

    if (!firstData.data || !firstData.data.content) {
      return [];
    }

    const totalPages = firstData.data.totalPages || 1;
    let allPosts = [...firstData.data.content];

    // 나머지 페이지들을 병렬로 가져오기 (최대 10페이지까지만)
    const maxPages = Math.min(totalPages, 10); // 너무 많은 페이지는 제한
    if (maxPages > 1) {
      const promises = [];
      for (let page = 1; page < maxPages; page++) {
        promises.push(
          fetch(`${API_BASE_URL}/community/posts?sort=time&page=${page}&size=50`)
            .then((res) => res.json())
            .then((data) => data.data?.content || []),
        );
      }

      const additionalPages = await Promise.all(promises);
      allPosts = allPosts.concat(...additionalPages);
    }

    return allPosts;
  } catch (error) {
    console.error('Error fetching all community posts:', error);
    return [];
  }
}

// URL 생성 헬퍼 함수
function createUrlEntry(loc: string, lastmod: string, changefreq: string, priority: string) {
  return `
    <url>
      <loc>${loc}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`;
}

export async function GET() {
  const currentDate = new Date().toISOString();

  try {
    console.log('Starting sitemap generation...');

    // 모든 데이터를 병렬로 가져오기
    const [subscriptions, posts] = await Promise.all([fetchAllSubscriptions(), fetchAllCommunityPosts()]);

    console.log(`Found ${subscriptions.length} subscriptions and ${posts.length} posts`);

    // 사이트맵 XML 시작
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // 1. 정적 페이지들 - SEO 우선순위 최적화
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'daily' }, // 홈페이지 최우선
      { url: '/subscription', priority: '0.9', changefreq: 'daily' }, // 청약 목록 높은 우선순위
      { url: '/community', priority: '0.8', changefreq: 'daily' }, // 커뮤니티
      { url: '/subscription/guide', priority: '0.8', changefreq: 'weekly' }, // 청약 가이드
      { url: '/subscription/calculator', priority: '0.8', changefreq: 'weekly' }, // 가점 계산기
      { url: '/subscription/calendar', priority: '0.7', changefreq: 'weekly' }, // 청약 캘린더
      { url: '/mypage', priority: '0.6', changefreq: 'monthly' }, // 마이페이지
      { url: '/signin', priority: '0.5', changefreq: 'monthly' }, // 로그인
      { url: '/signup', priority: '0.5', changefreq: 'monthly' }, // 회원가입
    ];

    staticPages.forEach((page) => {
      sitemap += createUrlEntry(`${SITE_BASE_URL}${page.url}`, currentDate, page.changefreq, page.priority);
    });

    // 2. 청약 상세 페이지들 (동적) - SEO 친화적 URL
    subscriptions.forEach((subscription) => {
      if (subscription.id && subscription.houseNm) {
        const lastmod = subscription.rceptBgnde
          ? new Date(subscription.rceptBgnde).toISOString()
          : subscription.createdAt
            ? new Date(subscription.createdAt).toISOString()
            : currentDate;

        // Generate SEO-friendly slug
        const slug = subscription.houseNm
          .replace(/[^\w\s가-힣]/g, '') // 특수문자 제거
          .replace(/\s+/g, '-') // 공백을 하이픈으로
          .toLowerCase();

        // 새로운 SEO 친화적 URL - 높은 우선순위
        sitemap += createUrlEntry(`${SITE_BASE_URL}/subscription/${subscription.id}/${slug}`, lastmod, 'weekly', '0.9');
        
        // 기존 URL 하위 호환성 - 낮은 우선순위
        sitemap += createUrlEntry(`${SITE_BASE_URL}/subscription/${subscription.id}`, lastmod, 'weekly', '0.6');
      }
    });

    // 3. 커뮤니티 게시글 상세 페이지들 (동적)
    posts.forEach((post) => {
      if (post.id) {
        const lastmod = post.createdAt
          ? new Date(post.createdAt).toISOString()
          : post.updatedAt
            ? new Date(post.updatedAt).toISOString()
            : currentDate;

        sitemap += createUrlEntry(`${SITE_BASE_URL}/community/detail?id=${post.id}`, lastmod, 'daily', '0.7');
      }
    });

    // 4. 페이지네이션 URL들 - 우선순위 조정
    const subscriptionPages = Math.ceil(subscriptions.length / 10);
    for (let i = 1; i <= Math.min(subscriptionPages, 20); i++) {
      // 첫 20페이지만 포함 (SEO 효율성 증대)
      const priority = i <= 5 ? '0.7' : '0.5'; // 첫 5페이지는 높은 우선순위
      sitemap += createUrlEntry(`${SITE_BASE_URL}/subscription?page=${i}`, currentDate, 'daily', priority);
    }

    // 5. 커뮤니티 페이지네이션 URL들
    const communityPages = Math.ceil(posts.length / 10);
    for (let i = 1; i <= Math.min(communityPages, 10); i++) {
      // 첫 10페이지만 포함
      const priority = i <= 3 ? '0.6' : '0.4'; // 첫 3페이지는 높은 우선순위
      sitemap += createUrlEntry(`${SITE_BASE_URL}/community?page=${i}`, currentDate, 'daily', priority);
    }

    // 6. 지역별 청약 페이지들 - 인기 지역 우선순위 차등화
    const popularRegions = [
      { region: '서울특별시', priority: '0.8' }, // 가장 높은 검색량
      { region: '경기도', priority: '0.8' },
      { region: '인천광역시', priority: '0.7' },
      { region: '부산광역시', priority: '0.7' },
      { region: '대구광역시', priority: '0.6' },
      { region: '광주광역시', priority: '0.6' },
      { region: '대전광역시', priority: '0.6' },
      { region: '울산광역시', priority: '0.6' },
      { region: '세종특별자치시', priority: '0.5' },
      { region: '강원도', priority: '0.5' },
      { region: '충청북도', priority: '0.5' },
      { region: '충청남도', priority: '0.5' },
      { region: '전라북도', priority: '0.5' },
      { region: '전라남도', priority: '0.5' },
      { region: '경상북도', priority: '0.5' },
      { region: '경상남도', priority: '0.5' },
      { region: '제주특별자치도', priority: '0.5' },
    ];

    popularRegions.forEach(({ region, priority }) => {
      sitemap += createUrlEntry(
        `${SITE_BASE_URL}/subscription?region=${encodeURIComponent(region)}`,
        currentDate,
        'weekly',
        priority,
      );
    });

    // 사이트맵 종료
    sitemap += `
</urlset>`;

    console.log('Sitemap generation completed successfully');

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=21600', // 1시간 클라이언트, 6시간 CDN 캐시
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // 오류 발생 시 최소한의 정적 페이지만 포함하는 사이트맵 반환
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_BASE_URL}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_BASE_URL}/subscription</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_BASE_URL}/community</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_BASE_URL}/guide</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_BASE_URL}/calculator</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

    return new NextResponse(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  }
}
