import {
  Switch,
  useMantineTheme,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

const ColorSwitch = () => {
  const theme = useMantineTheme();
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <Switch
      size="md"
      color="dark.4"
      checked={colorScheme === "dark"}
      onChange={toggleColorScheme}
      onLabel={sunIcon}
      offLabel={moonIcon}
    />
  );
};

export default ColorSwitch;
