import classes from "./heading-banner.module.scss";

import { Fragment } from "react";
import Link from "next/link";

import { Box, Breadcrumbs, Flex, Text } from "@mantine/core";

import AppContainer from "./app-container";

type Props = {
  title: string;
  breadcrumbs: { name: string; href?: string }[];
};

const HeadingBanner = ({ title, breadcrumbs }: Props) => {
  return (
    <Box className={classes.container}>
      <AppContainer>
        <Flex
          mb={{
            base: "md",
            md: "xl",
          }}
          py={{
            base: "lg",
            md: "xl",
          }}
          w="100%"
          direction={{
            base: "column",
            xs: "row",
          }}
          justify={{
            base: "center",
            xs: "space-between",
          }}
          align="center"
        >
          <Text
            className={classes.title}
            fw="bold"
            fz={{
              base: "h3",
              md: "h3",
            }}
          >
            {title}
          </Text>
          <Breadcrumbs
            classNames={{
              separator: classes.breadcrumbSeparator,
            }}
          >
            {breadcrumbs.map((item) => {
              return (
                <Fragment key={item.name}>
                  {item.href ? (
                    <Text
                      size="sm"
                      className={classes.breadcrumb}
                      component={Link}
                      href={item.href}
                    >
                      {item.name}
                    </Text>
                  ) : (
                    <Text size="sm" className={classes.breadcrumb}>
                      {item.name}
                    </Text>
                  )}
                </Fragment>
              );
            })}
          </Breadcrumbs>
        </Flex>
      </AppContainer>
    </Box>
  );
};

export default HeadingBanner;
