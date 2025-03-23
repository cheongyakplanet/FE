import { GET_all_subscription } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetAllSubscription = (page: number, size: number) => {
  return useQuery({
    queryKey: [GET_all_subscription.name, page, size],
    queryFn: () => GET_all_subscription({ params: { page, size } }),
    select: ({ data }) => data,
  });
};
