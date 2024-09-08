"use client";

import classes from "./product-avatars.module.scss";

import { useState } from "react";
import Image from "next/image";

import { Carousel } from "@mantine/carousel";
import { Box, Stack } from "@mantine/core";

type Props = {
  initialImg: string;
  images: string[];
  productName: string;
};

const ProductAvatars = ({ initialImg, images, productName }: Props) => {
  const [activeImg, setActiveImg] = useState(initialImg || images[0]);

  return (
    <Stack
      gap="sm"
      w="100%"
      pos={{
        sm: "sticky",
      }}
      top={20}
    >
      <Box
        pos="relative"
        w="100%"
        style={{
          aspectRatio: "1/1",
        }}
      >
        <Image
          unoptimized
          priority
          fill
          src={activeImg}
          alt={productName}
          style={{
            objectFit: "contain",
          }}
        />
      </Box>

      <Carousel
        styles={{
          controls: {
            padding: 4,
          },
        }}
        align="start"
        slideGap={8}
        slideSize={{ base: 70, sm: 80, lg: 90 }}
        withIndicators={false}
        withControls
      >
        {images.map((item, idx) => (
          <Carousel.Slide key={item}>
            <CarouselSlideImg
              isActive={activeImg === item}
              setActive={() => setActiveImg(item)}
              src={item}
              alt={`${productName}-${idx}`}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Stack>
  );
};

export default ProductAvatars;

const CarouselSlideImg = ({
  src,
  alt,
  isActive,
  setActive,
}: {
  src: string;
  alt: string;
  isActive: boolean;
  setActive: () => void;
}) => {
  return (
    <Box
      className={classes.carouselSlideImg}
      mod={{ active: isActive }}
      onMouseEnter={setActive}
      onClick={setActive}
      pos="relative"
      w="100%"
      style={{
        borderWidth: 2,
        borderStyle: "solid",
        aspectRatio: "1/1",
      }}
    >
      <Image
        unoptimized
        fill
        alt={alt}
        src={src}
        style={{
          objectFit: "contain",
        }}
      />
    </Box>
  );
};
