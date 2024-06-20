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
    defaultValues: {
      ...defaultValues,
    },
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
    fields: attrFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: 'attributes',
  });
  const attributeItems = watch('attributes');
  const controlledAttributeItems = attrFields.map((field, index) => {
    return {
      ...field,
      ...(attributeItems || [])[index],
    };
  });

  const attributesControl = useAttributesControl({
    control,
    selectedAttributes: controlledAttributeItems,
    onAddAttribute: (selected) => {
      const isSelected = !!controlledAttributeItems.find((item) => item.id === selected.id);
      if (!isSelected) {
        appendAttribute(selected);
      }
    },
    onRemoveAttribute: removeAttribute,
  });

  const variantsControl = useVariantsControl({
    control,
    variants: controlledVariantItems,
    selectedAttributes: controlledAttributeItems,
    onAddVariant: () => {},
    onRemoveVariant: removeVariant,
  });

  const autoGenerateVariants = () => {
    setValue('variants', generateVariants(controlledAttributeItems));
  };

  const onSubmit = handleSubmit((data) => mutate(data));

  const goBack = () => {
    navigate(-1);
  };

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

        <FormBody>{attributesControl.attributeListComponent}</FormBody>
      </FormLayout>

      <FormLayout className="mt-5 mt-lg-10">
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
      </FormLayout>

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
