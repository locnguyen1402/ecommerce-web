import { FooterNavigationItem, NavigationItem, SocialInfo } from "@/models";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";

export const HEADER_NAV_LIST: NavigationItem[] = [
  { href: "/shopping-center", label: "Shopping center" },
  { href: "/about-us", label: "About us" },
  {
    label: "Support",
    items: [
      { href: "/faq", label: "FAQ" },
      { href: "/demo", label: "Book a demo" },
      { href: "/forums", label: "Forums" },
    ],
  },
];

export const HEADER_CONFIGS = {
  FULL_HEIGHT: 80,
  SMALL_HEIGHT: 60,
  Z_INDEX: 1000,
};

export const FOOTER_NAV_LIST: FooterNavigationItem[] = [
  {
    title: "About",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Support", href: "#" },
      { label: "Forums", href: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", href: "#" },
      { label: "Media assets", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Releases", href: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", href: "#" },
      { label: "Follow on Twitter", href: "#" },
      { label: "Email newsletter", href: "#" },
      { label: "GitHub discussions", href: "#" },
    ],
  },
];

export const SOCIAL_NETWORKS: SocialInfo[] = [
  {
    href: "https://www.linkedin.com/in/locnguyen1402/",
    icon: IconBrandLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://www.facebook.com/loc.nt1402/",
    icon: IconBrandFacebook,
    label: "Facebook",
  },
  {
    href: "https://github.com/locnguyen1402/",
    icon: IconBrandGithub,
    label: "Github",
  },
];
