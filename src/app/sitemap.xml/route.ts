import { NextResponse } from 'next/server';

// API를 직접 호출하기 위한 서버 측 함수
async function fetchSubscriptions() {
  try {
    const response = await fetch('http://run.blu2print.site:8082/api/info/subscription?page=0&size=10');
    return await response.json();
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return { data: { content: [], totalPages: 0 } };
  }
}

async function fetchCommunityPosts() {
  try {
    const response = await fetch('http://run.blu2print.site:8082/api/community/posts?sort=time&page=0&size=10');
    return await response.json();
  } catch (error) {
    console.error('Error fetching community posts:', error);
    return { data: { content: [], totalPages: 0 } };
  }
}

export async function GET() {
  const baseUrl = 'https://www.cheongyakplanet.site';
  const currentDate = new Date().toISOString();

  try {
    // 데이터 가져오기
    const subscriptionsData = await fetchSubscriptions();
    const postsData = await fetchCommunityPosts();

    const subscriptions = subscriptionsData.data.content || [];
    const totalSubscriptionPages = subscriptionsData.data.totalPages || 1;

    const posts = postsData.data.content || [];
    const totalPostPages = postsData.data.totalPages || 1;

    // 사이트맵 XML 시작
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    
    <!-- 정적 페이지 -->
    <url>
      <loc>${baseUrl}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>${baseUrl}/subscription</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>${baseUrl}/community</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>${baseUrl}/guide</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>${baseUrl}/calculator</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`;

    // 청약 페이지네이션
    for (let i = 1; i <= totalSubscriptionPages; i++) {
      sitemap += `
    <url>
      <loc>${baseUrl}/subscription?page=${i}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>`;
    }

    // 청약 상세 페이지
    for (const item of subscriptions) {
      const lastmod = item.rceptBgnde ? new Date(item.rceptBgnde).toISOString() : currentDate;
      sitemap += `
    <url>
      <loc>${baseUrl}/subscription/${item.id}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
    }

    // 커뮤니티 페이지네이션
    for (let i = 1; i <= totalPostPages; i++) {
      sitemap += `
    <url>
      <loc>${baseUrl}/community?page=${i}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>`;
    }

    // 커뮤니티 상세 페이지
    for (const post of posts) {
      const lastmod = post.createdAt ? new Date(post.createdAt).toISOString() : currentDate;
      sitemap += `
    <url>
      <loc>${baseUrl}/community/${post.id}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>`;
    }

    // 사이트맵 종료
    sitemap += `
    </urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // 오류 발생 시 최소한의 정적 페이지만 포함하는 사이트맵 반환
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/subscription</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>
      <url>
        <loc>${baseUrl}/community</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>
    </urlset>`;

    return new NextResponse(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}
