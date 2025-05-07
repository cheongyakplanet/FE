import { GET_like_subscription_by_id, POST_like_subscription } from '../api';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostLikeSubscription = (subscriptionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [POST_like_subscription.name, subscriptionId],
    mutationFn: () => POST_like_subscription(subscriptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_like_subscription_by_id.name, subscriptionId] });
    },
  });
};
