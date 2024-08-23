"use client";

import { PropsWithChildren } from "react";

import { MantineProvider } from "@mantine/core";

import { StoreProvider, createRootStore } from "@/store";
import theme from "@/theme";

type Props = PropsWithChildren;

const App = ({ children }: Props) => {
  const rootStore = createRootStore();

  return (
    <StoreProvider value={rootStore}>
      <MantineProvider defaultColorScheme="auto" theme={theme}>
        {children}
      </MantineProvider>
    </StoreProvider>
  );
};

export default App;
