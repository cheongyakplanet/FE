import api from '@/lib/api';

export const GET_region = async () => {
  return await api.get('/api/info/subscription/regionlist');
};

export const GET_district = async (city: string) => {
  return await api.get('api/info/subscription/citylist', { params: { region: city } });
};