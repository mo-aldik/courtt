import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { usePageParams } from 'hooks/use-page-params';
import http from './config/http-service';
import { useQueryWrapper } from './config/use-api-wrapper';

const isProd = import.meta.env.VITE_REACT_APP_ENV_VAR === 'production';
const endpoint = isProd ? 'dashboard2/api/v2/get-summary' : 'dashboard2/api/v2/get-summary-static';

export const getDashApiEndpointIdentifier = endpoint;

type TData = Record<string, any>;
type TError = AxiosError;

type TQueryKey = [typeof endpoint];

type Options = Omit<UseQueryOptions<unknown, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>;
type ReturnType = UseQueryResult<TData, TError>;

export function useGetDashApi(options?: Options): ReturnType {
  const now = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(now.getDate() - 7);

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const from = formatDate(oneWeekAgo);
  const to = formatDate(now);
  const { getPageParams } = usePageParams();
  const params = getPageParams();

  console.log(params?.pageRefreshed);

  const queryFn = async () => {
    try {
      const { data } = await http.get(endpoint, { params: { from, to } });

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
