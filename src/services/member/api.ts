import { MemberLoginDto } from './types';

import api from '@/lib/api';

export const POST_login = async ({ email, password }: MemberLoginDto) => {
  return await api.post('/api/member/login', { email, password });
};
