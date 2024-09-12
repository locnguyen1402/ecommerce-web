import classes from "./product-general-info.module.scss";

import { Divider, Flex, Stack, Title } from "@mantine/core";

import { WithValuesAttribute } from "@/models";

import AttributeValueSelection from "./attribute-value-selection";
import QuantityInput from "./quantity-input";
import ProductDetailActions from "./product-detail-actions";

type Props = {
  productName: string;
  productPrice: number;
  attributes: WithValuesAttribute[];
};

const ProductGeneralInfo = ({
  productName,
  productPrice,
  attributes,
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
          base: "sm",
          sm: "md",
        }}
      >
        {productName}
      </Title>
      <Title order={6} size="h2" fw={600}>
        {productPrice}
      </Title>

      <Divider my="md" />

      <Stack gap="xs">
        {attributes.map((item) => {
          return <AttributeValueSelection key={item.name} attribute={item} />;
        })}
      </Stack>

      <Divider my="md" />

      <Flex
        gap="sm"
        direction={{
          base: "column",
          md: "row",
        }}
      >
        <QuantityInput />
        <ProductDetailActions />
      </Flex>
    </Stack>
  );
};

export default ProductGeneralInfo;
