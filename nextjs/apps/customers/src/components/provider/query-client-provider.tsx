import { PropsWithChildren, useState } from "react";

import {
  QueryClient,
  QueryClientProvider as Base,
} from "@tanstack/react-query";

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());

  return <Base client={queryClient}>{children}</Base>;
};

export default QueryClientProvider;
