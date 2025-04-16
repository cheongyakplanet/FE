import { GET_popular_locations } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetPopularLocations = () => {
  return useQuery({
    queryKey: [GET_popular_locations.name],
    queryFn: () => GET_popular_locations(),
    select: ({ data }) => data,
  });
};
