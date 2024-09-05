import AppContainer from "@/components/layout/app-container";

type Props = {
  params: {
    id: string;
  };
};

const ProductDetail = ({ params }: Props) => {
  console.log("🚀 ~ ProductDetail ~ props:", params.id);

  return <AppContainer>ProductDetail</AppContainer>;
};

export default ProductDetail;
