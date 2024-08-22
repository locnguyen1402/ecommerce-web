import { PropsWithChildren } from "react";

import MainHeader from "./MainHeader";

type Props = PropsWithChildren;

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <MainHeader />
      <main>{children}</main>
      <footer>
        <h2>Footer</h2>
      </footer>
    </div>
  );
};

export default MainLayout;
