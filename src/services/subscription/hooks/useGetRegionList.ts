import { GET_region_list } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetRegionList = () => {
  return useQuery({
    queryKey: [GET_region_list.name],
    queryFn: () => GET_region_list(),
    select: ({ data }) => data,
  });
};
