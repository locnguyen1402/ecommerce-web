import { APP_ROUTES } from './routes';

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
    title: 'menu.masterData',
    kind: 'section',
  },
  {
    to: APP_ROUTES.merchants.root,
    title: 'menu.merchants',
    icon: 'category',
    kind: 'item',
  },
  {
    to: APP_ROUTES.categories.root,
    title: 'menu.categories',
    icon: 'category',
    kind: 'item',
  },
  {
    title: 'menu.inventory',
    kind: 'section',
  },
  {
    to: APP_ROUTES.shopCollections.root,
    title: 'menu.productCategories',
    icon: 'category',
    kind: 'item',
  },
  {
    to: APP_ROUTES.productAttributes.root,
    title: 'menu.attributes',
    icon: 'element-plus',
    kind: 'item',
  },
  {
    to: APP_ROUTES.products.root,
    title: 'menu.products',
    icon: 'cube-2',
    kind: 'item',
  },
  {
    title: 'menu.crm',
    kind: 'section',
  },
  {
    to: APP_ROUTES.customers.root,
    title: 'menu.customers',
    icon: 'cube-2',
    kind: 'item',
  },
];
