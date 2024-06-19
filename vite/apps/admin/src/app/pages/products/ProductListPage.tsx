import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { PageLink, KTCard, KTCardBody, KTIcon } from '@vklink/metronic-core';
import { DataTable, createColumnHelper } from '@vklink/components';

import { CellLink, PageLayout, RepresentativeInfo, TableToolbar1 } from '@/shared/components';

import { DEFAULT_PAGING_PARAMS, FIRST_PAGE_INDEX } from '@/constants';
import { useQueryParams, useI18n, usePaginationQuery } from '@/hooks';
import { formatDateTime, formatNumber } from '@/i18n';
import { INVENTORY_API_URLS } from '@/api';

import FilterToolbar from './components/FilterToolbar';

const defaultQueryParams: any = {
  ...DEFAULT_PAGING_PARAMS,
};

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
};

const Page = () => {
  const { t } = useI18n();
  const [queryParams, setQueryParams] = useQueryParams(defaultQueryParams);

  const { data, isLoading, pagingInfo } = usePaginationQuery<Product>(INVENTORY_API_URLS.PRODUCTS, {
    paging: queryParams,
    queryKey: ['product-list-page'],
  });

  const breadCrumbs: PageLink[] = [
    {
      title: t('breadcrumbs.productManagement'),
      path: '/products',
      isSeparator: false,
      isActive: false,
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [];

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
        {/* <TableToolbar1
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
            data={data || []}
            columns={columns}
            onPaginationStateChange={setQueryParams}
            {...pagingInfo}
          />
        </KTCardBody> */}
      </KTCard>
    </PageLayout>
  );
};

export default Page;
