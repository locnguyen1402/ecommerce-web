import { DefaultMantineColor, MantineColorsTuple } from "@mantine/core";

type ExtendedCustomColors = "primary" | "neutral" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}

type IdName = {
  id: string;
  name: string;
};

type LabelValue = {
  label: string;
  value: string;
};
