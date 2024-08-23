import qs from 'query-string';
import { v4 as uuidv4 } from 'uuid';
import { output, ZodType, ZodTypeAny } from 'zod';

import { BASE_API } from '@/constants/app';
import { TResponse } from '@/schemas/template/response';
import { isValidUrl } from '@/utils/isValidUrl';

import { FetcherProps } from '../type';

export async function fetcher<TRequestSchema extends ZodTypeAny, TResponseSchema extends ZodType<TResponse>>(
  props: FetcherProps<TRequestSchema, TResponseSchema>
): Promise<output<TResponseSchema>> {
  const { endpoint, init, responseSchema, requestSchema, payload, isQueryData = false, setLoading, accessToken } = props;
  const headers = new Headers(init?.headers);
  setLoading && setLoading(true);

  if (!headers.get('Content-Type')) {
    headers.append('Content-Type', 'application/json');
  }

  if (accessToken) {
    headers.append('Authorization', `Bearer ${accessToken}`);
  }

  headers.append('Client-Message-Id', uuidv4());

  try {
    let body;
    const payloadParser = requestSchema && requestSchema.parse(payload);

    if (init?.method !== 'GET') {
      body = JSON.stringify(payloadParser);
    }

    const combineUrl = !isValidUrl(endpoint) ? BASE_API + endpoint : endpoint;
    const url = qs.stringifyUrl(
      { url: combineUrl, query: payloadParser && (payloadParser as any) },
      { arrayFormat: 'comma', skipNull: true, skipEmptyString: true }
    );

    const res = await fetch(init?.method === 'GET' || isQueryData ? url : combineUrl, { ...(init ?? {}), headers, body });
    const { data, errors } = await res.json();

    return responseSchema.parse({
      data: data || undefined,
      statusCode: res.status,
      success: res.ok,
      errors: errors || undefined,
    });

    // eslint-disable-next-line no-useless-catch
  } catch (exception) {
    throw exception;
  } finally {
    setLoading && setLoading(false);
  }
}
