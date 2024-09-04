export type ApiProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export type ProductInCard = {
  id: string;
  image: string | undefined;
  name: string;
  price: number;
  rawData: any;
};
