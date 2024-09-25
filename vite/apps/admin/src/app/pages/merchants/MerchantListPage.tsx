import { Link } from 'react-router-dom';

import { PageLink, KTCard, KTCardBody, KTIcon } from '@vklink/metronic-core';
import { DataTable, createColumnHelper } from '@vklink/components';

import { CellLink, PageLayout, TableToolbar1 } from '@/shared/components';
import { INVENTORY_API_URLS } from '@/api';
import { Merchant } from '@/api/responses';

import { APP_ROUTES, DEFAULT_PAGING_PARAMS, FIRST_PAGE_INDEX, QUERY_KEYS } from '@/constants';
import { useQueryParams, useI18n, usePaginationQuery } from '@/hooks';

import { MerchantListQuery } from './types';
import FilterToolbar from './components/FilterToolbar';
import MerchantListActions from './components/MerchantListActions';

const defaultQueryParams: MerchantListQuery = {
  ...DEFAULT_PAGING_PARAMS,
};

const Page = () => {
  const { t } = useI18n();
  const [queryParams, setQueryParams] = useQueryParams(defaultQueryParams);

  const { data, isLoading, pagingInfo, isRefetching } = usePaginationQuery<Merchant>(
    INVENTORY_API_URLS.MERCHANTS,
    {
      paging: queryParams,
      queryKey: [QUERY_KEYS.merchant.base, QUERY_KEYS.merchant.list, queryParams.keyword],
      getAdditionalParams: () => {
        return {
          keyword: queryParams.keyword,
        };
      },
    }
  );

  const breadCrumbs: PageLink[] = [
    {
      title: t('breadcrumbs.merchantManagement'),
      path: APP_ROUTES.merchants.root,
      isSeparator: false,
      isActive: false,
    },
  ];

  const columnHelper = createColumnHelper<Merchant>();

  const columns = [
    columnHelper.display({
      id: 'actions',
      header: () => t('label.actions'),
      cell: (info) => {
        const item = info.row.original;

        return <MerchantListActions {...item} />;
      },
    }),
    columnHelper.accessor('id', {
      header: () => t('label.name'),
      cell: (info) => {
        const item = info.row.original;

        return <CellLink href={item.id}>{item.name}</CellLink>;
      },
      meta: {
        body: {
          className: 'min-w-150px mw-250px',
        },
      },
    }),
    // columnHelper.accessor('slug', {
    //   header: () => t('label.slug'),
    // }),
    columnHelper.accessor('description', {
      header: () => t('label.description'),
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
