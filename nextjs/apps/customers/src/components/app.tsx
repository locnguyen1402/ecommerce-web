"use client";

import { PropsWithChildren } from "react";

import { MantineProvider } from "@mantine/core";

import { StoreProvider, createRootStore } from "@/store";

type Props = PropsWithChildren;

const App = ({ children }: Props) => {
  const rootStore = createRootStore();

  return (
    <StoreProvider value={rootStore}>
      <MantineProvider>{children}</MantineProvider>
    </StoreProvider>
  );
};

export default App;
