import {
  DataTable,
  NumberTextField,
  SearchableSelectInput,
  TextField,
  createColumnHelper,
  useFieldArray,
  useWatch,
} from '@vklink/components';
import { KTIcon } from '@vklink/metronic-core';

import { useI18n } from '@/hooks';
import { BaseNumericFormatOptions } from '@/constants';

import { AttributeInCreateProduct, CreateProductVariantRequest } from '../types';
import { generateVariants } from '.';

type Props = {
  control: any;
  getValues: any;
};

export const useVariantsControl = ({ control, getValues }: Props) => {
  const { t } = useI18n();
  const columnHelper = createColumnHelper<CreateProductVariantRequest>();

  const selectedAttributes: AttributeInCreateProduct[] =
    useWatch({
      control,
      name: 'attributes',
    }) || [];

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: 'variants',
  });

  const onAddVariant = () => {
    appendVariant({});
  };

  const onRemoveVariant = (index: number) => {
    removeVariant(index);
  };

  const columns = [
    ...selectedAttributes.map((attribute) => {
      return columnHelper.display({
        id: `${attribute.attributeId}-${attribute.name}`,
        header: () => attribute.name,
        cell: (info) => {
          const attributeValue = info.row.original.values.find(
            (value) => value.id === attribute.attributeId
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
          <NumberTextField
            {...BaseNumericFormatOptions}
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
          <NumberTextField
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

  const generateRestVariants = () => {
    const addedVariants = getValues('variants');
    const attributes = getValues('attributes');

    appendVariant(generateVariants(attributes, addedVariants));
  };

  return {
    generateRestVariants,
    variantListComponent: (
      <DataTable
        columns={columns}
        data={variantFields}
        pageIndex={0}
        pageSize={variantFields.length}
        itemCount={variantFields.length}
        pageCount={1}
        hidePagination
      />
    ),
  };
};
