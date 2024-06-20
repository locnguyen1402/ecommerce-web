import {
  DataTable,
  SearchableSelectInput,
  TextField,
  createColumnHelper,
} from '@vklink/components';
import { KTIcon } from '@vklink/metronic-core';

import { useDebouncedText, useI18n, usePaginationQuery } from '@/hooks';
import { FIRST_PAGE_INDEX } from '@/constants';
import { INVENTORY_API_URLS } from '@/api';

type Props = {
  control: any;
  selectedAttributes: CreateProductRequest['attributes'];

  onAddAttribute: (attribute: AttributeInCreateProduct) => void;
  onRemoveAttribute: (index: number) => void;
};

export const useAttributesControl = ({
  control,
  selectedAttributes,
  onAddAttribute,
  onRemoveAttribute,
}: Props) => {
  const { t } = useI18n();
  const {
    actualText: searchText,
    setActualText: setSearchText,
    debouncedText: debouncedSearchText,
  } = useDebouncedText();

  const { data: productAttributes, isLoading: isProductAttributeLoading } =
    usePaginationQuery<IdName>(INVENTORY_API_URLS.PRODUCT_ATTRIBUTES, {
      enabled: searchText === debouncedSearchText,
      paging: {
        pageIndex: FIRST_PAGE_INDEX,
        pageSize: 1000,
      },
      queryKey: ['product-create-page_attribute-list', searchText],
      getAdditionalParams: () => ({
        keyword: searchText,
      }),
    });

  const columnHelper = createColumnHelper<AttributeInCreateProduct>();

  const columns = [
    columnHelper.accessor('id', {
      header: () => t('label.name'),
      cell: (info) => info.row.original.name,
      meta: {
        body: {
          className: 'mw-150px',
        },
      },
    }),
    columnHelper.accessor('values', {
      header: () => t('label.value'),
      cell: (info) => {
        const index = info.row.index;

        return (
          <TextField
            layoutConfig={{
              containerClass: 'm-0',
              horizontal: {
                labelClass: 'd-none',
                inputClass: 'w-100',
              },
            }}
            orientation="horizontal"
            control={control}
            name={`attributes.${index}.values`}
          />
        );
      },
      meta: {
        header: {
          className: 'min-w-100px mw-100px text-center',
        },
        body: {
          className: 'mw-100px text-center',
        },
      },
    }),
    columnHelper.accessor('id', {
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
          className: 'min-w-50px mw-150px',
        },
      },
    }) as any,
  ];

  return {
    searchInput: (
      <SearchableSelectInput
        value={null}
        isMulti={false}
        placeholder={`${t('label.searchBy')} ${t('label.name').toLowerCase()}`}
        isLoading={isProductAttributeLoading}
        isDisabled={isProductAttributeLoading}
        options={productAttributes || []}
        getOptionLabel={(p) => p.name}
        getOptionValue={(p) => p.id}
        inputValue={searchText}
        onInputChange={setSearchText}
        onChange={(selected) => {
          if (selected) {
            onAddAttribute({
              ...selected,
              values: '',
            });
          }
        }}
      />
    ),
    attributeListComponent: (
      <DataTable
        columns={columns}
        data={selectedAttributes}
        pageIndex={0}
        pageSize={selectedAttributes.length}
        itemCount={selectedAttributes.length}
        pageCount={1}
        hidePagination
      />
    ),
  };
};
