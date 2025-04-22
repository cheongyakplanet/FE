import { GET_my_locations } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetMyLocation = () => {
  return useQuery({
    queryKey: [GET_my_locations.name],
    queryFn: GET_my_locations,
    select: ({ data }) => data,
  });
};
