import { PaginatedQueryParams } from '../query';

export type PartnerListQuery = PaginatedQueryParams;

export type StoreListQuery = PaginatedQueryParams;

export type ProductListQuery = PaginatedQueryParams<{
  type?: string;
  categoryId?: string;
}>;

export type ProductCategoryListQuery = PaginatedQueryParams;

export type CouponListQuery = PaginatedQueryParams;

export type CouponReportListQuery = PaginatedQueryParams<{
  startDate?: string;
  endDate?: string;
  status?: string;
}>;

export type PromotionListQuery = PaginatedQueryParams;

