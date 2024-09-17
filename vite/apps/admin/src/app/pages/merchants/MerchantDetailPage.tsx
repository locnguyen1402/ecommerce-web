import { Link, generatePath, useParams } from 'react-router-dom';

import { KTIcon } from '@vklink/metronic-core';
import { LabelValueList, LabelValueListDef } from '@vklink/components';

import { PageLayout } from '@/shared/components';

import { useDetailQuery, useI18n } from '@/hooks';
import { MerchantDetail } from '@/api/responses';
import { INVENTORY_API_URLS } from '@/api';
import { APP_ROUTES } from '@/constants';

const Page = () => {
  const { t } = useI18n();
  const { id } = useParams();

  const { data: detail } = useDetailQuery<MerchantDetail>(
    generatePath(INVENTORY_API_URLS.MERCHANT_DETAIL, {
      id,
    }),
    {
      queryKey: ['merchant-detail', id],
      enabled: !!id,
    }
  );

  const breadCrumbs = [
    {
      title: t('breadcrumbs.merchantManagement'),
      path: APP_ROUTES.merchants.root,
      isSeparator: false,
      isActive: false,
    },
  ];

  const itemDefs: LabelValueListDef<MerchantDetail> = [
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
