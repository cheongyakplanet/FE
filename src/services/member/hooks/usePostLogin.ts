'use client';

import { POST_login } from '../api';

import { useMutation } from '@tanstack/react-query';

import { useTokenStore } from '@/stores/auth-store';

export const usePostLogin = () => {
  const tokenStore = useTokenStore();

  return useMutation({
    mutationKey: [POST_login.name],
    mutationFn: POST_login,
    onSuccess: ({ data }) => {
      if (data.status === 'success') {
        tokenStore.updateToken({ ...data.data });
      } else throw new Error('Failed Login');
    },
  });
};
