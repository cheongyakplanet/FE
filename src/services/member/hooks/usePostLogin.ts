'use client';

import { POST_login } from '../api';

import { useMutation } from '@tanstack/react-query';

import { useTokenStore } from '@/stores/auth-store';

export const usePostLogin = () => {
  const updateToken = useTokenStore((state) => state.updateToken);

  return useMutation({
    mutationKey: [POST_login.name],
    mutationFn: POST_login,
    onSuccess: ({ data }) => {
      if (data.status === 'success') {
        updateToken({ ...data.data });
      } else throw new Error('Failed Login');
    },
  });
};
