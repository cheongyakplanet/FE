import { GET_mypost } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetMypost = (page: number, size: number) => {
  return useQuery({
    queryKey: [GET_mypost.name, page, size],
    queryFn: () => GET_mypost({ params: { page, size } }),
    select: ({ data }) => data.data,
  });
};
