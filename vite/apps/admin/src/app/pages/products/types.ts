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
  attributes: AttributeInCreateProduct[];
  //  categories: string[];
  variants: CreateProductVariantRequest[];
};
