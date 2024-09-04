import classes from "./product-card-1-list.module.scss";

import { Box } from "@mantine/core";

import { ApiProduct } from "@/models/product";

import ProductCard1 from "./product-card-1";

type Props = {
  products: ApiProduct[];
};

const ProductCard1List = ({ products }: Props) => {
  return (
    <Box className={classes.productList}>
      {products.map((item) => {
        return (
          <ProductCard1
            key={item.id}
            img={item.image}
            name={item.name}
            price={item.price}
          />
        );
      })}
    </Box>
  );
};

export default ProductCard1List;
