import { GET_post, GET_postDetail, POST_comment, POST_dislike, POST_like, POST_post, POST_reply } from '../api';

import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const useGetPost = ({ sort, page }: { sort: string; page: number }) => {
  return useQuery({
    queryKey: ['posts', sort, page],
    queryFn: () => GET_post({ sort, page }),
  });
};

export const useGetPostDetail = (id: string) => {
  return useQuery({
    queryKey: ['detailPost', id],
    queryFn: () => GET_postDetail(id),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const usePostComment = () => {
  return useMutation({
    mutationKey: [POST_comment.name],
    mutationFn: POST_comment,
  });
};

export const usePostLike = () => {
  return useMutation({
    mutationKey: [POST_like.name],
    mutationFn: POST_like,
  });
};

export const useNewPost = () => {
  return useMutation({
    mutationKey: [POST_post.name],
    mutationFn: POST_post,
  });
};

export const usePostReply = () => {
  return useMutation({
    mutationKey: [POST_reply.name],
    mutationFn: POST_reply,
  });
};

export const usePostDislike = () => {
  return useMutation({
    mutationKey: [POST_dislike.name],
    mutationFn: POST_dislike,
  });
};
