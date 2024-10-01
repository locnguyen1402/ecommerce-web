import { PageLink } from '@mila/metronic-core';

import { PageLayout } from '@/shared/components';
import { useI18n } from '@/hooks';
import { APP_ROUTES } from '@/constants';

import MutationForm from './components/MutationForm';

const Page = () => {
  const { t } = useI18n();

  const breadCrumbs: PageLink[] = [
    {
      title: t('breadcrumbs.productCategoryManagement'),
      path: APP_ROUTES.shopCollections.root,
      isSeparator: false,
      isActive: false,
    },
  ];

  return (
    <PageLayout pageTitle={t('actions.create')} breadCrumbs={breadCrumbs}>
      <MutationForm />
    </PageLayout>
  );
};

export default Page;
