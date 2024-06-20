import { useNavigate, useParams } from 'react-router-dom';

import {
  TextField,
  useForm,
  yupResolver,
  yup,
  FormContainer,
  DateTimeField,
  SelectField,
  FileUploadField,
  SearchableSelectField,
  useFieldArray,
  DataTable,
  createColumnHelper,
} from '@vklink/components';
import { useMutation } from '@vklink/grpc-api';

import {
  FormFooter,
  OkButton,
  CancelButton,
  FormLayout,
  FormBody,
  FormHeader,
} from '@/shared/components';

import { useI18n, usePaginationQuery, useToast } from '@/hooks';
import { INVENTORY_API_URLS } from '@/api';
import { FIRST_PAGE_INDEX } from '@/constants';

import { useAttributesControl } from '../utils/use-attributes-control';
import { useVariantsControl } from '../utils/use-variants-control';
import { generateVariants } from '../utils';
import { KTIcon } from '@vklink/metronic-core';

type FormValues = CreateProductRequest;

type Props = {
  defaultValues?: Partial<FormValues>;
};

const MutationForm = ({ defaultValues }: Props) => {
  const { t } = useI18n();
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const isEditing = !!id;

  const { mutate } = useMutation<any, any, FormValues>({
    mutationKey: ['create-product'],
    mutationFn: (data) => {
      console.log('🚀 ~ MutationForm ~ data:', data);
      return Promise.resolve(data);
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    // defaultValues: {
    //   ...defaultValues,
    // },
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: 'variants',
  });
  const variantItems = watch('variants');
  const controlledVariantItems = variantFields.map((field, index) => {
    return {
      ...field,
      ...variantItems[index],
    };
  });

  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: 'productAttributes',
  });
  const attributeItems = watch('productAttributes');
  const controlledAttributeItems = attributeFields.map((field, index) => {
    return {
      ...field,
      ...attributeItems[index],
    };
  });

  const attributesControl = useAttributesControl({
    control,
    selectedAttributes: controlledAttributeItems,
    onAddAttribute: (selected) => {
      const isSelected = attributeItems.some((item) => item.attributeId === selected.attributeId);
      if (!isSelected) {
        appendAttribute(selected);
      }
    },
    onRemoveAttribute: removeAttribute,
  });

  // const variantsControl = useVariantsControl({
  //   control,
  //   variants: controlledVariantItems,
  //   selectedAttributes: controlledAttributeItems,
  //   onAddVariant: () => {},
  //   onRemoveVariant: removeVariant,
  // });

  const autoGenerateVariants = () => {
    // setValue('variants', generateVariants(controlledAttributeItems));
  };

  const onSubmit = handleSubmit((data) => mutate(data));

  const goBack = () => {
    navigate(-1);
  };

  const columnHelper = createColumnHelper<AttributeInCreateProduct>();
  const columns = [
    columnHelper.accessor('attributeId', {
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
            name={`productAttributes.${index}.values`}
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
            // onRemoveAttribute(info.row.index);
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

  return (
    <>
      <FormLayout>
        <FormHeader title={t('label.generalInformation')} />
        <FormBody>
          <FormContainer>
            <TextField control={control} name="name" label={t('label.name')} isRequired />

            <TextField control={control} name="slug" label={t('label.slug')} isRequired />

            <TextField control={control} name="description" label={t('label.description')} />
          </FormContainer>
        </FormBody>
      </FormLayout>

      <FormLayout className="mt-5 mt-lg-10">
        <FormHeader
          title={t('label.attribute')}
          action={
            <div className="min-w-md-350px min-w-lg-450px">{attributesControl.searchInput}</div>
          }
        />

        <FormBody>
          {attributesControl.test}
          {attributesControl.attributeListComponent}
          {/* <DataTable
            columns={columns}
            data={controlledAttributeItems}
            pageIndex={0}
            pageSize={controlledAttributeItems.length}
            itemCount={controlledAttributeItems.length}
            pageCount={1}
            hidePagination
          /> */}
        </FormBody>
      </FormLayout>

      {/* <FormLayout className="mt-5 mt-lg-10">
        <FormHeader
          title={t('label.variants')}
          action={
            <button
              className="btn btn-sm btn-icon btn-bg-light btn-active-primary"
              onClick={autoGenerateVariants}
            >
              <i className="bi bi-copy fs-1" />
            </button>
          }
        />

        <FormBody>{variantsControl.variantListComponent}</FormBody>
      </FormLayout> */}

      <FormLayout className="mt-5 mt-lg-10">
        <FormFooter>
          <CancelButton onClick={goBack}>{t('actions.cancel')}</CancelButton>
          <OkButton onClick={onSubmit}>{t('actions.save')}</OkButton>
        </FormFooter>
      </FormLayout>
    </>
  );
};

export default MutationForm;
