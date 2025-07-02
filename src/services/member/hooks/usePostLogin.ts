'use client';

import { POST_login } from '../api';

import { useMutation } from '@tanstack/react-query';

import { useTokenStore } from '@/stores/auth-store';

import { ApiErrorResponse } from '@/types/api-types';

export const usePostLogin = () => {
  const updateToken = useTokenStore((state) => state.updateToken);

  return useMutation({
    mutationKey: [POST_login.name],
    mutationFn: async (credentials: { email: string; password: string }) => {
      try {
        const response = await POST_login(credentials);
        
        // Check if the response indicates success
        if (response.data?.status === 'success') {
          return response;
        } else {
          // API returned failure status - throw error to trigger onError
          const errorData = response.data?.data || {};
          const error = new Error(errorData.message || '로그인에 실패했습니다.');
          (error as any).response = { data: response.data };
          throw error;
        }
      } catch (error: any) {
        // Re-throw to ensure onError is called
        throw error;
      }
    },
    onSuccess: ({ data }) => {
      updateToken({ ...data.data });
    },
    onError: (error: any) => {
      // Error handling is delegated to the component
      console.error('Login failed:', error);
    },
  });
};
