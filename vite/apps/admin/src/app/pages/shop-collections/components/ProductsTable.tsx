import { generatePath, useParams } from 'react-router-dom';

import { createColumnHelper, DataTable } from '@mila/components';
import { KTCard, KTCardBody } from '@mila/metronic-core';

import { CellLink, TableToolbar1 } from '@/shared/components';
import { APP_ROUTES, DEFAULT_PAGING_PARAMS, FIRST_PAGE_INDEX, QUERY_KEYS } from '@/constants';
import { useFilter, useI18n, usePaginationQuery } from '@/hooks';
import { INVENTORY_API_URLS } from '@/api';
import { Product } from '@/api/responses';
import { formatCurrency } from '@/i18n';

import { ProductListQuery } from '../../products/types';
import FilterToolbar from '../../products/components/FilterToolbar';

const defaultQueryParams: ProductListQuery = {
  ...DEFAULT_PAGING_PARAMS,
};

const ProductsTable = () => {
  const { id } = useParams();
  const { t } = useI18n();
  const [queryParams, setQueryParams] = useFilter(defaultQueryParams);

  const { data, isLoading, pagingInfo, isRefetching } = usePaginationQuery<Product>(
    generatePath(INVENTORY_API_URLS.PRODUCTS_IN_SHOP_COLLECTION, { id }),
    {
      enabled: !!id,
      paging: queryParams,
      queryKey: [
        QUERY_KEYS.shopCollection.base,
        QUERY_KEYS.shopCollection.detail,
        id,
        QUERY_KEYS.product.base,
        QUERY_KEYS.product.list,
        queryParams.keyword,
      ],
      getAdditionalParams: () => {
        return {
          keyword: queryParams.keyword,
        };
      },
    }
  );

  const columnHelper = createColumnHelper<Product>();
  const columns = [
    columnHelper.accessor('id', {
      header: () => t('label.name'),
      cell: (info) => {
        const item = info.row.original;

        return (
          <CellLink
            href={generatePath(APP_ROUTES.products.detail, {
              id: item.id,
            })}
          >
            {item.name}
          </CellLink>
        );
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
  );
};

export default ProductsTable;
