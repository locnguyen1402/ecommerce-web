import classes from "./product-card-1-list.module.scss";

import { Box } from "@mantine/core";

import { ApiProduct } from "@/models/product";

import ProductCard1 from "./product-card-1";

type Props = {
  products: ApiProduct[];
};

const ProductCard1List = ({ products }: Props) => {
  return (
    <Box>
      {/* className={classes.productList} */}
      {/* {products.map((item) => {
        return (
          <ProductCard1
            key={item.id}
            img={item.image}
            name={item.name}
            price={item.price}
          />
        );
      })} */}

      <div className={classes.parent}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className={classes.child}>
            <div
              style={{
                aspectRatio: 1,
                backgroundColor: "blue",
              }}
            ></div>
            <div>{index}</div>
            <div
              style={{
                backgroundColor: "cadetblue",
              }}
            ></div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default ProductCard1List;
