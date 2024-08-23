export type NavigationItem = {
  label: string;
  href?: string;
  items?: {
    label: string;
    href: string;
  }[];
};
