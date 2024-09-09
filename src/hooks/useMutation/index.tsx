import { DefaultError, useMutation as useReactMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { output, ZodType, ZodTypeAny } from 'zod';

import { TResponse } from '@/schemas/template/response';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { authAction } from '@/stores/reducers/auth';
import { fetchClientSide } from '@/utils/api/fetchClientSide';
import { TRefreshTokenFetcher } from '@/utils/api/type';

import { useLogout } from '../useLogout';
import { UseMutationProps } from './type';

export const useMutation = <TRequestSchema extends ZodTypeAny, TResponseSchema extends ZodType<TResponse>>(
  props: UseMutationProps<TRequestSchema, TResponseSchema>
) => {
  const { apiConfig, requestSchema, responseSchema, options, onError, onSuccess, fetchOptions, parameters, isQueryData = false } = props;

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

  const mutation = useReactMutation<output<TResponseSchema>, DefaultError, output<TRequestSchema>>({
    ...(options || ({} as any)),
    mutationFn: (variables) => {
      return fetchClientSide<TRequestSchema, TResponseSchema>({
        apiConfig,
        responseSchema,
        requestSchema,
        options: fetchOptions,
        parameters,
        payload: variables,
        isQueryData,
        accessToken: apiConfig.accessToken === true ? token?.accessToken || undefined : '',
        refreshToken: token?.refreshToken || undefined,
        onRefreshToken,
        onError,
        onSuccess,
        logout,
      });
    },
    refetchOnWindowFocus: false,
    mutationKey: [...apiConfig.keys, options?.mutationKey],
  });

  const { error } = mutation;

  // Application Error
  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return mutation;
};
