import { GET_kakao_exchange } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetKakaoExchange = (state: string) => {
  return useQuery({
    queryKey: [GET_kakao_exchange.name],
    queryFn: () => GET_kakao_exchange(state),
    select: ({ data }) => data,
  });
};
