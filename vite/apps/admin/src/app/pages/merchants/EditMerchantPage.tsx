import { ComponentProps, useMemo } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { PageLink } from '@vklink/metronic-core';

import { PageLayout } from '@/shared/components';
import { useDetailQuery, useI18n } from '@/hooks';
import { INVENTORY_API_URLS } from '@/api';
import { MerchantDetail } from '@/api/responses';

import MutationForm from './components/MutationForm';
import { APP_ROUTES } from '@/constants';

type FormDefaultValues = ComponentProps<typeof MutationForm>['defaultValues'];

const Page = () => {
  const { t } = useI18n();
  const { id } = useParams();

  const { data: detail } = useDetailQuery<MerchantDetail>(
    generatePath(INVENTORY_API_URLS.MERCHANT_DETAIL, {
      id,
    }),
    {
      queryKey: ['merchant-detail', id, 'edit'],
      enabled: !!id,
    }
  );

  const breadCrumbs = useMemo(() => {
    return [
      {
        title: t('breadcrumbs.merchantManagement'),
        path: APP_ROUTES.merchants.root,
        isSeparator: false,
        isActive: false,
      },
      !!detail && {
        title: detail.name,
        path: generatePath(APP_ROUTES.merchants.detail, {
          id: detail.id,
        }),
        isSeparator: false,
        isActive: false,
      },
    ].filter(Boolean) as PageLink[];
  }, [id, detail]);

  const mapDetailToForm = (detail: MerchantDetail): FormDefaultValues => ({
    name: detail.name,
    slug: detail.slug,
    description: detail.description,
    categories: [],
  });

  return (
    <PageLayout pageTitle={t('actions.edit')} breadCrumbs={breadCrumbs}>
      {detail && <MutationForm defaultValues={mapDetailToForm(detail)} />}
    </PageLayout>
  );
};

export default Page;
