import { GET_closing_subscription } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetClosingSubscription = () => {
  return useQuery({
    queryKey: [GET_closing_subscription.name],
    queryFn: GET_closing_subscription,
    select: ({ data }) => data,
  });
};
