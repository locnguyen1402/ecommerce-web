import { useState } from 'react';

import { PageLink, KTCard, KTCardBody, KTIcon } from '@mila/metronic-core';
import { DataTable, createColumnHelper } from '@mila/components';

import { CellLink, PageLayout, TableToolbar1 } from '@/shared/components';
import { INVENTORY_API_URLS } from '@/api';
import { ProductAttribute } from '@/api/responses';

import { APP_ROUTES, DEFAULT_PAGING_PARAMS, FIRST_PAGE_INDEX, QUERY_KEYS } from '@/constants';
import { useQueryParams, useI18n, usePaginationQuery } from '@/hooks';

import { ProductAttributeListQuery } from './types';
import FilterToolbar from './components/FilterToolbar';
import MutationModal from './components/MutationModal';

type MutationModalState = {
  isOpen: boolean;
  selected: ProductAttribute | null;
};

const defaultQueryParams: ProductAttributeListQuery = {
  ...DEFAULT_PAGING_PARAMS,
};

const Page = () => {
  const { t } = useI18n();
  const [queryParams, setQueryParams] = useQueryParams(defaultQueryParams);
  const [mutationModalState, setMutationModalState] = useState<MutationModalState>({
    isOpen: false,
    selected: null,
  });

  const { data, isLoading, pagingInfo, isRefetching, refetch } =
    usePaginationQuery<ProductAttribute>(INVENTORY_API_URLS.PRODUCT_ATTRIBUTES, {
      paging: queryParams,
      queryKey: [
        QUERY_KEYS.productAttribute.base,
        QUERY_KEYS.productAttribute.list,
        queryParams.keyword,
      ],
      getAdditionalParams: () => {
        return {
          keyword: queryParams.keyword,
        };
      },
    });

  const breadCrumbs: PageLink[] = [
    {
      title: t('breadcrumbs.productAttributeManagement'),
      path: APP_ROUTES.productAttributes.root,
      isSeparator: false,
      isActive: false,
    },
  ];

  const columnHelper = createColumnHelper<ProductAttribute>();

  const columns = [
    columnHelper.display({
      id: 'actions',
      header: () => t('label.actions'),
      cell: (info) => (
        <button
          onClick={() => {
            openMutationModal(info.row.original);
          }}
          className="btn btn-sm btn-icon btn-light btn-color-primary btn-active-light-primary"
        >
          <KTIcon iconName="notepad-edit" className="fs-2" />
        </button>
      ),
      meta: {
        header: {
          className: 'min-w-50px w-100px mw-150px',
        },
      },
    }) as any,
    columnHelper.accessor('name', {
      header: () => t('label.name'),
      // cell: (info) => {
      //   const item = info.row.original;

      //   return <CellLink href={item.id}>{item.name}</CellLink>;
      // },
      meta: {
        body: {
          className: 'min-w-150px mw-250px',
        },
      },
    }),
  ];

  const openMutationModal = (selected: ProductAttribute | null) => {
    setMutationModalState({
      isOpen: true,
      selected,
    });
  };

  const closeMutationModal = () => {
    setMutationModalState({
      isOpen: false,
      selected: null,
    });
  };

  const mutationSuccessCallback = () => {
    closeMutationModal();
    refetch();
  };

  return (
    <PageLayout
      pageTitle={t('label.list')}
      breadCrumbs={breadCrumbs}
      action={
        <>
          <button
            className="btn btn-sm btn-flex fw-bold btn-primary"
            onClick={() => openMutationModal(null)}
          >
            <KTIcon iconName="plus" className="fs-4 me-1" />
            {t('actions.create')}
          </button>
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

      <MutationModal
        isOpen={mutationModalState.isOpen}
        onClose={closeMutationModal}
        defaultValues={mutationModalState.selected || undefined}
        id={mutationModalState.selected?.id}
        successCallback={mutationSuccessCallback}
      />
    </PageLayout>
  );
};

export default Page;
