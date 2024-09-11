import { UseMutationOptions } from '@tanstack/react-query';
import { input, output, ZodType, ZodTypeAny } from 'zod';

import { TResponse } from '@/schemas/template/response';
import { APIConfig } from '@/types/api';
import { EndPointParameter } from '@/utils/apiEndpointParser';

export type UseMutationProps<TRequestSchema extends ZodTypeAny, TResponseSchema extends ZodType<TResponse>> = {
  apiConfig: APIConfig;
  parameters?: EndPointParameter;
  requestSchema: TRequestSchema;
  responseSchema: TResponseSchema;
  query?: input<TRequestSchema>;
  options?: UseMutationOptions;
  fetchOptions?: RequestInit;
  onSuccess?: (response: output<TResponseSchema>) => void;
  onError?: (response: output<TResponseSchema>) => void;
  isDefaultError?: boolean;
  isDefaultSuccess?: boolean;
  loadingKey?: string;
  isQueryData?: boolean;
  accessToken?: string;
};
