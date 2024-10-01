import { useEffect, useState } from 'react';

import { CheckboxInput, createColumnHelper, DataTable } from '@mila/components';
import { KTCard, KTCardBody } from '@mila/metronic-core';

import { DEFAULT_PAGING_PARAMS, FIRST_PAGE_INDEX, QUERY_KEYS } from '@/constants';
import { useFilter, useI18n, usePaginationQuery } from '@/hooks';
import { FilteredProduct } from '@/api/responses';
import { INVENTORY_API_URLS } from '@/api';

import { FilteredProductListQuery } from '@/app/pages/products/types';
import FilterToolbar from '@/app/pages/products/components/FilterToolbar';

import { CellLink, TableToolbar1 } from '../data-table';

const defaultQueryParams: FilteredProductListQuery = {
  ...DEFAULT_PAGING_PARAMS,
};

type Props = {
  onChange: (ids: string[]) => void;
  notInShopCollectionIds?: string[];
  shopCollectionIds?: string[];
};

const FilteredProductsSelectionTable = ({
  onChange,
  notInShopCollectionIds,
  shopCollectionIds,
}: Props) => {
  const { t } = useI18n();
  const [queryParams, setQueryParams] = useFilter(defaultQueryParams);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { data, isLoading, pagingInfo, isRefetching } = usePaginationQuery<FilteredProduct>(
    INVENTORY_API_URLS.FILTER_PRODUCTS,
    {
      refetchOnMount: true,
      paging: queryParams,
      queryKey: [
        QUERY_KEYS.product.base,
        QUERY_KEYS.product.list,
        queryParams.keyword,
        'filter',
        notInShopCollectionIds,
        shopCollectionIds,
      ],
      getAdditionalParams: () => {
        return {
          keyword: queryParams.keyword,
          notInShopCollectionIds,
          shopCollectionIds,
        };
      },
    }
  );

  const addProduct = (productId: string) => {
    setSelectedIds((prev) => {
      return [...prev, productId];
    });
  };

  const onRemoveProduct = (productId: string) => {
    setSelectedIds((prev) => {
      return prev.filter((id) => id !== productId);
    });
  };

  const onHeaderCheck = (checked: boolean) => {
    const ids = data?.map((item) => item.id) || [];
    setSelectedIds((prev) => {
      if (checked) {
        return [...prev, ...ids];
      }

      return prev.filter((id) => !ids.includes(id));
    });
  };

  const onRowCheck = (checked: boolean, productId: string) => {
    if (checked) {
      addProduct(productId);
    } else {
      onRemoveProduct(productId);
    }
  };

  useEffect(() => {
    onChange(selectedIds);
  }, [selectedIds]);

  const columnHelper = createColumnHelper<FilteredProduct>();
  const columns = [
    columnHelper.display({
      id: 'selection',
      header: () => {
        const ids = data?.map((item) => item.id) || [];
        const allChecked = !!ids.length && ids.every((id) => selectedIds.includes(id));

        return <CheckboxInput checked={allChecked} onChange={onHeaderCheck} />;
      },
      cell: (info) => {
        const item = info.row.original;
        const isChecked = selectedIds.includes(item.id);

        return (
          <CheckboxInput checked={isChecked} onChange={(checked) => onRowCheck(checked, item.id)} />
        );
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

export { FilteredProductsSelectionTable };
