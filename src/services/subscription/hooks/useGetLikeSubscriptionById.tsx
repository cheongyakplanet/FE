import { GET_like_subscription_by_id } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetLikeSubscriptionById = (subscriptionId: string) => {
  return useQuery({
    queryKey: [GET_like_subscription_by_id.name, subscriptionId],
    queryFn: () => GET_like_subscription_by_id(subscriptionId),
    select: ({ data }) => data,
  });
};
