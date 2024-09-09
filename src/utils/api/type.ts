import { output, ZodType, ZodTypeAny } from 'zod';

import { TResponse } from '@/schemas/template/response';
import { APIConfig, EndPointParameter } from '@/types/api';

export type TRefreshTokenFetcher = {
  accessToken?: string;
  refreshToken?: string;
};

export interface BaseFetcherProp {
  apiConfig: APIConfig;
  options?: RequestInit;
  setLoading?: (data: boolean) => void;
}

export interface FetcherProps<TRequestSchema extends ZodTypeAny, TResponseSchema extends ZodType<TResponse>> {
  requestSchema?: TRequestSchema;
  responseSchema: TResponseSchema;
  payload?: output<TRequestSchema>;
  parameters?: EndPointParameter;
  init: RequestInit;
  endpoint: string;
  setLoading?: (data: boolean) => void;
  accessToken?: string;
  isQueryData?: boolean;
}

export type FetchClientSideProps<TRequestSchema extends ZodTypeAny, TResponseSchema extends ZodType<TResponse>> = BaseFetcherProp & {
  requestSchema?: TRequestSchema;
  responseSchema: TResponseSchema;
  payload?: output<TRequestSchema>;
  parameters?: EndPointParameter;
  init?: RequestInit;
  accessToken?: string;
  refreshToken?: string;
  onRefreshToken?: (arg: TRefreshTokenFetcher) => void;
  onSuccess?: (response: output<TResponseSchema>) => void;
  onError?: (response: output<TResponseSchema>) => void;
  logout?: () => void;
  setLoading?: (data: boolean) => void;
  isQueryData?: boolean;
};

export type TResponseHandler<TResponseSchema extends ZodType<TResponse>> = {
  onSuccess?: (response: output<TResponseSchema>) => void;
  onError?: (response: output<TResponseSchema>) => void;
  response: output<TResponseSchema>;
  logout?: () => void;
};
