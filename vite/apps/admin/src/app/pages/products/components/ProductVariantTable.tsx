import { DataTable, createColumnHelper } from '@vklink/components';

import { ProductAttributeWithValues, ProductVariant } from '@/api/responses';

import { useI18n } from '@/hooks';
import { formatCurrency } from '@/i18n';

type Props = {
  attributes: ProductAttributeWithValues[];
  variants: ProductVariant[];
};

export const ProductVariantTable = ({ attributes, variants }: Props) => {
  const { t } = useI18n();
  const columnHelper = createColumnHelper<ProductVariant>();

  const columns = [
    ...attributes
      .filter((v) => v.values.length)
      .map((attribute) => {
        return columnHelper.display({
          id: `${attribute.id}-${attribute.name}`,
          header: () => attribute.name,
          cell: (info) => {
            const attributeValue = info.row.original.values.find(
              (value) => value.attributeId === attribute.id
            );

            return attributeValue?.value;
          },
        });
      }),
    columnHelper.display({
      id: 'stock',
      header: () => t('label.stock'),
      cell: (info) => info.row.original.stock,
      meta: {
        header: {
          className: 'min-w-100px w-100px text-end',
        },
        body: {
          className: 'text-end',
        },
      },
    }),
    columnHelper.display({
      id: 'price',
      header: () => t('label.price'),
      cell: (info) => formatCurrency(info.row.original.price),
      meta: {
        header: {
          className: 'min-w-150px w-150px text-end',
        },
        body: {
          className: 'text-end',
        },
      },
    }),
  ];

  return (
    <DataTable
      columns={columns}
      data={variants}
      pageIndex={0}
      pageSize={variants.length}
      itemCount={variants.length}
      pageCount={1}
      hidePagination
    />
  );
};
