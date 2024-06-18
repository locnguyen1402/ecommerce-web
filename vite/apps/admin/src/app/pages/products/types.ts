type CreateProductVariantAttributeRequest = {
  productAttributeId: string;
  value: string;
};

type CreateProductVariantRequest = {
  stock: number;
  price: number;
  values: CreateProductVariantAttributeRequest[];
};

type CreateProductRequest = {
  name: string;
  description: string;
  slug: string;
  attributes: Option[];
  //  categories: string[];
  variants: CreateProductVariantRequest[];
};
