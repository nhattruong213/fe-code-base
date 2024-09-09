import { output, ZodType, ZodTypeAny } from 'zod';

import { HTTP_STATUS_AUTH_FAILED, HTTP_STATUS_CODE } from '@/constants/httpCode';
import { RefreshTokenReq } from '@/schemas/refreshToken/refeshReq';
import { RefreshTokenRes } from '@/schemas/refreshToken/refreshRes';
import { TResponse } from '@/schemas/template/response';
import { postRefeshToken } from '@/services/api/refreshToke';

import { parseApiEndpoint } from '../apiEndpointParser';
import { fetcher } from './fetcher';
import { FetchClientSideProps, TResponseHandler } from './type';

export async function fetchClientSide<TRequestSchema extends ZodTypeAny, TResponseSchema extends ZodType<TResponse>>(
  props: FetchClientSideProps<TRequestSchema, TResponseSchema>
): Promise<output<TResponseSchema>> {
  const { apiConfig, options, parameters, refreshToken, onRefreshToken, onError, onSuccess, logout } = props;

  const res = await fetcher<TRequestSchema, TResponseSchema>({
    ...props,
    endpoint: parseApiEndpoint(apiConfig.endPoint, parameters),
    init: {
      ...options,
      method: apiConfig.method,
      next: {
        tags: apiConfig.keys,
      },
    },
  });

  if (HTTP_STATUS_AUTH_FAILED.includes(res.statusCode) && refreshToken) {
    // Refresh token
    const refreshTokenRes = await fetcher({
      responseSchema: RefreshTokenRes,
      requestSchema: RefreshTokenReq,
      endpoint: postRefeshToken.endPoint,
      payload: {
        token: refreshToken,
      },
      init: {
        method: postRefeshToken.method,
        next: {
          tags: postRefeshToken.keys,
        },
      },
    });

    if (refreshTokenRes.success === false) {
      return handleResponse({
        response: res,
        onError,
        onSuccess,
        logout,
      });
    }

    onRefreshToken &&
      onRefreshToken({
        accessToken: refreshTokenRes.data?.accessToken,
        refreshToken: refreshTokenRes.data?.refreshToken,
      });

    // Retry
    const resRetry = await fetcher<TRequestSchema, TResponseSchema>({
      ...props,
      accessToken: refreshTokenRes.data?.accessToken,
      endpoint: parseApiEndpoint(apiConfig.endPoint, parameters),
      init: {
        ...options,
        method: apiConfig.method,
        next: {
          tags: apiConfig.keys,
        },
      },
    });

    return handleResponse({
      response: resRetry,
      onError,
      onSuccess,
      logout,
    });
  }

  return handleResponse({
    response: res,
    onError,
    onSuccess,
    logout,
  });
}

function handleResponse<TResponseSchema extends ZodType<TResponse>>(args: TResponseHandler<TResponseSchema>) {
  const { response, onError, onSuccess, logout } = args;

  // TODO: Optimize

  // Success
  if (response?.success === true) {
    // Customer success
    onSuccess &&
      onSuccess({
        data: response?.data,
        statusCode: response?.statusCode,
        success: response?.success,
      });

    return response;
  }

  // Error
  if (response?.success === false) {
    if (response.statusCode === HTTP_STATUS_CODE.UNAUTHORIZED) {
      logout && logout();
    }

    // TODO: Add common error handler

    // Custom error
    onError &&
      onError({
        errors: response?.errors,
        statusCode: response?.statusCode,
        success: response?.success,
      });

    return response;
  }

  return response;
}
