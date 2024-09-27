import { ComponentProps, useMemo } from 'react';
import { generatePath, useParams } from 'react-router-dom';

import { PageLink } from '@vklink/metronic-core';

import { PageLayout } from '@/shared/components';
import { useDetailQuery, useI18n } from '@/hooks';
import { CUSTOMER_API_URLS } from '@/api';
import { Customer } from '@/api/responses';
import { fromRequestDateToDate } from '@/i18n';
import { APP_ROUTES, QUERY_KEYS } from '@/constants';

import MutationForm from './components/MutationForm';

type FormDefaultValues = ComponentProps<typeof MutationForm>['defaultValues'];

const Page = () => {
  const { t } = useI18n();
  const { id } = useParams();

  const { data: detail } = useDetailQuery<Customer>(
    generatePath(CUSTOMER_API_URLS.CUSTOMER_DETAIL, {
      id,
    }),
    {
      queryKey: [QUERY_KEYS.customer.base, QUERY_KEYS.customer.detail, id, 'edit'],
      enabled: !!id,
    }
  );

  const breadCrumbs = useMemo(() => {
    return [
      {
        title: t('breadcrumbs.customerManagement'),
        path: APP_ROUTES.customers.root,
        isSeparator: false,
        isActive: false,
      },
      !!detail && {
        title: detail.fullName,
        path: generatePath(APP_ROUTES.customers.detail, {
          id: detail.id,
        }),
        isSeparator: false,
        isActive: false,
      },
    ].filter(Boolean) as PageLink[];
  }, [id, detail]);

  const mapDetailToForm = (detail: Customer): FormDefaultValues => ({
    firstName: detail.firstName,
    lastName: detail.lastName,
    birthDate: detail.birthDate ? fromRequestDateToDate(detail.birthDate).toISOString() : undefined,
    phoneNumber: detail.phoneNumber,
    email: detail.email,
    gender: detail.gender,
  });

  return (
    <PageLayout pageTitle={t('actions.edit')} breadCrumbs={breadCrumbs}>
      {detail && <MutationForm defaultValues={mapDetailToForm(detail)} />}
    </PageLayout>
  );
};

export default Page;
