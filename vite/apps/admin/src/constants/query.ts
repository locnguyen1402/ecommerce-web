import { PagingParams } from '@vklink/api';

export const DEFAULT_PAGE_SIZE = 10;
export const FIRST_PAGE_INDEX = 0;

export const DEFAULT_PAGING_PARAMS: PagingParams = {
  pageIndex: FIRST_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_SIZE,
};
