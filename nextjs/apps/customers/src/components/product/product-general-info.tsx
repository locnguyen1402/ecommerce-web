import classes from "./product-general-info.module.scss";

import {
  ActionIcon,
  Button,
  Divider,
  Group,
  NumberInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconMinus, IconPlus, IconShoppingCartPlus } from "@tabler/icons-react";

import { WithValuesAttribute } from "@/models/product";

import AttributeValueSelection from "./attribute-value-selection";

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

      <Group
        classNames={{
          root: classes.quantityInputContainer,
        }}
        gap={0}
        maw={140}
      >
        <ActionIcon size="lg" variant="subtle" color="neutral">
          <IconMinus style={{ width: "75%", height: "75%" }} />
        </ActionIcon>
        <Divider
          className={classes.quantityInputDivider}
          color="neutral"
          orientation="vertical"
        />
        <NumberInput
          flex={1}
          variant="unstyled"
          min={1}
          value={1}
          hideControls
          styles={{
            input: {
              textAlign: "center",
            },
          }}
        />
        <Divider
          className={classes.quantityInputDivider}
          color="neutral"
          orientation="vertical"
        />
        <ActionIcon size="lg" variant="subtle" color="neutral">
          <IconPlus style={{ width: "75%", height: "75%" }} />
        </ActionIcon>
      </Group>

      <Group gap="sm" mt="sm" w="100%">
        <Button
          leftSection={<IconShoppingCartPlus />}
          maw={{
            md: "40%",
          }}
          flex={1}
          size="md"
        >
          Add to cart
        </Button>

        <Button
          maw={{
            md: "40%",
          }}
          flex={1}
          size="md"
          variant="outline"
        >
          Buy now
        </Button>
      </Group>
    </Stack>
  );
};

export default ProductGeneralInfo;
