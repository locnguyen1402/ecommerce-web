"use client";

import { default as NextImage } from "next/image";

import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";

import AppContainer from "../layout/app-container";

const BANNERS = [
  {
    img: "https://themesflat.co/html/ecomus/images/slider/slide-hp-1.jpg",
  },
  {
    img: "https://themesflat.co/html/ecomus/images/slider/slide-hp-2.jpg",
  },
  {
    img: "https://themesflat.co/html/ecomus/images/slider/slide-hp-3.jpg",
  },
];

const HomeBanners = () => {
  return (
    <AppContainer>
      <Carousel
        style={{
          borderRadius: "",
        }}
        styles={{
          viewport: {
            borderRadius: 16,
          },
        }}
        orientation="horizontal"
        withIndicators
        withControls={false}
      >
        {BANNERS.map((item, idx) => (
          <Carousel.Slide key={item.img}>
            <Image
              // srcSet={item.img}
              // fill
              // component={NextImage}
              alt={`banner-${idx}`}
              src={item.img}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </AppContainer>
  );
};

export default HomeBanners;
