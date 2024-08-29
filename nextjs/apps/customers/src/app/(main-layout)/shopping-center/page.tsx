"use client";

import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/actions/product";
import AppContainer from "@/components/layout/app-container";

const ShoppingCenterPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({ limit: 5, skip: 10 }),
  });

  console.log("🚀 ~ ShoppingCenterPage ~ data:", data);
  return (
    <div>
      <AppContainer>
        <h1>Shopping Center</h1>
      </AppContainer>
    </div>
  );
};

export default ShoppingCenterPage;
