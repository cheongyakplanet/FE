import { jwtDecode } from 'jwt-decode';

import cookieStorage from '@/lib/cookie-storage';

const auth = () => {
  const cookieToken = cookieStorage.getItem('cheongyakplanet-token');
  if (typeof cookieToken === 'string') {
    try {
      const decoded = decodeURIComponent(cookieToken);
      const parsed = JSON.parse(decoded);
      const accessToken = parsed?.state?.accessToken;

      if (typeof accessToken === 'string') {
        const token = jwtDecode<{ sub: string }>(accessToken);
        return token.sub;
      } else {
        console.warn('accessToken이 유효하지 않음:', accessToken);
      }
    } catch (e) {
      console.error('쿠키 디코딩 실패:', e);
    }
  }
  return null;
};

export default auth;
