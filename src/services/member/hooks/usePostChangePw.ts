import { POST_changePw } from '../api';

import { useMutation } from '@tanstack/react-query';

export const usePostChangePw = () => {
  return useMutation({
    mutationKey: [POST_changePw.name],
    mutationFn: POST_changePw,
  });
};
