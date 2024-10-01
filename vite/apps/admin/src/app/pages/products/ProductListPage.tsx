import { Link } from 'react-router-dom';

import { PageLink, KTCard, KTCardBody, KTIcon } from '@mila/metronic-core';
import { DataTable, createColumnHelper } from '@mila/components';

import { CellLink, PageLayout, TableToolbar1 } from '@/shared/components';

import { APP_ROUTES, DEFAULT_PAGING_PARAMS, FIRST_PAGE_INDEX, QUERY_KEYS } from '@/constants';
import { useQueryParams, useI18n, usePaginationQuery } from '@/hooks';
import { INVENTORY_API_URLS } from '@/api';
import { Product } from '@/api/responses';
import { formatCurrency } from '@/i18n';

import { ProductListQuery } from './types';
import FilterToolbar from './components/FilterToolbar';
import ProductListActions from './components/ProductListActions';

const defaultQueryParams: ProductListQuery = {
  ...DEFAULT_PAGING_PARAMS,
};

const Page = () => {
  const { t } = useI18n();
  const [queryParams, setQueryParams] = useQueryParams(defaultQueryParams);

  const { data, isLoading, pagingInfo, isRefetching } = usePaginationQuery<Product>(
    INVENTORY_API_URLS.PRODUCTS,
    {
      paging: queryParams,
      queryKey: [QUERY_KEYS.product.base, QUERY_KEYS.product.list, queryParams.keyword],
      getAdditionalParams: () => {
        return {
          keyword: queryParams.keyword,
        };
      },
    }
  );

  const breadCrumbs: PageLink[] = [
    {
      title: t('breadcrumbs.productManagement'),
      path: APP_ROUTES.products.root,
      isSeparator: false,
      isActive: false,
    },
  ];

  const columnHelper = createColumnHelper<Product>();

  const columns = [
    columnHelper.display({
      id: 'actions',
      header: () => t('label.actions'),
      cell: (info) => {
        const item = info.row.original;

        return <ProductListActions {...item} />;
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

        return <CellLink href={item.id}>{item.name}</CellLink>;
      },
      meta: {
        body: {
          className: 'min-w-150px mw-250px',
        },
      },
    }),
    columnHelper.accessor('variants', {
      header: () => t('label.variantCount'),
      cell: (info) => info.getValue()?.length,
      meta: {
        header: {
          className: 'w-100px text-center',
        },
        body: {
          className: 'text-center',
        },
      },
    }),
    columnHelper.accessor('stock', {
      header: () => t('label.stock'),
      meta: {
        header: {
          className: 'w-100px text-center',
        },
        body: {
          className: 'text-center',
        },
      },
    }),
    columnHelper.accessor('price', {
      header: () => t('label.price'),
      cell: (info) => formatCurrency(info.getValue()),
      meta: {
        header: {
          className: 'w-100px text-center',
        },
        body: {
          className: 'text-center',
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
