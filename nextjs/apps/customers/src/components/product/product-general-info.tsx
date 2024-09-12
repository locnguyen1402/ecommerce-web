import classes from "./product-general-info.module.scss";

import {
  Badge,
  Divider,
  Flex,
  Group,
  Rating,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { WithValuesAttribute } from "@/models";

import AttributeValueSelection from "./attribute-value-selection";
import QuantityInput from "./quantity-input";
import ProductDetailActions from "./product-detail-actions";

type Props = {
  productName: string;
  shortDescription: string;
  productPrice: number;
  attributes: WithValuesAttribute[];
  ratingAverage: number;
  ratingCount: number;
};

const ProductGeneralInfo = ({
  productName,
  productPrice,
  attributes,
  ratingAverage,
  ratingCount,
  shortDescription,
}: Props) => {
  return (
    <Stack
      pt={{
        base: "md",
        sm: 0,
      }}
      gap={0}
    >
      <Title
        order={1}
        size="h2"
        fw="bold"
        mb={{
          base: "xs",
          sm: "md",
        }}
      >
        {productName}
      </Title>

      <Stack gap={4}>
        <Group align="center" gap="sm">
          <Group gap="4" align="center">
            <Title order={6} size="h2" fw={600}>
              {productPrice}
            </Title>
            <Text td="line-through" size="sm" c="neutral">
              250000
            </Text>
          </Group>

          <Badge size="md" variant="light" color="red" radius="sm">
            25% off
          </Badge>
        </Group>

        <Group gap={4}>
          <Rating value={ratingAverage} fractions={2} readOnly />
          <Text c="neutral" size="sm">
            {`(${ratingCount})`}
          </Text>
        </Group>

        {!!shortDescription && (
          <Text lineClamp={3} size="sm" c="neutral">
            {shortDescription}
          </Text>
        )}
      </Stack>

      <Divider my="md" />

      <Stack gap="xs">
        {attributes.map((item) => {
          return <AttributeValueSelection key={item.name} attribute={item} />;
        })}
      </Stack>

      <Divider
        color="transparent"
        mt={{
          base: "lg",
          md: "xl",
        }}
      />

      <Flex
        gap="sm"
        direction={{
          base: "column",
          md: "row",
        }}
      >
        <Flex maw={140}>
          <QuantityInput />
        </Flex>
        <ProductDetailActions />
      </Flex>
    </Stack>
  );
};

export default ProductGeneralInfo;
