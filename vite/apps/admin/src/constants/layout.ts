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
    title: 'menu.inventory',
    kind: 'section',
  },
  {
    to: '/products',
    title: 'menu.products',
    icon: 'cube-2',
    kind: 'item',
  },
  {
    to: '/product-categories',
    title: 'menu.productCategories',
    icon: 'category',
    kind: 'item',
  },
  {
    to: '/product-attributes',
    title: 'menu.attributes',
    icon: 'element-plus',
    kind: 'item',
  },
];
