import { GET_price_summary } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetPriceSummary = (region: string, city: string, umdNm: string) => {
  return useQuery({
    queryKey: [GET_price_summary.name, region, city, umdNm],
    queryFn: () => GET_price_summary({ region, city, umdNm }),
    select: ({ data }) => data,
    enabled: !!region && !!city && !!umdNm,
  });
};
