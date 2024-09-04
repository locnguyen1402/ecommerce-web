import { ApiProduct } from "@/models/product";

export const PRODUCTS: ApiProduct[] = [
  ...Array.from({ length: 100 }).map((_, index) => ({
    id: `product-${index}`,
    name: `Product ${index}`,
    // price: Math.floor(Math.random() * 1000),
    price: 1000000,
    image: "https://via.placeholder.com/150",
  })),
];
