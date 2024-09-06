export type ApiProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export type ApiProductDetail = {
  id: string;
  name: string;
  unitPrice: number;
  discountPercent: number;
  shortDescription: string;
  description: string;
  images: string[];
  rating: {
    average: number;
    total: number;
  };
  variants: {
    name: string;
    values: string[];
  }[];
};

export type ProductInCard = {
  id: string;
  image: string | undefined;
  name: string;
  price: number;
  rawData: any;
};
