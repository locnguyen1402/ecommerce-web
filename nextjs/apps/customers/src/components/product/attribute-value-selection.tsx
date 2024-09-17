import { WithValuesAttribute } from "@/models";
import { Button, Group, rem, Stack, Text } from "@mantine/core";

type Props = {
  attribute: WithValuesAttribute;
};

const AttributeValueSelection = ({ attribute }: Props) => {
  return (
    <Stack gap="4">
      <Text size="sm" fw="bold">
        {attribute.name}
      </Text>
      <Group gap="8">
        {attribute.values.map((val) => {
          return (
            <Button
              style={{
                minWidth: rem("5rem"),
              }}
              key={val}
              color="neutral"
              variant="outline"
            >
              {val}
            </Button>
          );
        })}
      </Group>
    </Stack>
  );
};

export default AttributeValueSelection;
