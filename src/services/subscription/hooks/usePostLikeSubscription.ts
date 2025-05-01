import { POST_like_subscription } from '../api';

import { useMutation } from '@tanstack/react-query';

export const usePostLikeSubscription = (subscriptionId: string) => {
  return useMutation({
    mutationKey: [POST_like_subscription.name, subscriptionId],
    mutationFn: () => POST_like_subscription(subscriptionId),
  });
};
