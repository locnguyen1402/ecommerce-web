import { useState } from 'react';
import { Link } from 'react-router-dom';

import { PageLink, KTCard, KTCardBody, KTIcon } from '@mila/metronic-core';
import { DataTable, createColumnHelper } from '@mila/components';

import { CellLink, PageLayout, TableToolbar1 } from '@/shared/components';
import { INVENTORY_API_URLS } from '@/api';
import { ShopCollection } from '@/api/responses';

import { APP_ROUTES, DEFAULT_PAGING_PARAMS, FIRST_PAGE_INDEX, QUERY_KEYS } from '@/constants';
import { useQueryParams, useI18n, usePaginationQuery } from '@/hooks';

import { ShopCollectionListQuery } from './types';
import FilterToolbar from './components/FilterToolbar';
import ShopCollectionListActions from './components/ShopCollectionListActions';
import AddProductsModal from './components/AddProductsModal';
import RemoveProductsModal from './components/RemoveProductsModal';

const defaultQueryParams: ShopCollectionListQuery = {
  ...DEFAULT_PAGING_PARAMS,
};

const Page = () => {
  const { t } = useI18n();
  const [queryParams, setQueryParams] = useQueryParams(defaultQueryParams);
  const [collectionModalState, setCollectionModalState] = useState<{
    selectedCollection: ShopCollection | null;
    action: 'add-products' | 'remove-products' | null;
  }>({
    selectedCollection: null,
    action: null,
  });

  const { data, isLoading, pagingInfo, isRefetching, refetch } = usePaginationQuery<ShopCollection>(
    INVENTORY_API_URLS.SHOP_COLLECTIONS,
    {
      paging: queryParams,
      queryKey: [
        QUERY_KEYS.shopCollection.base,
        QUERY_KEYS.shopCollection.list,
        queryParams.keyword,
      ],
      getAdditionalParams: () => {
        return {
          keyword: queryParams.keyword,
        };
      },
    }
  );

  const breadCrumbs: PageLink[] = [
    {
      title: t('breadcrumbs.productCategoryManagement'),
      path: APP_ROUTES.shopCollections.root,
      isSeparator: false,
      isActive: false,
    },
  ];

  const onAddProducts = (collection: ShopCollection) => {
    setCollectionModalState({
      selectedCollection: collection,
      action: 'add-products',
    });
  };

  const onRemoveProducts = (collection: ShopCollection) => {
    setCollectionModalState({
      selectedCollection: collection,
      action: 'remove-products',
    });
  };

  const onCloseModal = () => {
    setCollectionModalState({
      selectedCollection: null,
      action: null,
    });
  };

  const columnHelper = createColumnHelper<ShopCollection>();
  const columns = [
    columnHelper.display({
      id: 'actions',
      header: () => t('label.actions'),
      cell: (info) => {
        const item = info.row.original;

        return (
          <ShopCollectionListActions
            onAddProducts={onAddProducts}
            onRemoveProducts={onRemoveProducts}
            {...item}
          />
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
    // columnHelper.accessor('slug', {
    //   header: () => t('label.slug'),
    // }),
    columnHelper.accessor('description', {
      header: () => t('label.description'),
    }),
    columnHelper.accessor('productCount', {
      header: () => t('label.productCount'),
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

      <AddProductsModal
        isOpen={
          !!collectionModalState.selectedCollection &&
          collectionModalState?.action === 'add-products'
        }
        onClose={onCloseModal}
        collection={collectionModalState.selectedCollection}
        successCallback={refetch}
      />
      <RemoveProductsModal
        isOpen={
          !!collectionModalState.selectedCollection &&
          collectionModalState?.action === 'remove-products'
        }
        onClose={onCloseModal}
        collection={collectionModalState.selectedCollection}
        successCallback={refetch}
      />
    </PageLayout>
  );
};

export default Page;
