import { PropsWithChildren } from "react";

import AppHeader from "@/components/layout/app-header";
import AppDrawer from "@/components/layout/app-drawer";
import AppFooter from "@/components/layout/app-footer";
import FloatingButton from "@/components/layout/floating-button";

type Props = PropsWithChildren;

const Layout = ({ children }: Props) => {
  return (
    <>
      <AppDrawer />
      <AppHeader />
      {children}
      <AppFooter />
      <FloatingButton />
    </>
  );
};

export default Layout;
