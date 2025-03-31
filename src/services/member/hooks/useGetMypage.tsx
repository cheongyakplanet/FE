import { GET_mypage } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetMypage = () => {
  return useQuery({
    queryKey: [GET_mypage.name],
    queryFn: GET_mypage,
    select: ({ data }) => data,
  });
};
