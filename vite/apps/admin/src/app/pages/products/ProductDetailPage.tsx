import { Link, generatePath, useParams } from 'react-router-dom';

import { KTCard, KTCardBody, KTIcon } from '@vklink/metronic-core';
import { LabelValueList, LabelValueListDef } from '@vklink/components';

import { PageLayout, TableToolbar1 } from '@/shared/components';

import { useDetailQuery, useI18n } from '@/hooks';
import { INVENTORY_API_URLS } from '@/api';
import { ProductDetail } from '@/api/responses';

import { ProductVariantTable } from './components/ProductVariantTable';

const Page = () => {
  const { t } = useI18n();
  const { id } = useParams();

  const { data: detail } = useDetailQuery<ProductDetail>(
    generatePath(INVENTORY_API_URLS.PRODUCT_DETAIL, {
      id,
    }),
    {
      queryKey: ['product-detail', id],
      enabled: !!id,
    }
  );

  const breadCrumbs = [
    {
      title: t('breadcrumbs.productManagement'),
      path: '/products',
      isSeparator: false,
      isActive: false,
    },
  ];

  const itemDefs: LabelValueListDef<ProductDetail> = [
    // {
    //   label: 'label.name',
    //   value: 'name',
    // },
    {
      label: 'label.slug',
      value: 'slug',
    },
    {
      label: 'label.description',
      value: 'description',
    },
    {
      label: 'label.categories',
      renderValue: (data) => data.categories.map((c) => c.name).join(', '),
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
          <div className="card-header">
            <div className="card-title">
              <span className="fw-bold text-muted fs-6 me-2">{t('label.name')}:</span>
              <span className="fw-bolder">{detail?.name}</span>
            </div>
            {/* <div className="card-toolbar">
              {detail && (
                <EnableDisableButton
                  id={detail.id}
                  name={detail.name}
                  enabled={detail.enabled}
                  successCb={refetch}
                  render={({ onClick, isLoading }) => (
                    <OkButton isLoading={isLoading} onClick={onClick}>
                      {t(detail.enabled ? 'label.disable' : 'label.enable')}
                    </OkButton>
                  )}
                />
              )}
            </div> */}
          </div>
          <div className="card-body">
            <LabelValueList t={t as any} data={detail} def={itemDefs} />
          </div>
        </div>

        <KTCard className="mt-6 mt-lg-10">
          <TableToolbar1 left={t('label.variants')} />
          <KTCardBody className="py-4">
            <ProductVariantTable
              variants={detail?.variants || []}
              attributes={detail?.attributes || []}
            />
          </KTCardBody>
        </KTCard>
      </PageLayout>
    </>
  );
};

export default Page;
