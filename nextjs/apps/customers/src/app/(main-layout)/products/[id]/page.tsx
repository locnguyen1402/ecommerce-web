import classes from "./page.module.scss";

import { Box, Grid, Stack } from "@mantine/core";

import { getProductDetail } from "@/actions/product";

import AppContainer from "@/components/layout/app-container";
import HeadingBanner from "@/components/layout/heading-banner";
import ProductAvatars from "@/components/product/product-avatars";

type Props = {
  params: {
    id: string;
  };
};

const ProductDetail = async ({ params }: Props) => {
  const product = await getProductDetail(params.id);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <HeadingBanner
        title="Product Detail"
        breadcrumbs={[
          { name: "Home", href: "/" },
          {
            name: "Products",
            href: "/shopping-center",
          },
          { name: "Detail" },
        ]}
      />
      <AppContainer>
        <Stack gap="md">
          <Box className={classes.productInfoContainer}>
            <Box>
              <ProductAvatars
                productName={product.name}
                images={product.images}
                initialImg={product.images[0]}
              />
            </Box>
            <Box></Box>
          </Box>

          <Box
            bg="red"
            style={{
              height: 1000,
            }}
          ></Box>
        </Stack>
      </AppContainer>
    </div>
  );
};

export default ProductDetail;
