import classes from "./page.module.scss";

import { Box, Grid } from "@mantine/core";

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
    <div>
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
        <Box className={classes.productInfoContainer}>
          <Box className={classes.productAvatarsContainer}>
            <ProductAvatars
              productName={product.name}
              images={product.images}
              initialImg={product.images[0]}
            />
          </Box>
          <Box
            bg="green"
            style={{
              height: 1000,
            }}
          ></Box>
        </Box>

        <Box
          bg="red"
          style={{
            height: 1000,
          }}
        ></Box>
      </AppContainer>
    </div>
  );
};

export default ProductDetail;
