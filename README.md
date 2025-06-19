# 청약플래닛 Frontend 🌐

> Next.js 15 기반 청약 정보 플랫폼 프론트엔드
청약플래닛의 사용자 인터페이스를 담당하는 Next.js 애플리케이션입니다. 모던한 웹 기술과 한국형 UX를 결합하여 직관적이고 반응형인 청약 정보 서비스를 제공합니다.

## 🚀 빠른 시작
.env.local 파일 생성
```bash
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_KAKAO_MAP_KEY=
NEXT_PUBLIC_OAUTH_KAKAO_API_URL=
NEXT_PUBLIC_OAUTH_KAKAO_CLIENT_ID=
```

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 🛠️ 기술 스택

### 핵심 프레임워크
- **Next.js 15**: App Router 기반 React 프레임워크
- **TypeScript**: 타입 안정성과 개발자 경험 향상
- **React 18**: 최신 React 기능 활용

### UI/UX
- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크
- **shadcn/ui**: 모던하고 접근성이 좋은 컴포넌트 라이브러리
- **Lucide React**: 아이콘 시스템
- **반응형 디자인**: 모바일-퍼스트 접근 방식

### 상태 관리
- **React Query (@tanstack/react-query)**: 서버 상태 관리
- **Zustand**: 클라이언트 상태 관리
- **React Hook Form**: 폼 상태 관리
- **Zod**: 스키마 검증

### 외부 연동
- **Axios**: HTTP 클라이언트
- **Kakao Maps SDK**: 지도 서비스
- **Google Analytics**: 웹 분석
- **Naver Analytics**: 한국 시장 분석

## 📁 프로젝트 구조

```
src/
├── app/                      # Next.js App Router
│   ├── (home)/              # 메인 홈페이지
│   ├── community/           # 커뮤니티 페이지
│   ├── mypage/              # 마이페이지
│   ├── subscription/        # 청약 상세 페이지
│   ├── signin/              # 로그인 페이지
│   ├── signup/              # 회원가입 페이지
│   ├── globals.css          # 전역 CSS
│   ├── layout.tsx           # 루트 레이아웃
│   └── page.tsx             # 루트 페이지
├── components/              # 재사용 가능한 컴포넌트
│   ├── ui/                  # shadcn/ui 기반 UI 컴포넌트
│   └── layout/              # 레이아웃 컴포넌트
├── services/                # API 서비스 계층
│   ├── home/                # 홈 페이지 관련 API
│   │   ├── api.ts           # API 함수들
│   │   ├── hooks/           # React Query 훅들
│   │   └── types.ts         # 타입 정의
│   ├── community/           # 커뮤니티 API
│   ├── member/              # 회원 관리 API
│   ├── subscription/        # 청약 정보 API
│   └── region/              # 지역 정보 API
├── stores/                  # Zustand 상태 저장소
│   └── auth-store.ts        # 인증 상태 관리
├── lib/                     # 유틸리티 함수
│   ├── api.ts               # 중앙화된 axios 인스턴스
│   ├── cookie-storage.ts    # 쿠키 저장소
│   └── utils.ts             # 공통 유틸리티
├── assets/                  # 정적 자산
│   └── fonts/               # 로컬 폰트 파일
└── types/                   # 전역 타입 정의
```

## 🔧 주요 기능

### 인증 시스템
- JWT 토큰 기반 인증
- 자동 토큰 갱신
- 쿠키 기반 토큰 저장
- 로그인 상태 유지

### 서버 상태 관리
- React Query를 활용한 효율적인 데이터 페칭
- 60초 stale time으로 캐싱 최적화
- 자동 백그라운드 업데이트

### 폼 관리
- React Hook Form + Zod 스키마 검증
- 타입 안전한 폼 처리
- 실시간 검증 피드백

## 🎨 UI 컴포넌트

### shadcn/ui 기반 컴포넌트

### 반응형 디자인
- Tailwind CSS 브레이크포인트 활용
- 모바일-퍼스트 접근 방식
- 다양한 화면 크기 대응

## 🔌 API 연동

### 중앙화된 API 클라이언트

### 서비스 계층 구조

## 🌍 국제화 및 로컬라이제이션

- 한국어 기본 설정 (`lang="ko"`)
- 한국형 UX 패턴 적용
- 로컬 폰트 최적화

## 📊 분석 및 모니터링

### 웹 분석
```typescript
// Google Analytics 4

// Naver Analytics
```

## 🎯 성능 최적화

### Next.js 최적화
- App Router 활용
- 동적 임포트로 코드 분할
- 이미지 최적화 (next/image)
- 폰트 최적화 (next/font)

### 상태 관리 최적화
- React Query 캐싱 전략
- Zustand persist 미들웨어
- 선택적 리렌더링

### 네트워크 최적화
- API 요청 중복 제거
- 인터셉터를 통한 에러 처리
- 자동 재시도 로직

## 🤝 개발 가이드라인

### 코드 스타일
- Prettier + ESLint 설정
- TypeScript strict 모드
- 컴포넌트는 PascalCase
- 훅은 use~ 접두사

### 파일 구조 규칙
- 페이지별 컴포넌트는 해당 폴더에 위치
- 재사용 가능한 컴포넌트는 components/ 에 위치
- API 관련 코드는 services/ 에 도메인별 구성

### Git 커밋 규칙
- `Feat`: 새로운 기능
- `Fix`: 버그 수정
- `Style`: UI/스타일 변경
- `Refactor`: 코드 리팩토링
- `Test`: 테스트 코드
- `Docs`: 문서 수정
