import { GET_mypage, POST_region } from '../api';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostInterestRegion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [POST_region.name],
    mutationFn: POST_region,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_mypage.name] });
    },
  });
};
