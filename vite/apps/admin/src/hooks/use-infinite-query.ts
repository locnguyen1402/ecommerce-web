import {
  useInfiniteQuery as useBase,
  UseInfiniteQueryOptions as optionsBase,
  getNextPageParam,
  PagingParams,
  ResponseWithPagination,
  InfiniteData,
} from '@mila/api';

import { sendGetRequest } from '@/shared/http';
import { FIRST_PAGE_INDEX } from '@/constants';

import { PaginationListQuery } from './use-pagination-query';

export type UseInfiniteQueryOptions = Omit<
  optionsBase,
  'queryFn' | 'getNextPageParam' | 'initialPageParam'
> & {
  getAdditionalParams?: () => {
    [key: string]: any;
  };
  fullPagingInfo?: boolean;
  pageSize?: number;
};

export const useInfiniteQuery = <T extends {}>(
  url: string,
  {
    queryKey,
    getAdditionalParams,
    fullPagingInfo = false,
    pageSize = 10,
    ...restOptions
  }: UseInfiniteQueryOptions
) => {
  const additionParams = typeof getAdditionalParams === 'function' ? getAdditionalParams() : {};
  const initialPageParam: PagingParams = { pageIndex: FIRST_PAGE_INDEX, pageSize };
  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    fetchPreviousPage,
  } = useBase<
    ResponseWithPagination<T>,
    any,
    InfiniteData<ResponseWithPagination<T>>,
    any,
    PagingParams
  >(
    // @ts-ignore
    {
      ...restOptions,
      initialPageParam,
      getNextPageParam,
      queryKey,
      queryFn: async ({ pageParam }: { pageParam: PagingParams }) => {
        const query: PaginationListQuery = {
          ...additionParams,
          pageIndex: pageParam.pageIndex,
          pageSize: pageParam.pageSize,
          fullPagingInfo,
        };

        const response = await sendGetRequest<T, true>(url, {
          params: query,
        });

        return response.data;
      },
    }
  );

  return {
    data,
    dataItems: data?.pages.flatMap((p) => p.content) || [],
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    fetchPreviousPage,
  };
};
