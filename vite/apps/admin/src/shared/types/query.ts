import { PlainMessage, PagingParams as PagingParamsBase } from '@vklink/grpc-api';

export type BaseQuery = {
  keyword?: string;
};

export type PagingParams = PlainMessage<PagingParamsBase>;

export type PaginatedQueryParams<T extends Record<string, any> = {}> = BaseQuery & PagingParams & T;

export type ControlledPaginatedQueryParams<
  T extends Record<string, any>,
  TExclude extends Record<string, any> = {},
> = Omit<PaginatedQueryParams<T>, keyof PagingParams | keyof TExclude>;
