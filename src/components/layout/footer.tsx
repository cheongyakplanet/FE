export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-gray-600">
      <div className="mx-auto max-w-screen-lg px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* 회사 정보 */}
          <div>
            <h3 className="mb-4 text-lg font-bold">회사명</h3>
            <p className="mb-2">서울특별시 강남구 테헤란로 123</p>
            <p className="mb-2">사업자등록번호: 123-45-67890</p>
            <p className="mb-2">대표: 홍길동</p>
            <p>고객센터: 1234-5678</p>
          </div>

          {/* 서비스 링크 */}
          <div>
            <h3 className="mb-4 text-lg font-bold">서비스</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-teal-600">
                  서비스 소개
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-teal-600">
                  요금제
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-teal-600">
                  자주 묻는 질문
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-600">
                  공지사항
                </a>
              </li>
            </ul>
          </div>

          {/* 법적 정보 */}
          <div>
            <h3 className="mb-4 text-lg font-bold">법적 정보</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-teal-600">
                  이용약관
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-teal-600">
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-600">
                  청소년보호정책
                </a>
              </li>
            </ul>
          </div>

          {/* 뉴스레터 구독 */}
          <div>
            <h3 className="mb-4 text-lg font-bold">뉴스레터 구독</h3>
            <p className="mb-4">최신 소식과 할인 정보를 받아보세요</p>
            <div className="flex">
              <input
                type="email"
                placeholder="이메일 주소"
                className="w-full rounded-l border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <button className="rounded-r bg-teal-600 px-4 py-2 text-white hover:bg-teal-700">구독</button>
            </div>
            <div className="mt-6 flex space-x-4">
              <a href="#" aria-label="Facebook">
                <span className="text-2xl">📱</span>
              </a>
              <a href="#" aria-label="Instagram">
                <span className="text-2xl">📷</span>
              </a>
              <a href="#" aria-label="Twitter">
                <span className="text-2xl">🐦</span>
              </a>
              <a href="#" aria-label="Youtube">
                <span className="text-2xl">📺</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm">
          <p>© 2023 회사명. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
