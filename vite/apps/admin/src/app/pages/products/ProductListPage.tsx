import { Link } from 'react-router-dom';

import { PageLink, KTCard, KTCardBody, KTIcon } from '@vklink/metronic-core';
import { DataTable, createColumnHelper } from '@vklink/components';

import { PageLayout, TableToolbar1 } from '@/shared/components';

import { DEFAULT_PAGING_PARAMS, FIRST_PAGE_INDEX } from '@/constants';
import { useQueryParams, useI18n, usePaginationQuery } from '@/hooks';
import { INVENTORY_API_URLS } from '@/api';
import { Product } from '@/api/responses';

import { ProductListQuery } from './types';
import FilterToolbar from './components/FilterToolbar';

const defaultQueryParams: ProductListQuery = {
  ...DEFAULT_PAGING_PARAMS,
};

const Page = () => {
  const { t } = useI18n();
  const [queryParams, setQueryParams] = useQueryParams(defaultQueryParams);

  const { data, isLoading, pagingInfo } = usePaginationQuery<Product>(INVENTORY_API_URLS.PRODUCTS, {
    paging: queryParams,
    queryKey: ['product-list-page', queryParams.keyword],
    getAdditionalParams: () => {
      return {
        keyword: queryParams.keyword,
      };
    },
  });

  const breadCrumbs: PageLink[] = [
    {
      title: t('breadcrumbs.productManagement'),
      path: '/products',
      isSeparator: false,
      isActive: false,
    },
  ];

  const columnHelper = createColumnHelper<Product>();

  const columns = [
    columnHelper.accessor('name', {
      header: () => t('label.name'),
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
