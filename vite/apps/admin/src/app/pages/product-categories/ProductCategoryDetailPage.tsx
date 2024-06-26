import { Link, generatePath, useParams } from 'react-router-dom';

import { KTIcon } from '@vklink/metronic-core';
import { LabelValueList, LabelValueListDef } from '@vklink/components';

import { PageLayout } from '@/shared/components';

import { useDetailQuery, useI18n } from '@/hooks';
import { ProductCategoryDetail } from '@/api/responses';
import { INVENTORY_API_URLS } from '@/api';

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

  const breadCrumbs = [
    {
      title: t('breadcrumbs.productCategoryManagement'),
      path: '/service-categories',
      isSeparator: false,
      isActive: false,
    },
  ];

  const itemDefs: LabelValueListDef<ProductCategoryDetail> = [
    {
      label: 'label.name',
      value: 'name',
    },
    {
      label: 'label.slug',
      value: 'slug',
    },
    {
      label: 'label.description',
      value: 'description',
    },
  ];

  return (
    <>
      <PageLayout
        pageTitle={t('label.detail')}
        breadCrumbs={breadCrumbs}
        action={
          <>
            <Link to="edit" className="btn btn-sm btn-flex fw-bold btn-primary">
              <KTIcon iconName="notepad-edit" className="fs-4 me-1" />
              {t('actions.edit')}
            </Link>
          </>
        }
      >
        <div className="card">
          <div className="card-body">
            <LabelValueList t={t as any} data={detail} def={itemDefs} />
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Page;
