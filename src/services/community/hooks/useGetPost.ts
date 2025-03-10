import { GET_post, GET_postDetail, POST_comment, POST_like } from '../api';

import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { useDetailPostStore } from '@/stores/community';

export const useGetPost = ({ sort, page }: { sort: string; page: number }) => {
  return useQuery({
    queryKey: ['posts', sort, page],
    queryFn: () => GET_post({ sort, page }),
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

export const usePostComment = () => {
  return useMutation({
    mutationKey: [POST_comment.name],
    mutationFn: POST_comment,
  });
};

export const usePostLike = () => {
  const detailPostStore = useDetailPostStore();
  return useMutation({
    mutationKey: [POST_like.name],
    mutationFn: POST_like,
    onSuccess: () => {
      detailPostStore.updateDetailPost({
        ...detailPostStore,
        likes: detailPostStore.likes + 1,
      });
    },
  });
};
