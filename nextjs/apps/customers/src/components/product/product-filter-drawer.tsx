import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, Drawer, ScrollArea } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";

import { HEADER_CONFIGS } from "@/constants/layout";

import ProductFilter from "./product-filter";

const ProductFilterDrawer = () => {
  const [isDrawerOpen, { open: openDrawer, close: closeDrawer }] =
    useDisclosure();

  return (
    <>
      <ActionIcon
        hiddenFrom="md"
        size="lg"
        variant="subtle"
        color="neutral"
        onClick={openDrawer}
      >
        <IconFilter
          style={{
            width: "75%",
            height: "75%",
          }}
        />
      </ActionIcon>

      <Drawer
        position="right"
        opened={isDrawerOpen}
        onClose={closeDrawer}
        size="md"
        padding="md"
        hiddenFrom="md"
        title="Filter"
        zIndex={HEADER_CONFIGS.Z_INDEX + 1}
      >
        <ScrollArea scrollbars="y">
          <ProductFilter />
        </ScrollArea>
      </Drawer>
    </>
  );
};

export default ProductFilterDrawer;
