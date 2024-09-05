import classes from "./product-card-1.module.scss";

import Link from "next/link";

import { ActionIcon, Box, Flex, Paper, rem, Text } from "@mantine/core";
import { IconEye, IconHeart, IconShoppingBag } from "@tabler/icons-react";

type Props = {
  img: string | undefined;
  name: string;
  price: number;
  href: string;
};

const ProductCard1 = ({ href, img, name, price }: Props) => {
  return (
    <Paper
      component={Link}
      href={href}
      radius="md"
      p={{ base: rem(8), sm: "xs" }}
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
        <Box
          component="img"
          style={{
            borderRadius: 8,
            width: "100%",
            aspectRatio: "1 / 1.2",
          }}
          alt={name}
          src={img}
        />

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
