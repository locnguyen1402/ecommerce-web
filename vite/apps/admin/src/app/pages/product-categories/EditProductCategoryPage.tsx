import { ComponentProps, useMemo } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { PageLink } from '@vklink/metronic-core';

import { PageLayout } from '@/shared/components';
import { useDetailQuery, useI18n } from '@/hooks';
import { INVENTORY_API_URLS } from '@/api';
import { ProductCategoryDetail } from '@/api/responses';

import MutationForm from './components/MutationForm';

type FormDefaultValues = ComponentProps<typeof MutationForm>['defaultValues'];

const Page = () => {
  const { t } = useI18n();
  const { id } = useParams();

  const { data: detail } = useDetailQuery<ProductCategoryDetail>(
    generatePath(INVENTORY_API_URLS.CATEGORY_DETAIL, {
      id,
    }),
    {
      queryKey: ['product-category-detail-page', id],
      enabled: !!id,
    }
  );

  const breadCrumbs = useMemo(() => {
    return [
      {
        title: t('breadcrumbs.productCategoryManagement'),
        path: '/product-categories',
        isSeparator: false,
        isActive: false,
      },
      !!detail && {
        title: detail.name,
        path: `/product-categories/${detail.id}`,
        isSeparator: false,
        isActive: false,
      },
    ].filter(Boolean) as PageLink[];
  }, [id, detail]);

  const mapDetailToForm = (detail: ProductCategoryDetail): FormDefaultValues => ({
    name: detail.name,
    slug: detail.slug,
    description: detail.description,
    parent: detail.parent?.id
      ? {
          id: detail.parent.id,
          name: detail.parent.name,
        }
      : null,
  });

  return (
    <PageLayout pageTitle={t('actions.edit')} breadCrumbs={breadCrumbs}>
      {detail && <MutationForm defaultValues={mapDetailToForm(detail)} />}
    </PageLayout>
  );
};

export default Page;
