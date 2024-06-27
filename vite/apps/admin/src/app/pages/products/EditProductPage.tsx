import { ComponentProps, useMemo } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { PageLink } from '@vklink/metronic-core';

import { ProductDetail } from '@/api/responses';
import { PageLayout } from '@/shared/components';
import { useDetailQuery, useI18n } from '@/hooks';
import { INVENTORY_API_URLS } from '@/api';

import MutationForm from './components/MutationForm';

type FormDefaultValues = ComponentProps<typeof MutationForm>['defaultValues'];

const Page = () => {
  const { t } = useI18n();
  const { id } = useParams();

  const { data: detail } = useDetailQuery<ProductDetail>(
    generatePath(INVENTORY_API_URLS.PRODUCT_DETAIL, {
      id,
    }),
    {
      queryKey: ['product-detail', id, 'edit'],
      enabled: !!id,
    }
  );

  const breadCrumbs = useMemo(() => {
    return [
      {
        title: t('breadcrumbs.productManagement'),
        path: '/products',
        isSeparator: false,
        isActive: false,
      },
      !!detail && {
        title: detail.name,
        path: `/products/${detail.id}`,
        isSeparator: false,
        isActive: false,
      },
    ].filter(Boolean) as PageLink[];
  }, [id, detail]);

  const mapDetailToForm = (detail: ProductDetail): FormDefaultValues => ({
    name: detail.name,
    slug: detail.slug,
    description: detail.description,
    categories: detail.categories.map((item) => ({
      id: item.id,
      name: item.name,
    })),
    attributes: detail.attributes.map((item) => ({
      attributeId: item.id,
      name: item.name,
      values: item.values,
    })),
    variants: detail.variants.map((item) => ({
      stock: item.stock,
      price: item.price,
      values: item.values.map((v) => {
        const attribute = detail.attributes.find((a) => a.id === v.attributeId)!;

        return {
          id: attribute.id,
          name: attribute.name,
          value: v.value,
        };
      }),
    })),
  });

  return (
    <PageLayout pageTitle={t('actions.edit')} breadCrumbs={breadCrumbs}>
      {detail && <MutationForm defaultValues={mapDetailToForm(detail)} />}
    </PageLayout>
  );
};

export default Page;
