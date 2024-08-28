import { ComponentProps, PropsWithChildren } from "react";

import { Container } from "@mantine/core";

type Props = PropsWithChildren<Omit<ComponentProps<typeof Container>, "size">>;

const AppContainer = ({ children, ...rest }: Props) => {
  return (
    <Container size="lg" {...rest}>
      {children}
    </Container>
  );
};

export default AppContainer;
