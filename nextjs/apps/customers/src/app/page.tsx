import React from "react";

import { Chip } from "@mantine/core";

import MainLayout from "@/components/layout/MainLayout";

const Home = () => (
  <MainLayout>
    <div className="App">
      <Chip defaultChecked className="mr-2">
        Awesome chip
      </Chip>
    </div>
  </MainLayout>
);

export default Home;
