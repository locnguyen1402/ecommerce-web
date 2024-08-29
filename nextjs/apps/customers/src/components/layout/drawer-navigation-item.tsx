import Link from "next/link";

import { Button, Collapse, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

import { NavigationItem } from "@/models";

type Props = {
  item: NavigationItem;
};

const DrawerNavigationItem = ({ item }: Props) => {
  const [isOpen, { toggle }] = useDisclosure();

  const hasChildren = !!item.items?.length;

  return (
    <>
      {/* 
      // @ts-ignore */}
      <Button
        onClick={toggle}
        justify="space-between"
        variant="subtle"
        color="neutral"
        {...(!!item.href
          ? {
              component: Link,
              href: item.href as string,
            }
          : {})}
        {...(hasChildren
          ? {
              rightSection: isOpen ? (
                <IconChevronUp size="1.2rem" stroke={1.5} />
              ) : (
                <IconChevronDown size="1.2rem" stroke={1.5} />
              ),
            }
          : {})}
      >
        {item.label}
      </Button>

      {hasChildren && (
        <Collapse in={isOpen}>
          <Flex px="sm" direction="column">
            {item.items!.map((sub) => {
              return (
                <Button
                  key={sub.label}
                  justify="space-between"
                  variant="subtle"
                  color="neutral"
                  component={Link}
                  href={sub.href}
                >
                  {sub.label}
                </Button>
              );
            })}
          </Flex>
        </Collapse>
      )}
    </>
  );
};

export default DrawerNavigationItem;
