import { POST_findId } from '../api';

import { useMutation } from '@tanstack/react-query';

export const usePostFindId = () => {
  return useMutation({
    mutationKey: [POST_findId.name],
    mutationFn: POST_findId,
  });
};
