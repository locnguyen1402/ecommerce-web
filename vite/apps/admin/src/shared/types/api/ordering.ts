import { PaginatedQueryParams } from '../query';

export type OrderListQuery = PaginatedQueryParams<{
  status?: string;
}>;

export type OrderReportListQuery = PaginatedQueryParams<{
  startDate?: string;
  endDate?: string;
  status?: string;
  paymentMethod?: string;
  storeId?: string;
}>;

export type ProductReportListQuery = PaginatedQueryParams<{
  storeId?: string;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
}>;

export type CustomerReportListQuery = PaginatedQueryParams<{
  startDate?: string;
  endDate?: string;
  status?: string;
}>;

export type OrderCouponReportListQuery = PaginatedQueryParams<{
  startDate?: string;
  endDate?: string;
  status?: string;
}>;
