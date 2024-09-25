import { ProductAttribute } from './product-attribute';

export type ProductVariantAttributeValue = {
  attributeId: string;
  value: string;
};

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
  stock: number;
  variants: ProductVariant[];
};

export type FilteredProduct = {
  id: string;
  name: string;
  stock: number;
  price: number;
};

export type ProductDetail = {
  id: string;
  name: string;
  slug: string;
  description: string;
  variants: ProductVariant[];
  attributes: ProductAttributeWithValues[];
};
