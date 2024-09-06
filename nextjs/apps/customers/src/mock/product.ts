import { ApiProduct, ApiProductDetail } from "@/models/product";

export const PRODUCTS: ApiProduct[] = [
  ...Array.from({ length: 100 }).map((_, index) => ({
    id: `product-${index}`,
    name: `Product ${index}`,
    // price: Math.floor(Math.random() * 1000),
    price: 1000000,
    image: "https://placehold.co/400x480",
  })),
];

export const PRODUCT_DETAIL: ApiProductDetail = {
  id: "product-1",
  name: "Product 1",
  unitPrice: 1000000,
  discountPercent: 10,
  shortDescription: "Short description",
  description: "Description",
  images: [
    "https://placehold.co/400?text=AAA",
    "https://placehold.co/400?text=BBB",
    "https://placehold.co/400?text=CCC",
    "https://placehold.co/400?text=DDD",
    "https://placehold.co/400?text=EEE",
    "https://placehold.co/400?text=FFF",
    "https://placehold.co/400?text=GGG",
    "https://placehold.co/400?text=HHH",
  ],
  rating: {
    average: 4.5,
    total: 100,
  },
  variants: [
    {
      name: "Color",
      values: ["Red", "Blue", "Green"],
    },
    {
      name: "Size",
      values: ["S", "M", "L", "XL"],
    },
  ],
};
