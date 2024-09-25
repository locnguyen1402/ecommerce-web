import { PaginatedQueryParams } from '@/shared/types';

export type CreateCategoryRequest = {
  name: string;
  slug: string;
  description?: string;
  parent?: Nullable<IdName>;
};

export type UpdateCategoryRequest = CreateCategoryRequest & {
  id: string;
};

export type CreateCategoryPayload = {
  name: string;
  slug: string;
  description: string;
  parentId?: string;
};

export type CategoryListQuery = PaginatedQueryParams;
