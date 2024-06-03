import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { PageLink, KTCard, KTCardBody, KTIcon } from '@vklink/metronic-core';
import { DataTable, createColumnHelper } from '@vklink/components';
import { createHttpInstance } from '@vklink/grpc-api';

import { CellLink, PageLayout, RepresentativeInfo, TableToolbar1 } from '@/shared/components';

import { DEFAULT_PAGING_PARAMS, FIRST_PAGE_INDEX } from '@/constants';
import { useQueryParams, useI18n } from '@/hooks';
import { formatDateTime, formatNumber } from '@/i18n';

import FilterToolbar from './components/FilterToolbar';

const API_URL = import.meta.env.VITE_API_URL;

const defaultQueryParams: any = {
  ...DEFAULT_PAGING_PARAMS,
};

const Page = () => {
  const http = createHttpInstance(API_URL);
  const { t } = useI18n();
  const [queryParams, setQueryParams] = useQueryParams(defaultQueryParams);

  const getProducts = () => {
    return http.get('/products', {});
  };

  useEffect(() => {
    getProducts().then((res) => {
      console.log(res.data);
    });
  }, []);

  // const { data, pagingInfo, isLoading, refetch } = usePaginationQuery(
  //   productClient.getAdminProducts,
  //   {
  //     paging: queryParams,
  //     queryKey: [
  //       'productClient.getAdminProducts',
  //       queryParams.keyword,
  //       queryParams.type,
  //       queryParams.categoryId,
  //     ],
  //     getAdditionalParams: () => {
  //       return {
  //         filter: {
  //           not: false,
  //           combinator: Combinator.AND,
  //           rules: [
  //             queryParams.keyword && {
  //               field: 'Name',
  //               operator: Operator.CONTAINS,
  //               value: queryParams.keyword,
  //             },
  //             queryParams.type && {
  //               field: 'Type',
  //               operator: Operator.EQUAL,
  //               value: Object.values(ProductType)[queryParams.type as any].toString(),
  //             },
  //           ].filter(Boolean) as any[],
  //         },
  //         categoryIds: queryParams.categoryId ? [queryParams.categoryId] : [],
  //       };
  //     },
  //   }
  // );

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
