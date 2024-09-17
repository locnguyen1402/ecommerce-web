import classes from "./quantity-input.module.scss";

import { ActionIcon, Divider, Group, NumberInput } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";

const QuantityInput = () => {
  const iconStyle = { width: "60%", height: "60%" };
  return (
    <Group
      classNames={{
        root: classes.quantityInputContainer,
      }}
      gap={0}
      w="100%"
    >
      <ActionIcon
        classNames={{
          root: classes.actionButton,
        }}
        size="lg"
        variant="subtle"
        color="neutral"
      >
        <IconMinus style={iconStyle} />
      </ActionIcon>
      <Divider
        className={classes.quantityInputDivider}
        color="neutral"
        orientation="vertical"
      />
      <NumberInput
        flex={1}
        variant="unstyled"
        min={1}
        value={1}
        hideControls
        styles={{
          input: {
            textAlign: "center",
          },
        }}
      />
      <Divider
        className={classes.quantityInputDivider}
        color="neutral"
        orientation="vertical"
      />
      <ActionIcon
        classNames={{
          root: classes.actionButton,
        }}
        size="lg"
        variant="subtle"
        color="neutral"
      >
        <IconPlus style={iconStyle} />
      </ActionIcon>
    </Group>
  );
};

export default QuantityInput;
