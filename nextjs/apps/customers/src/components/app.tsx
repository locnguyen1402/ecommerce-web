"use client";

import { PropsWithChildren } from "react";

import { MantineProvider } from "@mantine/core";

import { StoreProvider, createRootStore } from "@/store";
import theme from "@/theme";

import QueryClientProvider from "./provider/query-client-provider";

type Props = PropsWithChildren;

const App = ({ children }: Props) => {
  const rootStore = createRootStore();

  return (
    <QueryClientProvider>
      <StoreProvider value={rootStore}>
        <MantineProvider
          classNamesPrefix="mila"
          defaultColorScheme="light"
          theme={theme}
        >
          {children}
        </MantineProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
};

export default App;
