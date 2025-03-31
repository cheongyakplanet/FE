import { MemberLoginDto, MemberSignupDto, MyPageDto } from './types';

import api from '@/lib/api';

import { ApiResponse } from '@/types/api-types';

/** 회원가입 */
export const POST_signup = async ({ email, password, username }: MemberSignupDto) => {
  return await api.post('/api/member/signup', { email, password, username });
};
/** 로그인 */
export const POST_login = async ({ email, password }: MemberLoginDto) => {
  return await api.post('/api/member/login', { email, password });
};

/** 마이페이지 조회 */
export const GET_mypage = async () => {
  return await api.get<ApiResponse<MyPageDto>>('/api/member/mypage');
};
