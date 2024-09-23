import { Link, generatePath, useParams } from 'react-router-dom';

import { KTIcon } from '@vklink/metronic-core';
import { LabelValueList, LabelValueListDef } from '@vklink/components';

import { PageLayout } from '@/shared/components';

import { useDetailQuery, useI18n } from '@/hooks';
import { ProductCategoryDetail } from '@/api/responses';
import { INVENTORY_API_URLS } from '@/api';
import { APP_ROUTES, QUERY_KEYS } from '@/constants';

const Page = () => {
  const { t } = useI18n();
  const { id } = useParams();

  const { data: detail } = useDetailQuery<ProductCategoryDetail>(
    generatePath(INVENTORY_API_URLS.SHOP_COLLECTION_DETAIL, {
      id,
    }),
    {
      queryKey: [QUERY_KEYS.shopCollection.base, QUERY_KEYS.shopCollection.detail, id],
      enabled: !!id,
    }
  );

  const breadCrumbs = [
    {
      title: t('breadcrumbs.productCategoryManagement'),
      path: APP_ROUTES.shopCollections.root,
      isSeparator: false,
      isActive: false,
    },
  ];

  const itemDefs: LabelValueListDef<ProductCategoryDetail> = [
    // {
    //   label: 'label.name',
    //   value: 'name',
    // },
    {
      label: 'label.slug',
      value: 'slug',
    },
    {
      label: 'label.parent',
      renderValue: (data) => data.parent?.name,
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
      </PageLayout>
    </>
  );
};

export default Page;
