import { useCallback } from 'react';

import {
  CellContext,
  DataTable,
  SearchableSelectInput,
  TagsField,
  createColumnHelper,
  useFieldArray,
} from '@vklink/components';
import { KTIcon } from '@vklink/metronic-core';

import { useDebouncedText, useI18n, useInfiniteQuery } from '@/hooks';
import { INVENTORY_API_URLS } from '@/api';

import { AttributeInCreateProduct, CreateProductRequest } from '../types';

type Props = {
  control: any;
};

export const useAttributesControl = ({ control }: Props) => {
  const { t } = useI18n();
  const columnHelper = createColumnHelper<AttributeInCreateProduct>();

  const {
    actualText: searchText,
    setActualText: setSearchText,
    debouncedText: debouncedSearchText,
  } = useDebouncedText();

  const {
    dataItems: productAttributes,
    hasNextPage,
    fetchNextPage,
    isLoading: isProductAttributeLoading,
  } = useInfiniteQuery<IdName>(INVENTORY_API_URLS.PRODUCT_ATTRIBUTES, {
    enabled: searchText === debouncedSearchText,
    queryKey: ['product-create-page_attribute-list', searchText],
    getAdditionalParams: () => ({
      keyword: searchText,
    }),
    pageSize: 5,
  });

  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray<CreateProductRequest, 'attributes'>({
    control,
    name: 'attributes',
  });

  const onAddAttribute = (attribute: IdName) => {
    const isExist = attributeFields.some((f) => f.attributeId === attribute.id);

    if (!isExist) {
      appendAttribute({
        attributeId: attribute.id,
        name: attribute.name,
        values: [],
      });
    }
  };

  const onRemoveAttribute = (index: number) => {
    removeAttribute(index);
  };

  const renderAttributeValueInput = useCallback(
    (info: CellContext<AttributeInCreateProduct, string[]>) => {
      const index = info.row.index;

      return (
        <TagsField
          layoutConfig={{
            containerClass: 'm-0',
            horizontal: {
              labelClass: 'd-none',
              inputClass: 'w-100',
            },
          }}
          orientation="horizontal"
          placeholder="Press enter to add tag"
          control={control}
          name={`attributes.${index}.values`}
        />
      );
    },
    [attributeFields]
  );

  const columns = [
    columnHelper.display({
      id: 'actions',
      header: () => t('label.actions'),
      cell: (info) => (
        <button
          onClick={() => {
            onRemoveAttribute(info.row.index);
          }}
          className="btn btn-sm btn-icon btn-bg-light btn-active-color-danger"
        >
          <KTIcon iconName="abstract-11" className="fs-1" />
        </button>
      ),
      meta: {
        header: {
          className: 'min-w-50px w-75px',
        },
      },
    }),
    columnHelper.accessor('attributeId', {
      header: () => t('label.name'),
      cell: (info) => info.row.original.name,
      meta: {
        body: {
          className: 'min-w-100px mw-150px',
        },
      },
    }),
    columnHelper.accessor('values', {
      header: () => t('label.value'),
      cell: renderAttributeValueInput,
      meta: {
        header: {
          className: 'min-w-100px mw-100px',
        },
      },
    }),
  ];

  return {
    searchInput: (
      <SearchableSelectInput
        id={'test'}
        value={null}
        isMulti={false}
        placeholder={`${t('label.searchBy')} ${t('label.name').toLowerCase()}`}
        isLoading={isProductAttributeLoading}
        isDisabled={isProductAttributeLoading}
        options={productAttributes}
        hasMore={hasNextPage}
        loadMore={fetchNextPage}
        getOptionLabel={(p) => p.name}
        getOptionValue={(p) => p.id}
        inputValue={searchText}
        onInputChange={setSearchText}
        onChange={(selected) => {
          if (selected) {
            onAddAttribute(selected);
          }
        }}
      />
    ),
    attributeListComponent: (
      <DataTable
        columns={columns}
        data={attributeFields}
        pageIndex={0}
        pageSize={attributeFields.length}
        itemCount={attributeFields.length}
        pageCount={1}
        hidePagination
      />
    ),
  };
};
