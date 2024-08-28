import React from "react";

import { Flex } from "@mantine/core";

import HomeBanners from "@/components/home/banner";

const Home = () => {
  return (
    <Flex>
      <HomeBanners />
      <Flex h="2000px"></Flex>
    </Flex>
  );
};

export default Home;
