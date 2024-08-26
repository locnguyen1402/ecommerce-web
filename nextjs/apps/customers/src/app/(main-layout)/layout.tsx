import { PropsWithChildren } from "react";

import MainHeader from "@/components/layout/main-header";
import AppDrawer from "@/components/layout/app-drawer";

type Props = PropsWithChildren;

const Layout = ({ children }: Props) => {
  return (
    <>
      <AppDrawer />
      <MainHeader />
      {children}
    </>
  );
};

export default Layout;
