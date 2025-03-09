import { GET_post, GET_postDetail } from '../api';

import { useMutation } from '@tanstack/react-query';

import { useAllPostStore, useDetailPostStore } from '@/stores/community';

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

export const useGetPostDetail = () => {
  const detailPostStore = useDetailPostStore();
  return useMutation({
    mutationKey: [GET_postDetail.name],
    mutationFn: GET_postDetail,
    onSuccess: ({ data }) => {
      detailPostStore.updateDetailPost(data);
    },
  });
};
