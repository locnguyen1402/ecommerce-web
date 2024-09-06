"use server";

import { PRODUCT_DETAIL } from "@/mock/product";

export async function getProducts({ limit = 10, skip = 0 } = {}) {
  const apiUrl = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
}

export async function getProductDetail(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Promise.resolve(PRODUCT_DETAIL);
}
