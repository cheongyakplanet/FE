import { GET_upcoming_subscription } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetUpcomingSubscription = () => {
  return useQuery({
    queryKey: [GET_upcoming_subscription.name],
    queryFn: GET_upcoming_subscription,
    select: ({ data }) => data,
  });
};
