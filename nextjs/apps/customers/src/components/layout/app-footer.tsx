"use client";

import classes from "./app-footer.module.scss";

import Link from "next/link";

import { MantineLogo } from "@mantinex/mantine-logo";
import { ActionIcon, Box, Grid, Group, rem, Stack, Text } from "@mantine/core";

import { FOOTER_NAV_LIST, SOCIAL_NETWORKS } from "@/constants/layout";

import AppContainer from "./app-container";

const AppFooter = () => {
  return (
    <footer className={classes.footer}>
      <AppContainer className={classes.inner}>
        <Grid w="100%">
          <Grid.Col
            span={{
              base: 12,
              xs: 5,
              sm: 6,
              md: 6,
            }}
          >
            <Stack
              align="flex-start"
              gap="xs"
              maw={{
                xs: rem(200),
              }}
              w={{
                base: "100%",
                xs: "auto",
              }}
            >
              <Box component={Link} href="/">
                <MantineLogo size={30} />
              </Box>
              <Text size="xs" c="dimmed">
                Build fully functional accessible web applications faster than
                ever
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col
            span={{
              base: 12,
              xs: 7,
              sm: 6,
              md: 6,
            }}
          >
            <Grid grow gutter="sm">
              {FOOTER_NAV_LIST.map((nav) => {
                return (
                  <Grid.Col key={nav.title} span={{ base: 12, xs: 6, sm: 4 }}>
                    <Stack gap={4}>
                      <Text className={classes.title}>{nav.title}</Text>

                      <Stack gap={0}>
                        {nav.links.map((item) => {
                          return (
                            <Text
                              key={item.label}
                              className={classes.link}
                              component="a"
                              href={item.href}
                            >
                              {item.label}
                            </Text>
                          );
                        })}
                      </Stack>
                    </Stack>
                  </Grid.Col>
                );
              })}
            </Grid>
          </Grid.Col>
        </Grid>
      </AppContainer>

      <AppContainer className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © MIT License, 2024
        </Text>

        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          {SOCIAL_NETWORKS.map((info) => {
            const SocialIcon = info.icon;
            return (
              <ActionIcon
                key={info.label}
                component="a"
                href={info.href}
                target="_blank"
                size="lg"
                color="neutral"
                variant="subtle"
              >
                <SocialIcon
                  style={{ width: "75%", height: "75%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            );
          })}
        </Group>
      </AppContainer>
    </footer>
  );
};

export default AppFooter;
