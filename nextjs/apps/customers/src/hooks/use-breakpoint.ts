"use client";

import { MantineSize, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

type BreakpointType = "up" | "down";

const BreakpointTypeMap = {
  up: "min-width",
  down: "max-width",
};

const useBreakpoint = (size: MantineSize, breakType: BreakpointType = "up") => {
  const theme = useMantineTheme();
  const matches = useMediaQuery(
    `(${BreakpointTypeMap[breakType]}: ${theme.breakpoints[size]})`
  );

  return matches;
};

export default useBreakpoint;
