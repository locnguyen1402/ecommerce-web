import { FC, useEffect } from 'react';

import { useI18n } from '@/hooks';
import { PageLayout } from '@/shared/components';

const DashboardPage: FC = () => {
  return <></>;
};

const DashboardWrapper: FC = () => {
  const { t } = useI18n();
  return (
    <PageLayout pageTitle={t('menu.dashboard')} breadCrumbs={[]}>
      <DashboardPage />
    </PageLayout>
  );
};

export { DashboardWrapper };
