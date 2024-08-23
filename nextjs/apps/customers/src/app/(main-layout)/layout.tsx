import MainHeader from "@/components/layout/MainHeader";
import { PropsWithChildren } from "react";

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
