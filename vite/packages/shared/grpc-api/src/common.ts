export type PagingParams = {
  pageIndex: number;
  pageSize: number;
};

export type PaginationInfo = {
  pageIndex: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
