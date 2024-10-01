import { generatePath, useParams } from 'react-router-dom';

import { createColumnHelper, DataTable } from '@mila/components';

import { DEFAULT_PAGING_PARAMS, QUERY_KEYS } from '@/constants';
import { useFilter, useI18n, usePaginationQuery } from '@/hooks';
import { CUSTOMER_API_URLS } from '@/api';
import { CustomerContact } from '@/api/responses';
import { formatPhoneNumber } from '@/i18n';
import { PaginatedQueryParams } from '@/shared/types';
import ContactListActions from './ContactListActions';

const defaultQueryParams: PaginatedQueryParams = {
  ...DEFAULT_PAGING_PARAMS,
};

type Props = {
  onContactUpdate: (contact: CustomerContact) => void;
};

const ContactsTable = ({ onContactUpdate }: Props) => {
  const { id } = useParams();
  const { t } = useI18n();
  const [queryParams, setQueryParams] = useFilter(defaultQueryParams);

  const { data, isLoading, pagingInfo, isRefetching } = usePaginationQuery<CustomerContact>(
    generatePath(CUSTOMER_API_URLS.CONTACTS, { id }),
    {
      enabled: !!id,
      paging: queryParams,
      queryKey: [
        QUERY_KEYS.customer.base,
        QUERY_KEYS.customer.detail,
        id,
        QUERY_KEYS.customerContact.base,
        QUERY_KEYS.customerContact.list,
        queryParams.keyword,
      ],
      getAdditionalParams: () => {
        return {
          keyword: queryParams.keyword,
        };
      },
    }
  );

  const columnHelper = createColumnHelper<CustomerContact>();
  const columns = [
    columnHelper.display({
      id: 'actions',
      header: () => t('label.actions'),
      cell: (info) => {
        const item = info.row.original;

        return <ContactListActions {...item} customerId={id!} onEdit={onContactUpdate} />;
      },
      meta: {
        header: {
          className: 'w-50px text-center',
        },
        body: {
          className: 'text-center',
        },
      },
    }),
    columnHelper.accessor('contactName', {
      header: () => t('label.contactName'),
      meta: {
        body: {
          className: 'min-w-150px mw-250px',
        },
      },
    }),
    columnHelper.accessor('phoneNumber', {
      header: () => t('label.phoneNumber'),
      cell: (info) => formatPhoneNumber(info.getValue()),
      meta: {
        header: {
          className: 'w-150px text-center',
        },
        body: {
          className: 'text-center',
        },
      },
    }),
    columnHelper.accessor('addressInfo.fullAddress', {
      header: () => t('label.fullAddress'),
    }),
  ];

  return (
    <DataTable
      isLoading={isLoading}
      isRefetching={isRefetching}
      data={data || []}
      columns={columns}
      onPaginationStateChange={setQueryParams}
      pageCount={pagingInfo.totalPages!}
      itemCount={pagingInfo.totalItems!}
      {...pagingInfo}
    />
  );
};

export default ContactsTable;
