import { PropsWithChildren } from "react";

import AppHeader from "@/components/layout/app-header";
import AppDrawer from "@/components/layout/app-drawer";
import AppFooter from "@/components/layout/app-footer";

type Props = PropsWithChildren;

const Layout = ({ children }: Props) => {
  return (
    <>
      <AppDrawer />
      <AppHeader />
      {children}
      <AppFooter />
    </>
  );
};

export default Layout;
