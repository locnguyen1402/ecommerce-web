import Link from "next/link";

import { Menu, Button, Anchor } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

import { NavigationItem } from "@/models";

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
        variant="subtle"
        color="minimal"
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
    <Menu trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
      <Menu.Target>{renderItemContent()}</Menu.Target>
      <Menu.Dropdown>
        {item.items?.map((sub) => {
          return (
            <Menu.Item component={Link} href={sub.href} key={sub.label}>
              {sub.label}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};

export default HeaderNavigationItem;
