import { PaginatedQueryParams } from '@/shared/types';

export type CreateMerchantRequest = {
  name: string;
  slug?: string;
  description?: string;
  categories: IdName[];
};

export type UpdateMerchantRequest = CreateMerchantRequest & {
  id: string;
};

export type CreateMerchantPayload = {
  name: string;
  slug?: string;
  description: string;
  categoryIds?: string[];
};

export type MerchantListQuery = PaginatedQueryParams;
