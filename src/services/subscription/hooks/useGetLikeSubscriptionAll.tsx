import { GET_like_subscription_all } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetLikeSubscriptionAll = () => {
  return useQuery({
    queryKey: [GET_like_subscription_all.name],
    queryFn: () => GET_like_subscription_all(),
    select: ({ data }) => data,
  });
};
