import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { PageLink, KTCard, KTCardBody, KTIcon } from '@vklink/metronic-core';
import { DataTable, createColumnHelper } from '@vklink/components';
import {
  Combinator,
  Operator,
  ProductType,
  createHttpInstance,
  usePaginationQuery,
  useStoreServiceClients,
} from '@vklink/grpc-api';

import { CellLink, PageLayout, RepresentativeInfo, TableToolbar1 } from '@/shared/components';
import { ProductListQuery } from '@/shared/types/api';

import { DEFAULT_PAGING_PARAMS, FIRST_PAGE_INDEX } from '@/constants';
import { useQueryParams, useI18n } from '@/hooks';
import { formatDateTime, formatNumber } from '@/i18n';

import FilterToolbar from './components/FilterToolbar';
import EnableDisableButton from './components/EnableDisableButton';

const API_URL = import.meta.env.VITE_API_URL;

const defaultQueryParams: ProductListQuery = {
  ...DEFAULT_PAGING_PARAMS,
};

const Page = () => {
  const http = createHttpInstance(API_URL);
  const { t } = useI18n();
  const { productClient } = useStoreServiceClients();
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
      path: '/services',
      isSeparator: false,
      isActive: false,
    },
  ];

  const columnHelper = createColumnHelper<any>();

  const columns = [
    // columnHelper.accessor('id', {
    //   header: () => t('label.product'),
    //   cell: (info) => {
    //     const product = info.row.original;

    //     return (
    //       <RepresentativeInfo
    //         href={product.id}
    //         avatar={product.thumbnail?.url}
    //         title={product.name}
    //         // description={product.shortDescription}
    //       />
    //     );
    //   },
    //   meta: {
    //     body: {
    //       className: 'min-w-200px mw-250px',
    //     },
    //   },
    // }),
    // columnHelper.accessor('id', {
    //   header: () => t('label.category'),
    //   cell: (info) => {
    //     const product = info.row.original;
    //     const category = product.categories ? product.categories[0] : null;
    //     return (
    //       <>
    //         {category && (
    //           <CellLink href={'/service-categories/' + category.categoryId}>
    //             {category.name}
    //           </CellLink>
    //         )}
    //       </>
    //     );
    //   },
    //   meta: {
    //     header: {
    //       className: 'min-w-100px text-center',
    //     },
    //     body: {
    //       className: 'text-center',
    //     },
    //   },
    // }),
    // columnHelper.accessor('id', {
    //   header: () => t('label.enable'),
    //   cell: (info) => {
    //     const product = info.row.original;
    //     return (
    //       <EnableDisableButton
    //         id={product.id}
    //         enabled={product.enabled}
    //         successCb={refetch}
    //         name={product.name}
    //       />
    //     );
    //   },
    //   meta: {
    //     header: {
    //       className: 'min-w-100px text-center',
    //     },
    //     body: {
    //       className: 'text-center',
    //     },
    //   },
    // }),
    // columnHelper.accessor('slug', {
    //   header: () => 'Slug',
    //   meta: {
    //     header: {
    //       className: 'min-w-200px',
    //     },
    //   },
    // }),
    // columnHelper.accessor('order', {
    //   header: () => t('label.order'),
    //   cell: (info) => {
    //     const category = info.row.original;

    //     return <>{formatNumber(category.order)}</>;
    //   },
    //   meta: {
    //     header: {
    //       className: 'min-w-80px text-center',
    //     },
    //     body: {
    //       className: 'min-w-80px text-center',
    //     },
    //   },
    // }),
    // columnHelper.accessor('creator.displayName', {
    //   header: () => t('label.createdBy'),
    //   meta: {
    //     header: {
    //       className: 'min-w-150px',
    //     },
    //   },
    // }),
    // columnHelper.accessor('creator.timestamp', {
    //   header: () => t('label.createdAt'),
    //   cell: (info) => formatDateTime(info.getValue(), { dateOnly: true }),
    //   meta: {
    //     header: {
    //       className: 'min-w-150px',
    //     },
    //   },
    // }),
    // columnHelper.accessor('updater.displayName', {
    //   header: () => t('label.updatedBy'),
    //   meta: {
    //     header: {
    //       className: 'min-w-150px',
    //     },
    //   },
    // }),
    // columnHelper.accessor('updater.timestamp', {
    //   header: () => t('label.updatedAt'),
    //   cell: (info) => formatDateTime(info.getValue(), { dateOnly: true }),
    //   meta: {
    //     header: {
    //       className: 'min-w-150px',
    //     },
    //   },
    // }),
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
