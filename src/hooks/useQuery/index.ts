'use client';

import { useQuery as useReactQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { output, ZodType, ZodTypeAny } from 'zod';

import { queryClient } from '@/containers/appProvider';
import { TResponse } from '@/schemas/template/response';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { authAction } from '@/stores/reducers/auth';
import { fetchClientSide } from '@/utils/api/fetchClientSide';
import { TRefreshTokenFetcher } from '@/utils/api/type';

import { useLogout } from '../useLogout';
import { UseQueryProps } from './type';

export const useQuery = <TRequestSchema extends ZodTypeAny, TResponseSchema extends ZodType<TResponse>>(
  props: UseQueryProps<TRequestSchema, TResponseSchema>
) => {
  const { apiConfig, requestSchema, responseSchema, options, onError, onSuccess, fetchOptions, parameters, payload } = props;

  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { logout } = useLogout();

  const onRefreshToken = ({ accessToken, refreshToken }: TRefreshTokenFetcher) => {
    dispatch(
      authAction.setToken({
        accessToken: accessToken || null,
        refreshToken: refreshToken || null,
      })
    );
  };

  const queryResult = useReactQuery<output<TResponseSchema>>({
    ...(options || ({} as any)),
    queryFn: () => {
      return fetchClientSide<TRequestSchema, TResponseSchema>({
        apiConfig,
        responseSchema,
        requestSchema,
        options: fetchOptions,
        parameters,
        accessToken: apiConfig.accessToken === true ? token?.accessToken || undefined : '',
        refreshToken: token?.refreshToken || undefined,
        payload,
        onRefreshToken,
        logout,
        onError,
        onSuccess,
      });
    },
    refetchOnWindowFocus: false,
    queryKey: [...apiConfig.keys, options?.queryKey],
  });
  const { error, data } = queryResult;

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (data?.success === true) {
      queryClient.removeQueries({ type: 'inactive' });
    }
  }, [data?.success]);

  return queryResult;
};
