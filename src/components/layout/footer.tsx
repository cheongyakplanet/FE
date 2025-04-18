export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-gray-600">
      <div className="mx-auto max-w-screen-lg px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* 회사 정보 */}
          <div>
            <h3 className="mb-4 text-lg font-bold">청약플래닛</h3>
            <p className="mb-2">서울특별시 강남구 테헤란로 123</p>
            <p className="mb-2">사업자등록번호: 123-45-67890</p>
            <p className="mb-2">대표: 김지수</p>
            <p>
              문의 연락처:{' '}
              <a href="mailto:jisu0259@naver.com" className="hover:text-teal-600">
                jisu0259@naver.com
              </a>
            </p>
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
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm">
          <p>© 2025 청약플래닛. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
