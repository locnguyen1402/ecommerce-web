import {
  DataTable,
  NumberTextField,
  createColumnHelper,
  useFieldArray,
  useWatch,
} from '@mila/components';
import { KTIcon } from '@mila/metronic-core';

import { useI18n } from '@/hooks';
import { BaseNumericFormatOptions } from '@/constants';

import { CreateProductRequest, CreateProductVariantRequest } from '../types';
import { generateVariants } from '.';

type Props = {
  control: any;
  getValues: any;
  setValue: any;
};

export const useVariantsControl = ({ control, getValues, setValue }: Props) => {
  const { t } = useI18n();
  const columnHelper = createColumnHelper<CreateProductVariantRequest>();

  const selectedAttributes =
    useWatch<CreateProductRequest, 'attributes'>({
      control,
      name: 'attributes',
    }) || [];

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray<CreateProductRequest, 'variants'>({
    control,
    name: 'variants',
  });

  const onRemoveVariant = (index: number) => {
    removeVariant(index);
  };

  const columns = [
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
          className: 'min-w-50px w-75px',
        },
      },
    }),
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
            allowLeadingZeros={false}
            allowNegative={false}
          />
        );
      },
      meta: {
        header: {
          className: 'min-w-125px w-125px mw-125px',
        },
      },
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
            allowLeadingZeros={false}
            allowNegative={false}
          />
        );
      },
      meta: {
        header: {
          className: 'min-w-125px w-125px mw-125px',
        },
      },
    }),
  ];

  const regenerateAllVariants = () => {
    const attributes = getValues('attributes');
    const variants = generateVariants(attributes, []);

    setValue('variants', variants);
  };

  const generateRestVariants = () => {
    const addedVariants = getValues('variants');
    const attributes = getValues('attributes');

    appendVariant(generateVariants(attributes, addedVariants));
  };

  const clearAllVariants = () => {
    setValue('variants', []);
  };

  return {
    generateRestVariants,
    regenerateAllVariants,
    clearAllVariants,
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
