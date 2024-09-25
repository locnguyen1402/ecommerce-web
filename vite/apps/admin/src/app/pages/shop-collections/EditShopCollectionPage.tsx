import { ComponentProps, useMemo } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { PageLink } from '@vklink/metronic-core';

import { PageLayout } from '@/shared/components';
import { useDetailQuery, useI18n } from '@/hooks';
import { INVENTORY_API_URLS } from '@/api';
import { ShopCollectionDetail } from '@/api/responses';
import { APP_ROUTES, QUERY_KEYS } from '@/constants';

import MutationForm from './components/MutationForm';

type FormDefaultValues = ComponentProps<typeof MutationForm>['defaultValues'];

const Page = () => {
  const { t } = useI18n();
  const { id } = useParams();

  const { data: detail } = useDetailQuery<ShopCollectionDetail>(
    generatePath(INVENTORY_API_URLS.SHOP_COLLECTION_DETAIL, {
      id,
    }),
    {
      queryKey: [QUERY_KEYS.shopCollection.base, QUERY_KEYS.shopCollection.detail, id, 'edit'],
      enabled: !!id,
    }
  );

  const breadCrumbs = useMemo(() => {
    return [
      {
        title: t('breadcrumbs.productCategoryManagement'),
        path: APP_ROUTES.shopCollections.root,
        isSeparator: false,
        isActive: false,
      },
      !!detail && {
        title: detail.name,
        path: generatePath(APP_ROUTES.shopCollections.detail, {
          id: detail.id,
        }),
        isSeparator: false,
        isActive: false,
      },
    ].filter(Boolean) as PageLink[];
  }, [id, detail]);

  const mapDetailToForm = (detail: ShopCollectionDetail): FormDefaultValues => ({
    name: detail.name,
    slug: detail.slug,
    description: detail.description,
    parent: detail.parent?.id
      ? {
          id: detail.parent.id,
          name: detail.parent.name,
        }
      : null,
    children: detail.children.map((child) => ({
      id: child.id,
      name: child.name,
    })),
  });

  return (
    <PageLayout pageTitle={t('actions.edit')} breadCrumbs={breadCrumbs}>
      {detail && <MutationForm defaultValues={mapDetailToForm(detail)} />}
    </PageLayout>
  );
};

export default Page;
