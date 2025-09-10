import SubscriptionDetailClient from './subscription-detail-client';

import type { Metadata } from 'next';

import { GET_infra_by_subscription, GET_subscription_by_id } from '@/services/subscription/api';

interface Props {
  params: Promise<{ id: string; slug: string }>;
}

// Type guard utility for infra data arrays
function isValidInfraArray<T>(data: T[] | undefined | null): data is T[] {
  return Array.isArray(data) && data.length > 0;
}

// Helper function to generate price range text
function getPriceRangeText(priceInfo: any[]): string {
  if (!priceInfo || priceInfo.length === 0) return '';

  const prices = priceInfo.map((p) => p.supplyPrice).filter((p) => p > 0);
  if (prices.length === 0) return '';

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  if (minPrice === maxPrice) {
    return `${(minPrice / 10000).toLocaleString()}만원`;
  }
  return `${(minPrice / 10000).toLocaleString()}만원~${(maxPrice / 10000).toLocaleString()}만원`;
}

// Helper function to generate area sizes text
function getAreaSizesText(supplyTarget: any[]): string {
  if (!supplyTarget || supplyTarget.length === 0) return '';

  const areas = [...new Set(supplyTarget.map((s) => Math.floor(s.supplyArea)).filter((a) => a > 0))];
  areas.sort((a, b) => a - b);

  if (areas.length <= 3) {
    return areas.map((a) => `${a}㎡`).join(', ');
  }
  return `${areas[0]}㎡~${areas[areas.length - 1]}㎡`;
}

// Helper function to generate infrastructure text
function getInfraText(infra: any): string {
  const infraItems = [];

  if (isValidInfraArray(infra?.stations)) {
    const nearestStation = infra.stations.sort((a: any, b: any) => a.distance - b.distance)[0];
    infraItems.push(`${nearestStation.name}역 ${Math.round(nearestStation.distance)}m`);
  }

  if (isValidInfraArray(infra?.schools)) {
    const elementarySchools = infra.schools.filter((s: any) => s.category.includes('초등'));
    if (elementarySchools.length > 0) {
      const nearest = elementarySchools.sort((a: any, b: any) => a.distance - b.distance)[0];
      infraItems.push(`${nearest.schoolName} ${Math.round(nearest.distance)}m`);
    }
  }

  return infraItems.length > 0 ? ` 주변시설: ${infraItems.join(', ')}.` : '';
}

// Utility function to generate URL slug from subscription name
function generateSlug(houseNm: string): string {
  return houseNm
    .replace(/[^\w\s가-힣]/g, '') // 특수문자 제거
    .replace(/\s+/g, '-') // 공백을 하이픈으로
    .toLowerCase();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, slug } = await params;

  try {
    // Fetch both subscription and infrastructure data
    const [subscriptionResponse, infraResponse] = await Promise.allSettled([
      GET_subscription_by_id(id),
      GET_infra_by_subscription(id),
    ]);

    if (subscriptionResponse.status === 'rejected') {
      throw new Error('Failed to fetch subscription data');
    }

    const subscription = subscriptionResponse.value.data.data;
    const infra = infraResponse.status === 'fulfilled' ? infraResponse.value.data.data : null;

    if (!subscription) {
      return {
        title: '청약 정보를 찾을 수 없습니다 - 청약플래닛',
        description: '요청하신 청약 정보를 찾을 수 없습니다. 청약플래닛에서 다른 청약 정보를 확인해보세요.',
        robots: { index: false, follow: false },
      };
    }

    // Enhanced title with brand suffix for better search matching
    const title = `${subscription.houseNm} : 청약정보 - 청약플래닛`;

    // Enhanced description with price, infrastructure and key details
    const priceText = getPriceRangeText(subscription.priceInfo);
    const areaText = getAreaSizesText(subscription.supplyTarget);
    const infraText = getInfraText(infra);

    // Enhanced description with natural language
    const applicationStartDate = new Date(subscription.rceptBgnde).toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    });
    const applicationEndDate = new Date(subscription.rceptEndde).toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    });

    let descriptionParts = [];
    descriptionParts.push(`${subscription.hssplyAdres}에 위치한 ${subscription.houseNm}의 청약 정보입니다`);
    descriptionParts.push(
      `${subscription.rentSecdNm} ${subscription.houseDtlSecdNm}이며 총 ${subscription.totalSupplyCountTotal}세대가 공급됩니다`,
    );

    if (priceText) {
      descriptionParts.push(`공급가격은 ${priceText}입니다`);
    }

    if (areaText) {
      descriptionParts.push(`전용면적은 ${areaText}입니다`);
    }

    descriptionParts.push(`청약기간은 ${applicationStartDate}부터 ${applicationEndDate}까지입니다`);

    if (isValidInfraArray(infra?.stations)) {
      const nearestStation = infra.stations.sort((a: any, b: any) => a.distance - b.distance)[0];
      descriptionParts.push(
        `인근에 ${nearestStation.name}역(${Math.round(nearestStation.distance)}m)이 위치해 있습니다`,
      );
    }

    if (isValidInfraArray(infra?.schools)) {
      const elementarySchools = infra.schools.filter((s: any) => s.category.includes('초등'));
      if (elementarySchools.length > 0) {
        const nearest = elementarySchools.sort((a: any, b: any) => a.distance - b.distance)[0];
        if (descriptionParts.length > 0) {
          descriptionParts[descriptionParts.length - 1] = descriptionParts[descriptionParts.length - 1].replace(
            '습니다',
            `고, ${nearest.schoolName}(${Math.round(nearest.distance)}m) 등이 위치해 있습니다`,
          );
        }
      }
    }

    const description = descriptionParts.join('. ');

    // Enhanced keywords with apartment types, areas, prices
    const apartmentTypes = subscription.supplyTarget?.map((s) => s.housingType).filter(Boolean) || [];
    const uniqueTypes = [...new Set(apartmentTypes)];

    const keywords = [
      subscription.houseNm,
      subscription.region,
      subscription.city,
      subscription.district,
      '청약',
      '아파트청약',
      '신축아파트',
      subscription.rentSecdNm,
      subscription.houseDtlSecdNm,
      '청약정보',
      '청약일정',
      '부동산',
      subscription.bsnsMbyNm,
      ...uniqueTypes,
      ...(areaText ? [areaText] : []),
      ...(priceText ? [priceText] : []),
      `${subscription.totalSupplyCountTotal}세대`,
    ]
      .filter(Boolean)
      .join(', ');

    const images = [
      {
        url: '/cheongyakplanet.png',
        width: 1200,
        height: 630,
        alt: `${subscription.houseNm} 청약 정보`,
      },
    ];

    // Build other meta tags including geo-location
    const otherTags: Record<string, string> = {};

    if (subscription.latitude && subscription.longitude) {
      otherTags['geo.position'] = `${subscription.latitude};${subscription.longitude}`;
      otherTags['geo.region'] = `KR-${subscription.city}`;
      otherTags['ICBM'] = `${subscription.latitude}, ${subscription.longitude}`;
      otherTags['geo.placename'] = subscription.hssplyAdres;
    }

    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        url: `https://cheongyakplanet.site/subscription/${id}/${slug}`,
        siteName: '청약플래닛',
        images,
        locale: 'ko_KR',
        type: 'article',
        publishedTime: subscription.rcritPblancDe,
        authors: ['청약플래닛'],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/cheongyakplanet.png'],
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://cheongyakplanet.site/subscription/${id}/${slug}`,
      },
      other: otherTags,
    };
  } catch (error) {
    console.error('Failed to generate metadata:', error);
    return {
      title: '청약 정보 - 청약플래닛',
      description: '청약플래닛에서 전국 청약 정보를 확인하세요. 지역별 청약 일정과 가점 계산기를 제공합니다.',
    };
  }
}

// Generate structured data for rich snippets
function generateStructuredData(subscription: any, id: string) {
  const priceRange = getPriceRangeText(subscription.priceInfo);
  const areaRange = getAreaSizesText(subscription.supplyTarget);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: subscription.houseNm,
    description: `${subscription.hssplyAdres}에 위치한 ${subscription.houseNm} 청약정보`,
    url: `https://cheongyakplanet.com/subscription/${id}`,
    image: 'https://cheongyakplanet.com/cheongyakplanet.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: subscription.hssplyAdres,
      addressLocality: subscription.city,
      addressRegion: subscription.region,
      addressCountry: 'KR',
      postalCode: subscription.hssplyZip,
    },
    ...(subscription.latitude &&
      subscription.longitude && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: parseFloat(subscription.latitude),
          longitude: parseFloat(subscription.longitude),
        },
      }),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      validFrom: subscription.rceptBgnde,
      validThrough: subscription.rceptEndde,
      ...(priceRange && { priceRange }),
      priceCurrency: 'KRW',
      seller: {
        '@type': 'Organization',
        name: subscription.bsnsMbyNm || '청약플래닛',
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: '총 공급세대',
        value: subscription.totalSupplyCountTotal,
      },
      {
        '@type': 'PropertyValue',
        name: '주택유형',
        value: `${subscription.rentSecdNm} ${subscription.houseDtlSecdNm}`,
      },
      ...(areaRange
        ? [
            {
              '@type': 'PropertyValue',
              name: '전용면적',
              value: areaRange,
            },
          ]
        : []),
    ],
    datePublished: subscription.rcritPblancDe,
    publisher: {
      '@type': 'Organization',
      name: '청약플래닛',
      url: 'https://cheongyakplanet.com',
    },
  };

  return JSON.stringify(structuredData);
}

export default async function SubscriptionDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch subscription data for both structured data and SEO content
  let structuredDataScript = '';
  let seoContent = null;

  try {
    const response = await GET_subscription_by_id(id);
    const subscription = response.data.data;

    if (subscription) {
      structuredDataScript = generateStructuredData(subscription, id);

      // Generate SEO content
      const priceText = getPriceRangeText(subscription.priceInfo);
      const areaText = getAreaSizesText(subscription.supplyTarget);
      const applicationStartDate = new Date(subscription.rceptBgnde).toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
      });
      const applicationEndDate = new Date(subscription.rceptEndde).toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
      });

      seoContent = (
        <section aria-hidden="false" className="sr-only">
          <div>
            <h1>청약명: {subscription.houseNm}</h1>
            <p>총 세대수: {subscription.totalSupplyCountTotal}세대</p>
            {areaText && <p>공급 면적: {areaText}</p>}
            <p>
              청약기간: {applicationStartDate}부터 {applicationEndDate}까지
            </p>
            {priceText && <p>공급가격: {priceText}</p>}
            <p>
              주택유형: {subscription.rentSecdNm} {subscription.houseDtlSecdNm}
            </p>
            <p>위치: {subscription.hssplyAdres}</p>
          </div>
        </section>
      );
    }
  } catch (error) {
    console.error('Failed to generate structured data and SEO content:', error);
  }

  return (
    <>
      {structuredDataScript && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataScript }} />
      )}
      {seoContent}
      <SubscriptionDetailClient id={id} />
    </>
  );
}
