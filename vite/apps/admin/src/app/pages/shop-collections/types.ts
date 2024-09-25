import { PaginatedQueryParams } from '@/shared/types';

export type CreateShopCollectionRequest = {
  name: string;
  slug?: string;
  description?: string;
  parent?: Nullable<IdName>;
  children: IdName[];
};

export type UpdateShopCollectionRequest = CreateShopCollectionRequest & {
  id: string;
};

export type CreateShopCollectionPayload = {
  name: string;
  slug?: string;
  description: string;
  parentId?: string;
  children: string[];
};

export type ShopCollectionListQuery = PaginatedQueryParams;
