export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-gray-600">
      <div className="mx-auto max-w-screen-lg px-4 py-10">
        {/* 회사 정보 */}
        <div>
          <h3 className="mb-4 text-lg font-bold">청약플래닛</h3>
          <p className="mb-4 text-xs text-gray-400">
            제공하는 부동산 정보는 각 콘텐츠 제공업체로부터 받는 정보로 참고용입니다. 정보의 정확성이나 신뢰성을
            보증하지 않으며, 서비스 이용의 결과에 대해서 어떠한 법적인 책임을 지지 않습니다. 게시된 정보는 무단
            복제·배포·전송(반복적이거나 특정 목적을 위한 체계적인 것을 포함합니다) 등 이용할 수 없으며, 이를 무단
            이용하는 경우 저작권법 등에 따라 법적 책임을 질 수 있습니다.
          </p>
          <div className="text-xs text-gray-500">
            <p className="mb-2">대표: 김지수</p>
            <p>
              문의:{' '}
              <a href="mailto:jisu0259@naver.com" className="hover:text-teal-600">
                jisu0259@naver.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm">
          <p>© 2025 청약플래닛. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
