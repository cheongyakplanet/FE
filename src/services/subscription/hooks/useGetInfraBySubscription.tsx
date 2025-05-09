import { GET_infra_by_subscription } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetInfraBySubscription = (subscriptionId: string) => {
  return useQuery({
    queryKey: [GET_infra_by_subscription.name, subscriptionId],
    queryFn: () => GET_infra_by_subscription(subscriptionId),
    select: ({ data }) => data,
  });
};
