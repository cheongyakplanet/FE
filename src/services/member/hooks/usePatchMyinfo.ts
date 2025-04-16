import { GET_mypage, PATCH_mypage } from '../api';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchMyinfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [PATCH_mypage.name],
    mutationFn: PATCH_mypage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_mypage.name] });
    },
  });
};
