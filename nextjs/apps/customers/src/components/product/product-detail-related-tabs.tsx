"use client";

import classes from "./product-detail-related-tabs.module.scss";

import { Tabs, rem } from "@mantine/core";

import { ProductTabType } from "@/models";
import { LabelValue } from "@/types";

import SpecificationsTable from "./specifications-table";

type Props = {
  specifications: LabelValue[];
};

const ProductDetailRelatedTabs = ({ specifications }: Props) => {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Tabs defaultValue={ProductTabType.SPECIFICATION}>
      <Tabs.List
        style={{
          overflowX: "auto",
          flexWrap: "nowrap",
          marginBottom: "1rem",
        }}
      >
        <TabTitle text="Description" value={ProductTabType.DESCRIPTION} />
        <TabTitle text="Specification" value={ProductTabType.SPECIFICATION} />
        <TabTitle text="Review" value={ProductTabType.REVIEWS} />
      </Tabs.List>

      <Tabs.Panel value={ProductTabType.DESCRIPTION}>
        Gallery tab content
      </Tabs.Panel>
      <Tabs.Panel value={ProductTabType.SPECIFICATION}>
        <SpecificationsTable specifications={specifications} />
      </Tabs.Panel>
      <Tabs.Panel value={ProductTabType.REVIEWS}>
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );
};

export default ProductDetailRelatedTabs;

const TabTitle = ({ text, value }: { text: string; value: string }) => {
  return (
    <Tabs.Tab
      c="neutral"
      classNames={{
        tab: classes.tab,
        tabLabel: `${classes.tabLabel} tabLabel`,
      }}
      value={value}
    >
      {text}
    </Tabs.Tab>
  );
};
