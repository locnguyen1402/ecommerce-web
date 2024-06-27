import { ProductCategory } from './product-category';

export type ProductVariantAttributeValue = {
  attributeId: string;
  value: string;
};

export type ProductAttribute = IdName;

export type ProductAttributeWithValues = ProductAttribute & {
  values: string[];
};

export type ProductVariant = {
  id: string;
  stock: number;
  price: number;
  values: ProductVariantAttributeValue[];
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
};

export type ProductDetail = {
  id: string;
  name: string;
  slug: string;
  description: string;
  categories: ProductCategory[];
  variants: ProductVariant[];
  attributes: ProductAttributeWithValues[];
};
