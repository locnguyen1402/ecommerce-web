"use client";

import { observer } from "mobx-react-lite";

import {
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  ScrollArea,
  Text,
} from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { IconChevronDown } from "@tabler/icons-react";

import { useStore } from "@/store";
import { HEADER_NAV_LIST } from "@/constants/layout";

import DrawerNavigationList from "./drawer-navigation-list";
import ColorSwitch from "./color-switch";

const AppDrawer = () => {
  const layoutStore = useStore("layoutStore");

  const closeDrawer = () => layoutStore.closeSideBar();

  const isOpen = layoutStore.isSideBarOpen;

  return (
    <Drawer
      opened={isOpen}
      onClose={closeDrawer}
      size="md"
      padding="md"
      title={<MantineLogo size={30} />}
      hiddenFrom="sm"
      zIndex={1000000}
    >
      <ScrollArea mx="-md">
        <Divider mb="sm" />
        <DrawerNavigationList items={HEADER_NAV_LIST} />
        <Button
          fullWidth
          color="neutral"
          variant="transparent"
          justify="space-between"
          rightSection={<ColorSwitch />}
        >
          Mode
        </Button>
        <Divider my="sm" />

        <Group justify="center" grow pb="xl" px="md">
          <Button variant="default">Log in</Button>
          <Button>Sign up</Button>
        </Group>
      </ScrollArea>
    </Drawer>
  );
};

export default observer(AppDrawer);
