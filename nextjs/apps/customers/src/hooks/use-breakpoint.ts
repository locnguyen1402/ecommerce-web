"use client";

import { MantineSize, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const useBreakpoint = (size: MantineSize) => {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints[size]})`);

  return matches;
};

export default useBreakpoint;
