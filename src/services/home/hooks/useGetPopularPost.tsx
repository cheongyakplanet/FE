import { GET_popular_post } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetPopularPost = () => {
  return useQuery({
    queryKey: [GET_popular_post.name],
    queryFn: GET_popular_post,
    select: ({ data }) => data,
  });
};
