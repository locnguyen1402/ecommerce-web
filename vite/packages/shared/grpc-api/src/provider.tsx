import { FC, PropsWithChildren, createContext } from 'react';

import { Interceptor } from '@connectrpc/connect';

export interface ApiContextModel {
  apiUrl?: string;
  interceptors?: Interceptor[];
  getTokenAsync?: () => Promise<string | null | undefined>;
  refreshTokenAsync?: () => Promise<string | null | undefined>;
}

export const ApiContext = createContext<ApiContextModel>({
  apiUrl: '',
  interceptors: [],
});

export const ApiProvider: FC<PropsWithChildren<ApiContextModel>> = ({
  children,
  apiUrl,
  getTokenAsync,
  refreshTokenAsync,
  interceptors = [],
}) => {
  const value: ApiContextModel = {
    apiUrl,
    getTokenAsync,
    refreshTokenAsync,
    interceptors,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
