'use client';

import { useState } from 'react';

import {
  ChatBubbleLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  HomeIcon,
  LightBulbIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

export default function Guide() {
  type SectionId = 'intro' | 'signup' | 'mypage' | 'subscription' | 'community' | 'terms' | 'tips';

  const [expandedSection, setExpandedSection] = useState<SectionId | null>(null);

  const toggleSection = (sectionId: SectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const sections = [
    {
      id: 'intro',
      title: '청약플래닛이란?',
      icon: HomeIcon,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">청약플래닛은 아파트 청약 정보를 쉽고 빠르게 확인할 수 있는 정보 플랫폼입니다.</p>
          <div className="rounded-lg bg-blue-50 p-4">
            <h4 className="mb-3 font-semibold text-blue-900">주요 기능</h4>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-center">
                <span className="mr-2">🔍</span>청약 정보 확인
              </li>
              <li className="flex items-center">
                <span className="mr-2">📍</span>관심 지역별 청약 모아보기
              </li>
              <li className="flex items-center">
                <span className="mr-2">🏫</span>주변 인프라 (학교, 지하철역, 공공시설) 정보
              </li>
              <li className="flex items-center">
                <span className="mr-2">💬</span>커뮤니티를 통한 정보 공유
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    {
      id: 'subscription',
      title: '청약 정보 확인하기',
      icon: MapPinIcon,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="mb-3 font-semibold text-gray-900">전체 청약 보기</h4>
            <ol className="ml-4 list-inside list-decimal space-y-2 text-gray-700">
              <li>
                <strong>청약 정보</strong> 메뉴 클릭
              </li>
              <li>마감일 순으로 정렬된 청약 목록 확인</li>
              <li>관심 있는 청약 클릭 → 상세 정보 확인</li>
            </ol>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-gray-900">상세 정보 확인</h4>
            <p className="mb-4 text-gray-700">각 청약을 클릭하면 다음 정보를 확인할 수 있어요:</p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-blue-200 p-4">
                <h5 className="mb-2 font-semibold text-blue-900">📅 일정 정보</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• 청약 접수 기간</li>
                  <li>• 당첨자 발표일</li>
                  <li>• 계약 기간</li>
                </ul>
              </div>

              <div className="rounded-lg border border-green-200 p-4">
                <h5 className="mb-2 font-semibold text-green-900">🏠 분양 정보</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• 평형별 분양가</li>
                  <li>• 공급 세대수</li>
                  <li>• 특별공급 세대수</li>
                </ul>
              </div>

              <div className="rounded-lg border border-purple-200 p-4">
                <h5 className="mb-2 font-semibold text-purple-900">🗺️ 위치 & 인프라</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• 정확한 위치 (지도)</li>
                  <li>• 1km 내 지하철역</li>
                  <li>• 1km 내 학교</li>
                  <li>• 주변 공공시설</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'community',
      title: '커뮤니티 활용하기',
      icon: ChatBubbleLeftIcon,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="mb-3 font-semibold text-gray-900">게시글 작성</h4>
            <ol className="ml-4 list-inside list-decimal space-y-2 text-gray-700">
              <li>
                <strong>커뮤니티</strong> 메뉴 클릭
              </li>
              <li>
                <strong>글쓰기</strong> 버튼 클릭
              </li>
              <li>제목과 내용 작성 후 등록</li>
            </ol>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-gray-900">인기 게시글 확인</h4>
            <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
              <li>좋아요가 많은 글</li>
              <li>조회수가 높은 글</li>
              <li>최신 글 순서로 정렬 가능</li>
            </ul>
          </div>

          <div className="rounded-lg bg-yellow-50 p-4">
            <h4 className="mb-2 font-semibold text-yellow-900">💬 댓글 & 대댓글</h4>
            <ul className="space-y-1 text-yellow-800">
              <li>• 궁금한 점은 댓글로 문의</li>
              <li>• 도움이 되는 글에는 좋아요 👍</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'terms',
      title: '청약 기초 용어',
      icon: QuestionMarkCircleIcon,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="mb-3 font-semibold text-gray-900">청약 관련 용어</h4>
            <div className="space-y-3">
              <div className="rounded-lg bg-gray-50 p-3">
                <span className="font-medium text-gray-900">청약통장:</span>
                <span className="ml-2 text-gray-700">청약 신청을 위해 필요한 통장</span>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <span className="font-medium text-gray-900">1순위:</span>
                <span className="ml-2 text-gray-700">청약통장 가입 후 일정 기간이 지난 사람</span>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <span className="font-medium text-gray-900">2순위:</span>
                <span className="ml-2 text-gray-700">1순위 조건을 만족하지 않는 사람</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-gray-900">특별공급 종류</h4>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-lg bg-blue-50 p-3">
                <div className="font-medium text-blue-900">다자녀 특별공급</div>
                <div className="text-sm text-blue-700">미성년 자녀 2명 이상</div>
              </div>
              <div className="rounded-lg bg-pink-50 p-3">
                <div className="font-medium text-pink-900">신혼부부 특별공급</div>
                <div className="text-sm text-pink-700">혼인 기간 7년 이하</div>
              </div>
              <div className="rounded-lg bg-green-50 p-3">
                <div className="font-medium text-green-900">생애최초 특별공급</div>
                <div className="text-sm text-green-700">생애 처음 집을 사는 사람</div>
              </div>
              <div className="rounded-lg bg-purple-50 p-3">
                <div className="font-medium text-purple-900">노부모 부양 특별공급</div>
                <div className="text-sm text-purple-700">직계존속을 3년 이상 부양</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'tips',
      title: '청약 성공 팁',
      icon: LightBulbIcon,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-5">
              <h4 className="mb-3 font-semibold text-blue-900">1. 정보가 힘이다</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• 청약플래닛에서 매일 새로운 정보 확인</li>
                <li>• 관심 지역은 미리 설정해두기</li>
              </ul>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-5">
              <h4 className="mb-3 font-semibold text-green-900">2. 자신의 조건을 파악하자</h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• 특별공급 자격 여부 확인</li>
                <li>• 소득/재산 조건 점검</li>
              </ul>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-5">
              <h4 className="mb-3 font-semibold text-purple-900">3. 여러 청약에 도전하자</h4>
              <ul className="space-y-2 text-sm text-purple-800">
                <li>• 한 번에 성공하기 어려우니 꾸준히 도전</li>
                <li>• 다양한 지역과 평형 고려</li>
              </ul>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 p-5">
              <h4 className="mb-3 font-semibold text-orange-900">4. 커뮤니티 활용하기</h4>
              <ul className="space-y-2 text-sm text-orange-800">
                <li>• 다른 사용자들의 경험담 참고</li>
                <li>• 궁금한 점은 적극적으로 질문</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
            <h4 className="mb-4 text-xl font-bold">🚀 시작해보세요!</h4>
            <p className="mb-4">이제 청약플래닛과 함께 청약 여행을 시작해보세요!</p>
            <ol className="list-inside list-decimal space-y-2">
              <li>
                <strong>회원가입</strong> 하기
              </li>
              <li>
                <strong>마이페이지</strong> 설정하기
              </li>
              <li>
                <strong>관심 지역</strong> 등록하기
              </li>
              <li>
                <strong>청약 정보</strong> 둘러보기
              </li>
              <li>
                <strong>커뮤니티</strong>에서 정보 공유하기
              </li>
            </ol>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-4xl bg-white p-6">
      {/* 헤더 */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">🏠 청약플래닛 초보자 가이드</h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          청약이 처음이신가요? 걱정 마세요! 청약플래닛과 함께 차근차근 알아보겠습니다.
        </p>
      </div>

      {/* 섹션들 */}
      <div className="space-y-4">
        {sections.map((section) => {
          const IconComponent = section.icon;
          const isExpanded = expandedSection === section.id;

          return (
            <div key={section.id} className="overflow-hidden rounded-lg border border-gray-200">
              <button
                onClick={() => toggleSection(section.id as SectionId)}
                className="flex w-full items-center justify-between bg-gray-50 px-6 py-4 text-left transition-colors duration-200 hover:bg-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                </div>
                {isExpanded ? (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {isExpanded && <div className="bg-white px-6 py-6">{section.content}</div>}
            </div>
          );
        })}
      </div>

      {/* 푸터 */}
      <div className="mt-12 text-center">
        <div className="rounded-lg bg-gradient-to-r from-green-400 to-blue-500 p-6 text-white">
          <h3 className="mb-2 text-2xl font-bold">🏆 성공하는 청약러가 되는 그날까지</h3>
          <p className="text-lg">청약플래닛이 함께합니다!</p>
        </div>
        <p className="mt-6 text-gray-600">
          💡 <strong>더 궁금한 점이 있으시면 커뮤니티에 언제든 질문해주세요!</strong>
        </p>
      </div>
    </div>
  );
}
