export type ShopCollection = {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
};

export type ShopCollectionDetail = ShopCollection & {
  parent?: ShopCollection;
  children: ShopCollection[];
};

export type AddProductsToCollectionPayload = {
  shopCollectionId: string;
  productIds: string[];
};

export type RemoveProductsFromCollectionPayload = {
  shopCollectionId: string;
  productIds: string[];
};
