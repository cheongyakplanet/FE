import { Suspense } from 'react';
import type { Metadata } from 'next';

import { GET_postDetail } from '@/services/community/api';

import CommunityDetailContent from './community-detail-content';

interface Props {
  searchParams: Promise<{ id?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { id } = await searchParams;

  if (!id) {
    return {
      title: '게시글을 찾을 수 없습니다 - 청약플래닛',
      description: '요청하신 게시글을 찾을 수 없습니다.',
      robots: { index: false, follow: false },
    };
  }

  try {
    const post = await GET_postDetail(id);

    if (!post) {
      return {
        title: '게시글을 찾을 수 없습니다 - 청약플래닛',
        description: '요청하신 게시글을 찾을 수 없습니다.',
        robots: { index: false, follow: false },
      };
    }

    const title = `${post.title} - 청약 커뮤니티 | 청약플래닛`;
    
    // 본문 내용에서 첫 150자 추출 (마크다운 제거)
    const plainContent = post.content
      ?.replace(/[#*`>\-\[\]()]/g, '')
      ?.replace(/\n+/g, ' ')
      ?.trim()
      ?.slice(0, 150) || '';
    
    const description = plainContent 
      ? `${plainContent}... 청약 커뮤니티에서 더 많은 정보를 확인하세요.`
      : '청약 관련 정보와 후기를 나누는 커뮤니티 게시글입니다.';

    const keywords = [
      '청약커뮤니티',
      '청약후기',
      '청약정보',
      post.title,
      '청약질문',
      '청약팁',
      '청약플래닛'
    ].join(', ');

    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        url: `https://cheongyakplanet.site/community/detail?id=${id}`,
        siteName: '청약플래닛',
        type: 'article',
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        authors: [post.author || '청약플래닛 사용자'],
        images: [
          {
            url: '/cheongyakplanet.png',
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/cheongyakplanet.png'],
      },
      alternates: {
        canonical: `https://cheongyakplanet.site/community/detail?id=${id}`,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error('Failed to generate metadata for community post:', error);
    return {
      title: '청약 커뮤니티 - 청약플래닛',
      description: '청약 정보와 후기를 나누는 커뮤니티입니다.',
    };
  }
}

export default function detail() {
  return (
    <Suspense
      fallback={
        <div className="flex h-48 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600"></div>
            <p className="text-sm text-slate-500">게시글을 불러오는 중입니다...</p>
          </div>
        </div>
      }
    >
      <CommunityDetailContent />
    </Suspense>
  );
}
