import { GET_subscription_by_month } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetSubscriptionByMonth = (year: string, month: string, enabled = true) => {
  return useQuery({
    queryKey: [GET_subscription_by_month.name, year, month],
    queryFn: () => GET_subscription_by_month(year, month),
    select: ({ data }) => data,
    enabled,
  });
};
