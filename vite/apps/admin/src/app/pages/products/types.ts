import { PaginatedQueryParams } from '@/shared/types';

export type CreateProductVariantAttributeRequest = {
  id: string;
  name: string;
  value: string;
};

export type CreateProductVariantRequest = {
  stock: number;
  price: number;
  values: CreateProductVariantAttributeRequest[];
};

export type AttributeInCreateProduct = { attributeId: string; name: string; values: string[] };

export type CreateProductRequest = {
  name: string;
  slug?: string;
  description?: string;
  // categories: IdName[];
  attributes: AttributeInCreateProduct[];
  variants: CreateProductVariantRequest[];
  hasVariants: boolean;
  stock?: number;
  price?: number;
};

export type CreateProductPayload = {
  name: string;
  slug?: string;
  description?: string;
  // categories: string[];
  stock?: number;
  price?: number;
  attributes: string[];
  variants: {
    stock: number;
    price: number;
    values: {
      productAttributeId: string;
      value: string;
    }[];
  }[];
};

export type ExtendProductVariantStockPayload = {
  productVariantId: string;
  quantity: number;
};

export type ProductListQuery = PaginatedQueryParams;

export type FilteredProductListQuery = PaginatedQueryParams & {
  notInShopCollectionIds?: string[];
  shopCollectionIds?: string[];
};
