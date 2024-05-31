import { PropsWithChildren, ReactNode } from 'react';

import { Content, PageLink, PageTitle, ToolbarWrapper } from '@vklink/metronic-core';
import { PageToolbar } from './PageToolbar';

type Props = PropsWithChildren<{
  breadCrumbs: Omit<PageLink, 'isSeparator' | 'isActive'>[];
  pageTitle: string;
  action?: ReactNode;
}>;

const PageLayout = ({ children, pageTitle, breadCrumbs, action }: Props) => {
  const breadcrumbItems: PageLink[] = breadCrumbs.reduce((items, current, index) => {
    items.push({
      ...current,
      isActive: false,
    });

    items.push({
      path: '',
      title: '',
      isActive: false,
      isSeparator: true,
    });

    return items;
  }, [] as PageLink[]);

  return (
    <>
      <PageTitle breadcrumbs={breadcrumbItems}>{pageTitle}</PageTitle>
      <ToolbarWrapper toolbar={<PageToolbar children={action} />} />
      <Content>{children}</Content>
    </>
  );
};

export { PageLayout };
