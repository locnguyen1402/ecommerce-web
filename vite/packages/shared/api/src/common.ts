export type PagingParams = {
  pageIndex: number;
  pageSize: number;
};

export type PaginationInfo = {
  pageIndex: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalPages?: number;
  totalItems?: number;
};

export type Response<TData> = {
  content: TData;
};

export type ResponseWithPagination<TData> = Response<TData> & {
  meta: {
    pagination: PaginationInfo;
  };
};
