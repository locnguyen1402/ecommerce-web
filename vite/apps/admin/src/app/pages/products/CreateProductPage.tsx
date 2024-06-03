import { PageLink } from '@vklink/metronic-core';

import { PageLayout } from '@/shared/components';
import { useI18n } from '@/hooks';

import MutationForm from './components/MutationForm';

const Page = () => {
  const { t } = useI18n();
  const breadCrumbs: PageLink[] = [
    {
      title: t('breadcrumbs.productManagement'),
      path: '/products',
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
