import { DELETE_member } from '../api';

import { useMutation } from '@tanstack/react-query';

export const useDeleteMember = () => {
  return useMutation({
    mutationKey: [DELETE_member.name],
    mutationFn: DELETE_member,
  });
};
