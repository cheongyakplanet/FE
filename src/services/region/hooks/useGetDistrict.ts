import { GET_district } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetDistrict = (city: string) => {
  return useQuery({
    queryKey: [GET_district.name, city],
    queryFn: () => GET_district(city),
    select: ({ data }) => data.data,
  });
};
