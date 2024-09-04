import classes from "./product-card-1.module.scss";

import { Flex, Image, Paper, Text } from "@mantine/core";

type Props = {
  img: string | undefined;
  name: string;
  price: number;
};

const ProductCard1 = ({ img, name, price }: Props) => {
  return (
    <Paper
      radius="md"
      p="xs"
      shadow="xs"
      withBorder
      className={classes.productCard}
    >
      <Flex justify="center">
        <Image radius="md" alt={name} src={img} />
      </Flex>
      <Flex pt="xs">
        <Text lineClamp={2} lh="sm" size="md">
          {name}
        </Text>
      </Flex>
      <Flex>
        <Text size="sm">{price}</Text>
      </Flex>
    </Paper>
  );
};

export default ProductCard1;
