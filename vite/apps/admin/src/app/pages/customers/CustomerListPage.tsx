import { Link } from 'react-router-dom';

import { PageLink, KTCard, KTCardBody, KTIcon } from '@vklink/metronic-core';
import { DataTable, createColumnHelper } from '@vklink/components';

import { CellLink, PageLayout, TableToolbar1 } from '@/shared/components';
import { CUSTOMER_API_URLS } from '@/api';
import { Customer } from '@/api/responses';

import { APP_ROUTES, DEFAULT_PAGING_PARAMS, FIRST_PAGE_INDEX, QUERY_KEYS } from '@/constants';
import { useQueryParams, useI18n, usePaginationQuery } from '@/hooks';

import { CustomerListQuery } from './types';
import FilterToolbar from './components/FilterToolbar';
import CustomerListActions from './components/CustomerListActions';
import { formatDateTime, formatPhoneNumber, fromRequestDateToDate } from '@/i18n';

const defaultQueryParams: CustomerListQuery = {
  ...DEFAULT_PAGING_PARAMS,
};

const Page = () => {
  const { t } = useI18n();
  const [queryParams, setQueryParams] = useQueryParams(defaultQueryParams);

  const { data, isLoading, pagingInfo, isRefetching } = usePaginationQuery<Customer>(
    CUSTOMER_API_URLS.CUSTOMERS,
    {
      paging: queryParams,
      queryKey: [QUERY_KEYS.customer.base, QUERY_KEYS.customer.list, queryParams.keyword],
      getAdditionalParams: () => {
        return {
          keyword: queryParams.keyword,
        };
      },
    }
  );

  const breadCrumbs: PageLink[] = [
    {
      title: t('breadcrumbs.customerManagement'),
      path: APP_ROUTES.customers.root,
      isSeparator: false,
      isActive: false,
    },
  ];

  const columnHelper = createColumnHelper<Customer>();

  const columns = [
    columnHelper.display({
      id: 'actions',
      header: () => t('label.actions'),
      cell: (info) => {
        const item = info.row.original;

        return <CustomerListActions {...item} />;
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
    columnHelper.accessor('id', {
      header: () => t('label.name'),
      cell: (info) => {
        const item = info.row.original;

        return <CellLink href={item.id}>{item.fullName}</CellLink>;
      },
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
          className: 'w-150px text-end',
        },
        body: {
          className: 'text-end',
        },
      },
    }),
    columnHelper.accessor('email', {
      header: () => t('label.email'),
      meta: {
        header: {
          className: 'w-200px text-end',
        },
        body: {
          className: 'text-end',
        },
      },
    }),
    columnHelper.accessor('birthDate', {
      header: () => t('label.birthDate'),
      cell: (info) => {
        const value = info.getValue();

        return value
          ? formatDateTime(fromRequestDateToDate(value), {
              dateOnly: true,
            })
          : undefined;
      },
      meta: {
        header: {
          className: 'w-150px text-end',
        },
        body: {
          className: 'text-end',
        },
      },
    }),
  ];

  return (
    <PageLayout
      pageTitle={t('label.list')}
      breadCrumbs={breadCrumbs}
      action={
        <>
          <Link to="create" className="btn btn-sm btn-flex fw-bold btn-primary">
            <KTIcon iconName="plus" className="fs-4 me-1" />
            {t('actions.create')}
          </Link>
        </>
      }
    >
      <KTCard>
        <TableToolbar1
          right={
            <FilterToolbar
              isLoading={isLoading}
              defaultValues={defaultQueryParams}
              onChange={(data) =>
                setQueryParams({
                  ...data,
                  pageIndex: FIRST_PAGE_INDEX,
                })
              }
              onReset={() => setQueryParams(defaultQueryParams, true)}
            />
          }
        />
        <KTCardBody className="py-4">
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
        </KTCardBody>
      </KTCard>
    </PageLayout>
  );
};

export default Page;
