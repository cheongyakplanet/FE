import { GET_facilities_by_subscription } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetFacilitiesBySubscription = (id: string) => {
  return useQuery({
    queryKey: [GET_facilities_by_subscription.name, id],
    queryFn: () => GET_facilities_by_subscription(id),
    select: ({ data }) => data,
  });
};
