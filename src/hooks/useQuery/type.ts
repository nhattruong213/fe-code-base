import { UseQueryOptions } from '@tanstack/react-query';
import { output, ZodType, ZodTypeAny } from 'zod';

import { TResponse } from '@/schemas/template/response';
import { APIConfig, EndPointParameter } from '@/types/api';

export type UseQueryProps<TRequestSchema extends ZodTypeAny, TResponseSchema extends ZodType<TResponse>> = {
  apiConfig: APIConfig;
  parameters?: EndPointParameter;
  requestSchema?: TRequestSchema;
  responseSchema: TResponseSchema;
  payload?: output<TRequestSchema>;
  query?: output<TRequestSchema>;
  options?: UseQueryOptions;
  fetchOptions?: RequestInit;
  onSuccess?: (response: output<TResponseSchema>) => void;
  onError?: (response: output<TResponseSchema>) => void;
  isDefaultError?: boolean;
  isDefaultSuccess?: boolean;
  loadingKey?: string;
};
