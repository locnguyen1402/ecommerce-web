import Link from "next/link";

import { Menu, Button, Anchor } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

import { NavigationItem } from "@/models";
import { HEADER_CONFIGS } from "@/constants/layout";

type Props = {
  item: NavigationItem;
};

const HeaderNavigationItem = ({ item }: Props) => {
  const hasChildren = !!item.items?.length;
  const renderItemContent = () => {
    return (
      // @ts-ignore
      <Button
        bd={0}
        size="compact-md"
        variant="subtle"
        color="neutral"
        {...(!!item.href
          ? {
              component: Link,
              href: item.href as string,
            }
          : {})}
        {...(!!item.items?.length
          ? {
              rightSection: <IconChevronDown size="1.2rem" stroke={1.5} />,
            }
          : {})}
      >
        {item.label}
      </Button>
    );
  };

  if (!hasChildren) {
    return renderItemContent();
  }

  return (
    <Menu
      styles={{
        dropdown: {
          zIndex: HEADER_CONFIGS.Z_INDEX + 1,
        },
      }}
      offset={8}
      trigger="hover"
      transitionProps={{ exitDuration: 0 }}
      withinPortal
    >
      <Menu.Target>{renderItemContent()}</Menu.Target>
      <Menu.Dropdown>
        {item.items?.map((sub) => {
          return (
            <Anchor
              c="neutral"
              key={sub.label}
              variant="text"
              component={Link}
              href={sub.href}
              underline="hover"
            >
              <Menu.Item c="neutral">{sub.label}</Menu.Item>
            </Anchor>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};

export default HeaderNavigationItem;
