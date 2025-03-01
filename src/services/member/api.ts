import { MemberLoginDto, MemberSignupDto } from './types';

import api from '@/lib/api';

/** 회원가입 */
export const POST_signup = async ({ email, password, username }: MemberSignupDto) => {
  return await api.post('/api/member/signup', { email, password, username });
};
/** 로그인 */
export const POST_login = async ({ email, password }: MemberLoginDto) => {
  return await api.post('/api/member/login', { email, password });
};
