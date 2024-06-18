import { PaginationInfo } from '@vklink/grpc-api';

import { PaginationListQuery, PaginationListResponse } from '@/hooks';

import { http } from './instance';

const HEADER_PAGINATION_KEY = 'X-Pagination';

export const getPaginatedList = async <T>(
  url: string,
  query: PaginationListQuery
): Promise<PaginationListResponse<T>> => {
  const pageIndex = query.paging?.pageIndex !== undefined ? query.paging?.pageIndex : 1;
  const pageSize = query.paging?.pageSize !== undefined ? query.paging?.pageSize : 10;
  const response = await http.get<T[]>(url, {
    params: {
      ...query,
      pageIndex,
      pageSize,
    },
  });

  let paginationInfo: PaginationInfo = {
    pageIndex,
    pageSize,
    hasPreviousPage: false,
    hasNextPage: false,
  };

  if (
    response.headers[HEADER_PAGINATION_KEY] ||
    response.headers[HEADER_PAGINATION_KEY.toLowerCase()]
  ) {
    try {
      paginationInfo = JSON.parse(
        response.headers[HEADER_PAGINATION_KEY] ||
          response.headers[HEADER_PAGINATION_KEY.toLowerCase()]
      );
    } catch (error) {
      console.error(error);
    }
  }

  return {
    value: response.data,
    paging: paginationInfo,
  };
};
