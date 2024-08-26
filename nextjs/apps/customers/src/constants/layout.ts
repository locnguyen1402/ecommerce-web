import { NavigationItem } from "@/models";

export const HEADER_NAV_LIST: NavigationItem[] = [
  { href: "/about", label: "Features" },
  {
    href: "#1",
    label: "Learn",
    items: [
      { href: "/docs", label: "Documentation" },
      { href: "/resources", label: "Resources" },
      { href: "/community", label: "Community" },
      { href: "/blog", label: "Blog" },
    ],
  },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  {
    href: "#2",
    label: "Support",
    items: [
      { href: "/faq", label: "FAQ" },
      { href: "/demo", label: "Book a demo" },
      { href: "/forums", label: "Forums" },
    ],
  },
];
