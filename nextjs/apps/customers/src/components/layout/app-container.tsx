import { ComponentProps, PropsWithChildren } from "react";

import { Container } from "@mantine/core";

type Props = PropsWithChildren<ComponentProps<typeof Container>>;

const AppContainer = ({ children, ...rest }: Props) => {
  return (
    <Container
      px={{
        base: "xs",
        xs: "md",
        sm: "lg",
        md: "xl",
      }}
      size="lg"
      {...rest}
    >
      {children}
    </Container>
  );
};

export default AppContainer;
