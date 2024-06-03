/**
 * Used in SidebarMenuMain.tsx
 * to display sidebar menu
 */
export const MENU_ITEMS: ISidebarMenuItem[] = [
  {
    to: '/dashboard',
    title: 'menu.dashboard',
    icon: 'element-11',
    kind: 'item',
  },
  {
    title: 'menu.features',
    kind: 'section',
  },
  {
    to: '/products',
    title: 'menu.products',
    icon: 'cube-2',
    kind: 'item',
  },
];
