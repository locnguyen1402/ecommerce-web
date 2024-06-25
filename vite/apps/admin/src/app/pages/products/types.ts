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
  description: string;
  slug: string;
  categories: IdName[];
  attributes: AttributeInCreateProduct[];
  variants: CreateProductVariantRequest[];
};

export type CreateProductPayload = {
  name: string;
  description: string;
  slug: string;
  categories: string[];
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

export type ProductListQuery = PaginatedQueryParams;
