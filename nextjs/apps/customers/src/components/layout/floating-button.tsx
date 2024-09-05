"use client";

import { ActionIcon, Affix, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";

const FloatingButton = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 15, right: 15 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <ActionIcon
            radius="xl"
            size="lg"
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
          >
            <IconArrowUp style={{ width: "60%", height: "60%" }} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
};

export default FloatingButton;
