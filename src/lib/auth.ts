import { jwtDecode } from 'jwt-decode';

import cookieStorage from '@/lib/cookie-storage';

const auth = () => {
  const cookieToken = cookieStorage.getItem('cheongyakplanet-token');
  if (typeof cookieToken === 'string') {
    const decoded = decodeURIComponent(cookieToken);
    const parsed = JSON.parse(decoded);
    const accessToken = parsed.state.accessToken;
    const token = jwtDecode<{ sub: string }>(accessToken);
    return token.sub;
  }
};

export default auth;
