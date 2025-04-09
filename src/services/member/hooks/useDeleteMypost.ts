import { DELETE_mypost, GET_mypost } from '../api';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteMypost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [DELETE_mypost.name],
    mutationFn: DELETE_mypost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_mypost.name] });
    },
  });
};
