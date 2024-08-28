"use client";

import { useMemo } from "react";

import Link from "next/link";
import dynamic from "next/dynamic";

import {
  Group,
  Box,
  Burger,
  Container,
  ActionIcon,
  Paper,
} from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { useWindowScroll } from "@mantine/hooks";
import { IconShoppingBag, IconUser } from "@tabler/icons-react";

import useScrollDirection from "@/hooks/use-scroll-direction";
import useBreakpoint from "@/hooks/use-breakpoint";
import { HEADER_CONFIGS, HEADER_NAV_LIST } from "@/constants/layout";
import { useStore } from "@/store";

import HeaderNavigationList from "./header-navigation-list";

const ColorSwitch = dynamic(() => import("./color-switch"), { ssr: false });

const MainHeader = () => {
  const [scroll] = useWindowScroll();
  const scrollDirection = useScrollDirection(25);
  const layoutStore = useStore("layoutStore");
  const smBreakpoint = useBreakpoint("sm");

  const openDrawer = () => layoutStore.openSideBar();

  const headerHeight = useMemo(() => {
    if (!smBreakpoint) {
      return HEADER_CONFIGS.SMALL_HEIGHT;
    }

    return !scroll.y ? HEADER_CONFIGS.FULL_HEIGHT : HEADER_CONFIGS.SMALL_HEIGHT;
  }, [smBreakpoint, scroll.y]);

  return (
    <>
      <Paper
        shadow={scroll.y ? "xs" : "0"}
        component="header"
        style={{
          height: headerHeight,
          backgroundColor: "var(--mantine-color-body)",
          position: "fixed",
          top: scrollDirection === "down" ? "-100px" : "0",
          left: 0,
          right: 0,
          transition: "all 0.3s",
          zIndex: HEADER_CONFIGS.Z_INDEX,
        }}
      >
        <Container
          size="xl"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Group w="100%" justify="space-between" h="100%">
            <Burger
              size="sm"
              opened={layoutStore.isSideBarOpen}
              onClick={openDrawer}
              hiddenFrom="sm"
            />

            <Box component={Link} href="/">
              <MantineLogo size={30} />
            </Box>

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
      </Paper>
      <div style={{ marginTop: headerHeight }}></div>
    </>
  );
};

export default MainHeader;
