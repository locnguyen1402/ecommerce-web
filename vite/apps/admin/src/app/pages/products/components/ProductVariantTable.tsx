import { useParams } from 'react-router-dom';

import { DataTable, createColumnHelper } from '@mila/components';

import { ProductAttributeWithValues, ProductVariant } from '@/api/responses';

import { useI18n } from '@/hooks';
import { formatCurrency } from '@/i18n';

import ProductVariantExtendStockButton from './ProductVariantExtendStockButton';

type Props = {
  attributes: ProductAttributeWithValues[];
  variants: ProductVariant[];
};

export const ProductVariantTable = ({ attributes, variants }: Props) => {
  const { t } = useI18n();
  const { id } = useParams();

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
    columnHelper.accessor('stock', {
      header: () => t('label.stock'),
      cell: (info) => {
        const item = info.row.original;
        const modalTitle = `${t('label.variant')}: ${item.values.map((v) => v.value).join(', ')}`;
        return (
          <div className="d-flex justify-content-end">
            <ProductVariantExtendStockButton
              stock={info.getValue()}
              productId={id!}
              productVariantId={item.id}
              modalTitle={modalTitle}
            />
          </div>
        );
      },
      meta: {
        header: {
          className: 'min-w-100px w-100px text-end',
        },
        body: {
          className: 'text-end',
        },
      },
    }),
    columnHelper.accessor('price', {
      header: () => t('label.price'),
      cell: (info) => formatCurrency(info.getValue()),
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
