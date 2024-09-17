import { Button, Group } from "@mantine/core";
import { IconShoppingCartPlus } from "@tabler/icons-react";

const ProductDetailActions = () => {
  return (
    <Group flex={1} gap="sm" w="100%">
      <Button
        leftSection={<IconShoppingCartPlus />}
        maw={{
          lg: "40%",
        }}
        flex={1}
        size="md"
      >
        Add to cart
      </Button>

      <Button
        maw={{
          lg: "40%",
        }}
        flex={1}
        size="md"
        variant="outline"
      >
        Buy now
      </Button>
    </Group>
  );
};

export default ProductDetailActions;
