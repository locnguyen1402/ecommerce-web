import { Group } from "@mantine/core";

import { NavigationItem } from "@/models";

import HeaderNavigationItem from "./header-navigation-item";

type Props = {
  items: NavigationItem[];
};

const HeaderNavigationList = ({ items }: Props) => {
  return (
    <Group gap="2" visibleFrom="sm">
      {items.map((item) => {
        return <HeaderNavigationItem key={item.label} item={item} />;
      })}
    </Group>
  );
};

export default HeaderNavigationList;
