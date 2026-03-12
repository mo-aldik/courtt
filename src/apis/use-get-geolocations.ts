import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import http from './config/http-service';
import { useQueryWrapper } from './config/use-api-wrapper';

const isProd = import.meta.env.VITE_REACT_APP_ENV_VAR === 'production';
const endpoint = isProd ? 'dashboard2/api/v1/geolocations' : 'dashboard2/api/v1/geolocations';

export const getGeolocationsApiEndpointIdentifier = endpoint;

type TData = Record<string, any>;
type TError = AxiosError;

type TQueryKey = [typeof endpoint];

type Options = Omit<UseQueryOptions<unknown, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>;
type ReturnType = UseQueryResult<TData, TError>;

export function useGetGeolocationsApi(options?: Options): ReturnType {
  const queryFn = async () => {
    try {
      const { data } = await http.get(endpoint);

      return data;
    } catch (error: any) {
      if (!error.response.status || !error.response.data.Message) throw error;

      // Important to not show the toast in unauthorized case.
      if (error.response?.status === 401) throw error;

      throw error;
    }
  };

  return useQueryWrapper([endpoint], queryFn, {
    ...options,
  });
}
