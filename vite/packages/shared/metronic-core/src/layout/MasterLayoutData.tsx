/* eslint-disable react-refresh/only-export-components */

import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';

export type Language = {
  code: string;
  name: string;
  flag: string;
};

export interface MasterLayoutDataContextModel {
  t: (key: string) => string;
  supportedLanguages: Language[];
  sidebarMenuItems: ISidebarMenuItem[];
  /**
   * currently selected language
   */
  language?: string;
  onChangeLanguage?: (language: string) => void;
  onLogout?: () => void;
  logoutText?: string | undefined;
}

const MasterLayoutDataContext = createContext<MasterLayoutDataContextModel>({
  supportedLanguages: [],
  sidebarMenuItems: [],
  t: (key) => key,
  language: undefined,
  onChangeLanguage: undefined,
  onLogout: undefined,
  logoutText: undefined,
});

const MasterLayoutDataProvider: FC<
  PropsWithChildren<{
    data: MasterLayoutDataContextModel;
  }>
> = ({
  children,
  data: {
    sidebarMenuItems,
    t,
    supportedLanguages,
    onChangeLanguage,
    language,
    onLogout,
    logoutText,
  },
}) => {
  const [menuItems] = useState<ISidebarMenuItem[]>(sidebarMenuItems);
  const value: MasterLayoutDataContextModel = {
    sidebarMenuItems: menuItems,
    supportedLanguages,
    t,
    onChangeLanguage,
    language,
    onLogout,
    logoutText,
  };

  return (
    <MasterLayoutDataContext.Provider value={value}>{children}</MasterLayoutDataContext.Provider>
  );
};

const useMasterLayoutData = () => useContext(MasterLayoutDataContext);

export { MasterLayoutDataProvider, useMasterLayoutData };
