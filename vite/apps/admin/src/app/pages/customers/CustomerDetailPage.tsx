import { Link, generatePath, useParams } from 'react-router-dom';

import { KTIcon } from '@vklink/metronic-core';
import { LabelValueList, LabelValueListDef } from '@vklink/components';

import { PageLayout } from '@/shared/components';

import { APP_ROUTES, QUERY_KEYS } from '@/constants';
import { useDetailQuery, useI18n } from '@/hooks';
import { Customer } from '@/api/responses';
import { CUSTOMER_API_URLS } from '@/api';
import { formatDateTime, fromRequestDateToDate } from '@/i18n';

const Page = () => {
  const { t } = useI18n();
  const { id } = useParams();

  const { data: detail } = useDetailQuery<Customer>(
    generatePath(CUSTOMER_API_URLS.CUSTOMER_DETAIL, {
      id,
    }),
    {
      queryKey: [QUERY_KEYS.customer.base, QUERY_KEYS.customer.detail, id],
      enabled: !!id,
    }
  );

  const breadCrumbs = [
    {
      title: t('breadcrumbs.customerManagement'),
      path: APP_ROUTES.customers.root,
      isSeparator: false,
      isActive: false,
    },
  ];

  const itemDefs: LabelValueListDef<Customer> = [
    {
      label: 'label.phoneNumber',
      value: 'phoneNumber',
    },
    {
      label: 'label.email',
      value: 'email',
    },
    {
      label: 'label.birthDate',
      value: {
        valueGetter: (data) =>
          data.birthDate
            ? formatDateTime(fromRequestDateToDate(data.birthDate), {
                dateOnly: true,
              })
            : undefined,
      },
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
              <span className="fw-bolder">{detail?.fullName}</span>
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
