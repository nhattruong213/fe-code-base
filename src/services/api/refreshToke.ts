import { APIConfig } from '@/types/api';

export const postRefeshToken: APIConfig = {
  endPoint: '/_api/reserve/v1/auth/refresh-token',
  keys: ['get-refresh-token'],
  method: 'POST',
  accessToken: false,
};
