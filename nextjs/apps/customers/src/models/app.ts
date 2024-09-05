import { TablerIcon } from "@tabler/icons-react";

export type NavigationItem = {
  label: string;
  href?: string;
  items?: {
    label: string;
    href: string;
  }[];
};

export type FooterNavigationItem = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

export type SocialInfo = {
  icon: TablerIcon;
  label: string;
  href: string;
};
