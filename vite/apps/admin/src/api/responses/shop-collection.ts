export type ShopCollection = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type ShopCollectionDetail = ShopCollection & {
  parent?: ShopCollection;
  children: ShopCollection[];
};
