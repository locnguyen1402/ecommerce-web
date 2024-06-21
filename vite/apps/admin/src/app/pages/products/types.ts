type CreateProductVariantAttributeRequest = {
  id: string;
  name: string;
  value: string;
};

type CreateProductVariantRequest = {
  stock: number;
  price: number;
  values: CreateProductVariantAttributeRequest[];
};

type AttributeInCreateProduct = { attributeId: string; name: string; values: string };

type CreateProductRequest = {
  name: string;
  description: string;
  slug: string;
  categories: IdName[];
  attributes: AttributeInCreateProduct[];
  variants: CreateProductVariantRequest[];
};

type CreateProductPayload = {
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
