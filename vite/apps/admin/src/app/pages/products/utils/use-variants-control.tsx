import {
  DataTable,
  SearchableSelectInput,
  TextField,
  createColumnHelper,
} from '@vklink/components';
import { KTIcon } from '@vklink/metronic-core';

import { useI18n } from '@/hooks';
import { formatCurrency } from '@/i18n';

type Props = {
  control: any;
  selectedAttributes: CreateProductRequest['attributes'];
  variants: CreateProductRequest['variants'];

  onAddVariant: (variant: CreateProductVariantRequest) => void;
  onRemoveVariant: (index: number) => void;
};

export const useVariantsControl = ({
  control,
  variants,
  selectedAttributes,
  onAddVariant,
  onRemoveVariant,
}: Props) => {
  const { t } = useI18n();

  const columnHelper = createColumnHelper<CreateProductVariantRequest>();

  const columns = [
    ...selectedAttributes.map((attribute) => {
      return columnHelper.display({
        id: attribute.id,
        header: () => attribute.name,
        cell: (info) => {
          const attributeValue = info.row.original.values.find(
            (value) => value.id === attribute.id
          );

          return attributeValue?.value;
        },
      });
    }),
    columnHelper.accessor('price', {
      header: () => t('label.price'),
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
            name={`variants.${index}.price`}
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
    columnHelper.accessor('stock', {
      header: () => t('label.stock'),
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
            name={`variants.${index}.stock`}
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
    columnHelper.display({
      id: 'actions',
      header: () => t('label.actions'),
      cell: (info) => (
        <button
          onClick={() => {
            onRemoveVariant(info.row.index);
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
    variantListComponent: (
      <DataTable
        columns={columns}
        data={variants}
        pageIndex={0}
        pageSize={variants.length}
        itemCount={variants.length}
        pageCount={1}
        hidePagination
      />
    ),
  };
};
