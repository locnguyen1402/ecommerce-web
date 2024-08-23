import { PropsWithChildren } from "react";

import MainHeader from "@/components/layout/main-header";

type Props = PropsWithChildren;

const Layout = ({ children }: Props) => {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
};

export default Layout;
