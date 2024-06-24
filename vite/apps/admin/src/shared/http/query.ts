import { AxiosResponse, PaginationInfo, ResponseWithPagination } from '@vklink/api';

import { PaginationListQuery, PaginationListResponse } from '@/hooks';

import { http } from './instance';

export const getPaginatedList = async <T>(
  url: string,
  query: PaginationListQuery
): Promise<PaginationListResponse<T>> => {
  const pageIndex = query.paging?.pageIndex !== undefined ? query.paging?.pageIndex : 1;
  const pageSize = query.paging?.pageSize !== undefined ? query.paging?.pageSize : 10;
  const response: AxiosResponse<ResponseWithPagination<T[]>> = await http.get(url, {
    params: {
      ...query,
      pageIndex,
      pageSize,
    },
  });

  return {
    value: response.data.content,
    paging: response.data.meta.pagination,
  };
};
