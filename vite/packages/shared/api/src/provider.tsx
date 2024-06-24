import { FC, PropsWithChildren, createContext } from 'react';

export interface ApiContextModel {
  apiUrl?: string;
  getTokenAsync?: () => Promise<string | null | undefined>;
  refreshTokenAsync?: () => Promise<string | null | undefined>;
}

export const ApiContext = createContext<ApiContextModel>({
  apiUrl: '',
});

export const ApiProvider: FC<PropsWithChildren<ApiContextModel>> = ({
  children,
  apiUrl,
  getTokenAsync,
  refreshTokenAsync,
}) => {
  const value: ApiContextModel = {
    apiUrl,
    getTokenAsync,
    refreshTokenAsync,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
