"use client";

import React from "react";

import { useMantineColorScheme, Button, Group } from "@mantine/core";

const Home = () => {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();

  return (
    <div className="App">
      <Group>
        <Button onClick={() => setColorScheme("light")}>Light</Button>
        <Button onClick={() => setColorScheme("dark")}>Dark</Button>
        <Button onClick={() => setColorScheme("auto")}>Auto</Button>
        <Button onClick={clearColorScheme}>Clear</Button>
      </Group>
    </div>
  );
};

export default Home;
