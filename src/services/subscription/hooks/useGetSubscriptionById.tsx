import { GET_subscription_by_id } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetSubscriptionById = (id: string) => {
  return useQuery({
    queryKey: [GET_subscription_by_id.name, id],
    queryFn: () => GET_subscription_by_id(id),
    enabled: !!id,
    select: ({ data }) => data,
  });
};
