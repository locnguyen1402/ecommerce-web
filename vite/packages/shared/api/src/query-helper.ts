import { GetNextPageParamFunction } from '@tanstack/react-query';

import { PagingParams, ResponseWithPagination } from './common';

export const getNextPageParam: GetNextPageParamFunction<
  PagingParams,
  ResponseWithPagination<any>
> = (lastResponse, _, lastParams) => {
  const hasNextPage = lastResponse.meta?.pagination.hasNextPage;
  const currentPageIndex = lastParams?.pageIndex || 0;

  return hasNextPage
    ? {
        ...lastParams,
        pageIndex: currentPageIndex + 1,
      }
    : null;
};
