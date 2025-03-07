import { GET_post } from '../api';

import { useMutation } from '@tanstack/react-query';

import { useAllPostStore } from '@/stores/community';

export const useGetPost = () => {
  const allPostStore = useAllPostStore();

  return useMutation({
    mutationKey: [GET_post.name],
    mutationFn: GET_post,
    onSuccess: ({ data }) => {
      allPostStore.updatePost({ contents: data.content, totalPages: data.totalPages });
    },
  });
};
