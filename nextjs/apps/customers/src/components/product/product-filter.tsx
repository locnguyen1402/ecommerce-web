import {
  Button,
  Checkbox,
  Group,
  Input,
  RangeSlider,
  SimpleGrid,
  Slider,
  Stack,
  Text,
} from "@mantine/core";
import { IconStarFilled } from "@tabler/icons-react";

const ProductFilter = () => {
  const renderRatingMark = (value: number) => {
    return (
      <Group align="center" wrap="nowrap" gap="2">
        <IconStarFilled
          style={{
            width: "0.8rem",
            height: "0.8rem",
            color: "var(--mantine-color-yellow-4)",
          }}
        />

        <Text size="xs">{value}</Text>
      </Group>
    );
  };
  return (
    <Stack
      pr={{
        md: "sm",
      }}
    >
      <Checkbox.Group w="100%" defaultValue={["react"]} label="Categories">
        <SimpleGrid spacing="xs" mt="xs" cols={2}>
          <Checkbox value="react" label="React" />
          <Checkbox value="svelte" label="Svelte" />
          <Checkbox value="ng" label="Angular" />
          <Checkbox value="vue" label="Vue" />
          <Checkbox value="htmx" label="Htmx" />
        </SimpleGrid>
      </Checkbox.Group>

      <Stack gap="xs">
        <Input.Label>Rating</Input.Label>
        <RangeSlider
          mb="lg"
          color="primary"
          min={1}
          max={5}
          step={1}
          defaultValue={[1, 5]}
          marks={[
            {
              value: 1,
              label: renderRatingMark(1),
            },
            {
              value: 2,
              label: renderRatingMark(2),
            },
            {
              value: 3,
              label: renderRatingMark(3),
            },
            {
              value: 4,
              label: renderRatingMark(4),
            },
            {
              value: 5,
              label: renderRatingMark(5),
            },
          ]}
        />
      </Stack>

      <Group justify="center" grow>
        <Button variant="default">Reset</Button>
        <Button>Apply</Button>
      </Group>
    </Stack>
  );
};

export default ProductFilter;
