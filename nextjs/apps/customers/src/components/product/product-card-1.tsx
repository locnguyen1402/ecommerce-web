import classes from "./product-card-1.module.scss";

import { ActionIcon, Flex, Image, Paper, Text } from "@mantine/core";
import { IconEye, IconHeart, IconShoppingBag } from "@tabler/icons-react";

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
      <Flex
        justify="center"
        style={{
          position: "relative",
        }}
      >
        <Image radius="md" alt={name} src={img} />

        <Flex
          className="actions"
          gap={4}
          direction="column"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <ActionIcon radius="xl" variant="outline" color="neutral">
            <IconHeart style={{ width: "75%", height: "75%" }} />
          </ActionIcon>

          <ActionIcon radius="xl" variant="outline" color="neutral">
            <IconShoppingBag style={{ width: "75%", height: "75%" }} />
          </ActionIcon>

          <ActionIcon
            radius="xl"
            variant="outline"
            color="neutral"
            visibleFrom="sm"
          >
            <IconEye style={{ width: "75%", height: "75%" }} />
          </ActionIcon>
        </Flex>
      </Flex>
      <Flex pt="xs">
        <Text lineClamp={2} lts={0.2} className="title" lh="sm" size="md">
          {name}
        </Text>
      </Flex>
      <Flex>
        <Text fw={600} size="sm">
          {price}
        </Text>
      </Flex>
    </Paper>
  );
};

export default ProductCard1;
