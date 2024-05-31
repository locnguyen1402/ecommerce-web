import { PaginatedQueryParams } from '../query';

export type PositionListQuery = PaginatedQueryParams;

export type SettingListQuery = PaginatedQueryParams<{
  type?: string;
}>;

export type PostListQuery = PaginatedQueryParams;
