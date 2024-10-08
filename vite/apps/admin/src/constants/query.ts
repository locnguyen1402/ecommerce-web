import { PagingParams } from '@mila/api';

export const DEFAULT_PAGE_SIZE = 10;
export const FIRST_PAGE_INDEX = 0;

export const DEFAULT_PAGING_PARAMS: PagingParams = {
  pageIndex: FIRST_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_SIZE,
};

export const LIST_QUERY_KEY = 'list-page';
export const DETAIL_QUERY_KEY = 'detail-page';

export const QUERY_KEYS = {
  merchant: {
    base: 'merchant',
    list: LIST_QUERY_KEY,
    detail: DETAIL_QUERY_KEY,
  },
  shopCollection: {
    base: 'shop-collection',
    list: LIST_QUERY_KEY,
    detail: DETAIL_QUERY_KEY,
  },
  product: {
    base: 'product',
    list: LIST_QUERY_KEY,
    detail: DETAIL_QUERY_KEY,
  },
  // category: {
  //   base: 'category',
  //   list: LIST_QUERY_KEY,
  //   detail: DETAIL_QUERY_KEY,
  // },
  productAttribute: {
    base: 'product-attribute',
    list: LIST_QUERY_KEY,
    detail: DETAIL_QUERY_KEY,
  },
  customer: {
    base: 'customer',
    list: LIST_QUERY_KEY,
    detail: DETAIL_QUERY_KEY,
  },
  customerContact: {
    base: 'customer-contact',
    list: LIST_QUERY_KEY,
    detail: DETAIL_QUERY_KEY,
  },
};
