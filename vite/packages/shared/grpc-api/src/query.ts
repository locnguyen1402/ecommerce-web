import { useQuery as useQueryBase, keepPreviousData } from '@tanstack/react-query';

import { PlainMessage } from '@bufbuild/protobuf';

import { FilteringParams, PagingInfoResponse, PagingParams, SortingParams } from './common';

type PaginationListQuery = {
  [key: string]: any;
  filter?: PlainMessage<FilteringParams>;
  sortBy: PlainMessage<SortingParams>[];
  paging?: PlainMessage<PagingParams>;
};

export type PaginationListResponse<T> = {
  value: T[];
  paging?: PagingInfoResponse;
};

export type PaginationApi<T> = (query: PaginationListQuery) => Promise<PaginationListResponse<T>>;

type UsePaginationQueryOptions = {
  queryKey?: any[];
  paging: PlainMessage<PagingParams>;
  getAdditionalParams?: () => {
    [key: string]: any;
    filter?: PlainMessage<FilteringParams>;
    sortBy?: PlainMessage<SortingParams>[];
  };
  enabled?: boolean;
};

const usePaginationQuery = <T extends {}>(
  requestFn: PaginationApi<T>,
  { queryKey, getAdditionalParams, paging, enabled }: UsePaginationQueryOptions
) => {
  const additionParams =
    typeof getAdditionalParams === 'function'
      ? getAdditionalParams()
      : {
          sortBy: [],
        };

  const primaryQueryKey = [paging.pageIndex, paging.pageSize, additionParams, ...(queryKey || [])];
  const { data, isLoading, refetch, isRefetching } = useQueryBase({
    enabled,
    retry: false,
    placeholderData: keepPreviousData,
    queryKey: primaryQueryKey,
    queryFn: ({ queryKey: [pageIndex, pageSize] }) => {
      const query: PaginationListQuery = {
        ...additionParams,
        sortBy: additionParams.sortBy || [],
        paging: {
          pageIndex,
          pageSize,
        },
      };

      return requestFn(query);
    },
  });

  const defaultPagingInfo = {
    ...paging,
  };

  return {
    data: data?.value,
    pagingInfo: data?.paging || (defaultPagingInfo as PlainMessage<PagingInfoResponse>),
    isLoading,
    isRefetching,
    refetch,
    queryKey: primaryQueryKey,
  };
};

export { usePaginationQuery };
