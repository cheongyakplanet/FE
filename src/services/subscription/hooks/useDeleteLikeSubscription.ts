import { DELETE_like_subscription, GET_like_subscription_by_id } from '../api';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteLikeSubscription = (subscriptionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [DELETE_like_subscription.name, subscriptionId],
    mutationFn: () => DELETE_like_subscription(subscriptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_like_subscription_by_id.name, subscriptionId] });
    },
  });
};
