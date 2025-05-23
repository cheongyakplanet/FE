import { GET_city_list } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetCityList = (region: string) => {
  return useQuery({
    queryKey: [GET_city_list.name, region],
    queryFn: () => GET_city_list(region),
    select: ({ data }) => data,
    enabled: !!region, // region이 있을 때만 실행
  });
};
