export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type ProductCategoryDetail = ProductCategory & {
  parent?: ProductCategory;
};
