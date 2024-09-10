import { Stack, Text, Title } from "@mantine/core";

type Props = {
  productName: string;
  productPrice: number;
};

const ProductGeneralInfo = ({ productName, productPrice }: Props) => {
  return (
    <Stack gap={0}>
      <Title
        order={1}
        size="h2"
        fw="bold"
        mb={{
          base: "sm",
          sm: "md",
        }}
      >
        {productName}
      </Title>
      <Title order={6} size="h2" fw={600}>
        {productPrice}
      </Title>
    </Stack>
  );
};

export default ProductGeneralInfo;
