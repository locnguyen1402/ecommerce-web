import { useState } from 'react';
import { Link, generatePath, useParams } from 'react-router-dom';

import { KTIcon } from '@mila/metronic-core';
import { LabelValueList, LabelValueListDef } from '@mila/components';

import { OkButton, PageLayout } from '@/shared/components';

import { APP_ROUTES, QUERY_KEYS } from '@/constants';
import { useDetailQuery, useI18n } from '@/hooks';
import { Customer, CustomerContact } from '@/api/responses';
import { CUSTOMER_API_URLS } from '@/api';
import { formatDateTime, fromRequestDateToDate } from '@/i18n';

import ContactsTable from './components/ContactTable';
import ContactModal from './components/ContactModal';

const Page = () => {
  const { t } = useI18n();
  const { id } = useParams();
  const [contactModalState, setContactModalState] = useState<{
    visible: boolean;
    action: 'add-contact' | 'update-contact' | null;
    selected: CustomerContact | null;
  }>({
    visible: false,
    selected: null,
    action: null,
  });

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

  const onAddContact = () => {
    setContactModalState({
      visible: true,
      action: 'add-contact',
      selected: null,
    });
  };

  const onUpdateContact = (contact: CustomerContact) => {
    setContactModalState({
      visible: true,
      action: 'update-contact',
      selected: contact,
    });
  };

  const onCloseContactModal = () => {
    setContactModalState({
      visible: false,
      action: null,
      selected: null,
    });
  };

  return (
    <>
      <PageLayout
        pageTitle={t('label.detail')}
        breadCrumbs={breadCrumbs}
        action={
          <>
            <OkButton className="btn-sm" onClick={onAddContact}>
              {t('actions.addContact')}
            </OkButton>
          </>
        }
      >
        <div className="card mb-4 mb-lg-8">
          <div className="card-header">
            <div className="card-title">
              <span className="fw-bold text-muted fs-6 me-2">{t('label.name')}:</span>
              <span className="fw-bolder">{detail?.fullName}</span>
            </div>
            <div className="card-toolbar">
              <Link to="edit" className="btn btn-sm btn-flex fw-bold btn-primary">
                <KTIcon iconName="notepad-edit" className="fs-4 me-1" />
                {t('actions.edit')}
              </Link>
            </div>
          </div>
          <div className="card-body">
            <LabelValueList t={t as any} data={detail} def={itemDefs} />
          </div>
        </div>

        <ContactsTable onContactUpdate={onUpdateContact} />

        <ContactModal
          customerId={id}
          isOpen={contactModalState.visible}
          onClose={onCloseContactModal}
          contact={contactModalState.selected}
          // successCallback={onCloseContactModal}
        />
      </PageLayout>
    </>
  );
};

export default Page;
