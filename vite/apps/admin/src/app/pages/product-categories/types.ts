import { PaginatedQueryParams } from '@/shared/types';

export type CreateProductCategoryRequest = {
  name: string;
  slug: string;
  description?: string;
  parent?: Nullable<IdName>;
};

export type UpdateProductCategoryRequest = CreateProductCategoryRequest & {
  id: string;
};

export type CreateProductCategoryPayload = {
  name: string;
  slug: string;
  description: string;
  parentId?: string;
};

export type ProductCategoryListQuery = PaginatedQueryParams;
