import { DELETE_region, GET_mypage } from '../api';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteRegion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DELETE_region.name],
    mutationFn: DELETE_region,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_mypage.name] });
    },
  });
};
