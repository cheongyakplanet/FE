import { DELETE_like_subscription } from '../api';

import { useMutation } from '@tanstack/react-query';

export const useDeleteLikeSubscription = (subscriptionId: string) => {
  return useMutation({
    mutationKey: [DELETE_like_subscription.name, subscriptionId],
    mutationFn: () => DELETE_like_subscription(subscriptionId),
  });
};
