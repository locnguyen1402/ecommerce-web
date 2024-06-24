import {
  useQuery as useQueryBase,
  keepPreviousData,
  PaginationInfo,
  PagingParams,
} from '../../../../packages/shared/api/src';

import { getPaginatedList } from '@/shared/http';

export type PaginationListQuery = {
  [key: string]: any;
  paging?: PagingParams;
};

export type PaginationListResponse<T> = {
  value: T[];
  paging?: PaginationInfo;
};

export type PaginationApi<T> = (
  url: string,
  query: PaginationListQuery
) => Promise<PaginationListResponse<T>>;

type UsePaginationQueryOptions = {
  queryKey?: any[];
  paging: PagingParams;
  getAdditionalParams?: () => {
    [key: string]: any;
  };
  enabled?: boolean;
};

export const usePaginationQuery = <T extends {}>(
  url: string,
  { queryKey, getAdditionalParams, paging, enabled }: UsePaginationQueryOptions
) => {
  const additionParams = typeof getAdditionalParams === 'function' ? getAdditionalParams() : {};

  const primaryQueryKey = [paging.pageIndex, paging.pageSize, additionParams, ...(queryKey || [])];
  const { data, isLoading, refetch, isRefetching } = useQueryBase({
    enabled,
    retry: false,
    placeholderData: keepPreviousData,
    queryKey: primaryQueryKey,
    queryFn: ({ queryKey: [pageIndex, pageSize] }) => {
      const query: PaginationListQuery = {
        ...additionParams,
        paging: {
          pageIndex,
          pageSize,
        },
      };

      return getPaginatedList<T>(url, query);
    },
  });

  const defaultPagingInfo = {
    ...paging,
  };

  return {
    data: data?.value,
    pagingInfo: data?.paging || (defaultPagingInfo as PaginationInfo),
    isLoading,
    isRefetching,
    refetch,
    queryKey: primaryQueryKey,
  };
};
