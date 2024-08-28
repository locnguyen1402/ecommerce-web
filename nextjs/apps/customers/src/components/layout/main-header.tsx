"use client";

import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Container,
  ActionIcon,
} from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react";

import { HEADER_NAV_LIST } from "@/constants/layout";
import { useStore } from "@/store";

import HeaderNavigationList from "./header-navigation-list";
import ColorSwitch from "./color-switch";

const MainHeader = () => {
  const layoutStore = useStore("layoutStore");

  const openDrawer = () => layoutStore.openSideBar();

  return (
    <>
      <header>
        <Container size="xl">
          <Group
            justify="space-between"
            py={{
              base: "sm",
              md: "lg",
            }}
            h="100%"
          >
            <Burger
              size="sm"
              opened={layoutStore.isSideBarOpen}
              onClick={openDrawer}
              hiddenFrom="sm"
            />

            <MantineLogo size={30} />

            <HeaderNavigationList items={HEADER_NAV_LIST} />

            <Group gap="2">
              <Box visibleFrom="sm">
                <ColorSwitch />
              </Box>
              <ActionIcon variant="subtle" color="minimal">
                <IconUser />
              </ActionIcon>
              <ActionIcon variant="subtle" color="minimal">
                <IconShoppingBag />
              </ActionIcon>
            </Group>
          </Group>
        </Container>
      </header>
    </>
  );
};

export default MainHeader;
