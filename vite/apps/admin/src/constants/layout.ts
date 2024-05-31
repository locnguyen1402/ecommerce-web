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
    to: '/service-categories',
    title: 'menu.serviceCategories',
    icon: 'category',
    kind: 'item',
  },
  {
    to: '/products',
    title: 'menu.products',
    icon: 'cube-2',
    kind: 'item',
  },
];
