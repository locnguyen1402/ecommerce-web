import { NavigationItem } from "@/models";

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
