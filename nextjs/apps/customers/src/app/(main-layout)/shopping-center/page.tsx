"use client";

import { useQuery } from "@tanstack/react-query";

import { Grid } from "@mantine/core";

import { getProducts } from "@/actions/product";

import AppContainer from "@/components/layout/app-container";
import ProductCard1List from "@/components/product/product-card-1-list";

import { PRODUCTS } from "@/mock/product";

const ShoppingCenterPage = ({}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({ limit: 5, skip: 10 }),
  });

  console.log("🚀 ~ ShoppingCenterPage ~ data:", data);
  return (
    <div>
      <AppContainer>
        <Grid
          gutter={{
            base: 0,
            md: "sm",
          }}
        >
          <Grid.Col visibleFrom="md" span={3.5}>
            <div
              style={{
                backgroundColor: "blue",
                height: "500px",
              }}
            ></div>
          </Grid.Col>
          <Grid.Col span="auto">
            <ProductCard1List products={PRODUCTS} />
          </Grid.Col>
        </Grid>
      </AppContainer>
    </div>
  );
};

export default ShoppingCenterPage;
