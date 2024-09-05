"use client";

import { useQuery } from "@tanstack/react-query";

import { ActionIcon, Flex, Grid, Select, Text } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";

import { getProducts } from "@/actions/product";

import AppContainer from "@/components/layout/app-container";
import ProductCard1List from "@/components/product/product-card-1-list";
import ProductFilter from "@/components/product/product-filter";
import ProductFilterDrawer from "@/components/product/product-filter-drawer";

import { PRODUCTS } from "@/mock/product";

const ShoppingCenterPage = ({}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({ limit: 5, skip: 10 }),
  });

  return (
    <div>
      <AppContainer>
        <Grid
          gutter={{
            base: 0,
            md: "sm",
          }}
        >
          <Grid.Col visibleFrom="md" span={3}>
            <ProductFilter />
          </Grid.Col>
          <Grid.Col span="auto">
            <Flex pb="xs" justify="space-between" align="center">
              <ProductFilterDrawer />

              <Flex ml="auto" gap={4} align="center">
                <Text fw="bold">Sort by:</Text>
                <Select
                  w="auto"
                  placeholder="Pick value"
                  data={[
                    "Best selling",
                    "Popularity",
                    "Featured",
                    "High - Low price",
                    "Low - High price",
                  ]}
                  styles={{
                    root: {
                      maxWidth: 150,
                    },
                  }}
                />
              </Flex>
            </Flex>
            <ProductCard1List products={PRODUCTS} />
          </Grid.Col>
        </Grid>
      </AppContainer>
    </div>
  );
};

export default ShoppingCenterPage;
