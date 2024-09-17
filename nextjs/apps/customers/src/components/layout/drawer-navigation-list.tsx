import { Flex, Group } from "@mantine/core";

import { NavigationItem } from "@/models";

import DrawerNavigationItem from "./drawer-navigation-item";

type Props = {
  items: NavigationItem[];
};

const DrawerNavigationList = ({ items }: Props) => {
  return (
    <Flex direction="column" gap={0}>
      {items.map((item) => {
        return <DrawerNavigationItem key={item.label} item={item} />;
      })}
    </Flex>
  );
};

export default DrawerNavigationList;
