/// <reference types="vite/client" />

interface ISidebarMenuItem {
  to?: string;
  title: string;
  /**
   * Refer to: {@link https://keenthemes.com/keenicons#freeversion}
   */
  icon?: import('./helpers/icons-config/icons').KeenIcon;
  // fontIcon?: string;
  hasBullet?: boolean;
  children?: ISidebarMenuItem[];

  kind: 'section' | 'item';
}
