import { ChangePwDto, FindPwDto, MemberLoginDto, MemberSignupDto, MyInfoDto, MyPageDto } from './types';
import { MyPostDto } from './types';

import api from '@/lib/api';

import { ApiResponse } from '@/types/api-types';
import { FilterParams, PaginatedResponse } from '@/types/api-types';

/** 회원가입 */
export const POST_signup = async ({ email, password, username }: MemberSignupDto) => {
  return await api.post('/api/member/signup', { email, password, username });
};
/** 로그인 */
export const POST_login = async ({ email, password }: MemberLoginDto) => {
  return await api.post('/api/member/login', { email, password });
};

export const POST_findId = async (email: string) => {
  const response = await api.post(`/api/member/find-id?email=${encodeURIComponent(email)}`);
  return response.data.status;
};

export const POST_findPw = async ({ pwEmail, name }: FindPwDto) => {
  const response = await api.post(
    `api/member/find-password?arg0=${encodeURIComponent(pwEmail)}&arg1=${encodeURIComponent(name)}`,
  );
  return response.data.data;
};

export const POST_changePw = async ({ pwEmail, name, validCode, newPw }: ChangePwDto) => {
  return await api.post('/api/member/reset-password', null, {
    params: {
      arg0: pwEmail,
      arg1: name,
      arg2: validCode,
      arg3: validCode,
      arg4: newPw,
      arg5: newPw,
    },
  });
};

/** 마이페이지 조회 */
export const GET_mypage = async (): Promise<ApiResponse<MyPageDto>> => {
  return await api.get('/api/member/mypage');
};

/** 내가 작성한 글 조회 */
export const GET_mypost = async ({ params }: { params: FilterParams }): Promise<PaginatedResponse<MyPostDto>> => {
  return await api.get('api/community/post/my', { params });
};

/** 내가 작성한 글 삭제 */
export const DELETE_mypost = async (id: string) => {
  return await api.delete(`/api/community/post/${id}`);
};

/** 마이페이지 수정 */
export const PATCH_mypage = async (changedFields: Partial<MyInfoDto>) => {
  return await api.patch('/api/member/mypage', changedFields);
};

/** 회원 탈퇴 */
export const DELETE_member = async () => {
  return await api.delete('/api/member/mypage');
};

/** 관심 지역 삭제 */
export const DELETE_region = async (region: string) => {
  return await api.delete('api/member/location', { params: { locations: region } });
};
