import { GET_region } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetRegion = () => {
  return useQuery({
    queryKey: [GET_region.name],
    queryFn: GET_region,
    select: ({ data }) => data.data,
  });
};
