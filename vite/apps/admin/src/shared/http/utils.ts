import { AxiosRequestConfig, HttpMethod, Response, ResponseWithPagination } from '@mila/api';

import { http } from './instance';

type SendRequestOptions<D = any> = Pick<AxiosRequestConfig<D>, 'headers' | 'params'>;

const sendRequest = <TReturn = any, TData = any>(
  method: HttpMethod,
  url: string,
  data?: TData,
  options?: SendRequestOptions
) => {
  return http.request<TReturn>({
    ...options,
    data,
    method,
    url,
  });
};

export const sendGetRequest = <TReturn = any, IsPaging extends boolean = false>(
  url: string,
  options?: SendRequestOptions<undefined>
) => {
  return sendRequest<
    IsPaging extends false ? Response<TReturn> : ResponseWithPagination<TReturn>,
    undefined
  >('GET', url, undefined, options);
};

export const sendPostRequest = <TReturn = any, TData = any>(
  url: string,
  data?: TData,
  options?: SendRequestOptions<TData>
) => {
  return sendRequest<Response<TReturn>, TData>('POST', url, data, options);
};

export const sendPutRequest = <TReturn = any, TData = any>(
  url: string,
  data?: TData,
  options?: SendRequestOptions<TData>
) => {
  return sendRequest<Response<TReturn>, TData>('PUT', url, data, options);
};

export const sendDeleteRequest = <TReturn = any>(
  url: string,
  options?: SendRequestOptions<undefined>
) => {
  return sendRequest<Response<TReturn>, undefined>('DELETE', url, undefined, options);
};
