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
  NumberTextField,
  TagsInput,
  TagsField,
} from '@vklink/components';
import { KTIcon } from '@vklink/metronic-core';
import { useMutation } from '@vklink/api';

import {
  FormFooter,
  OkButton,
  CancelButton,
  FormLayout,
  FormBody,
  FormHeader,
} from '@/shared/components';
import { http, sendPostRequest } from '@/shared/http';

import { useI18n, useToast } from '@/hooks';
import { INVENTORY_API_URLS } from '@/api';

import {
  CreateProductRequest,
  CreateProductPayload,
  CreateProductVariantRequest,
  AttributeInCreateProduct,
} from '../types';
import { useAttributesControl } from '../utils/use-attributes-control';
import { useVariantsControl } from '../utils/use-variants-control';
import { useCategoriesControl } from '../utils/use-categories-control';

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

  const {
    mutate,
    isPending: isMutating,
    reset: actionReset,
  } = useMutation<any, any, FormValues>({
    mutationKey: [isEditing ? 'update-product' : 'create-product', id],
    mutationFn: async (data) => {
      console.log('🚀 ~ mutationFn: ~ data:', data);
      const payload: CreateProductPayload = {
        name: data.name,
        description: data.description,
        slug: data.slug,
        categories: data.categories.map((c) => c.id),
        attributes: data.attributes.map((a) => a.attributeId),
        variants: data.variants.map((v) => ({
          stock: v.stock,
          price: v.price,
          values: v.values.map((vv) => ({
            productAttributeId: vv.id,
            value: vv.value,
          })),
        })),
      };
      console.log('🚀 ~ MutationForm ~ payload:', payload);

      return Promise.resolve(payload);

      return sendPostRequest<IdResponse>(INVENTORY_API_URLS.PRODUCTS, payload);
    },
    onSuccess: (data) => {
      toast.success(
        t(isEditing ? 'successfulNotification.update' : 'successfulNotification.create')
      );

      goBack();
    },
    onError: (err) => {
      toast.error(t(isEditing ? 'failNotification.update' : 'failNotification.create'));
    },
    onSettled: () => {
      actionReset();
    },
  });

  // const schema: yup.ObjectSchema<FormValues> = yup.object({
  //   attributes: yup.array().of(
  //     yup.object({
  //       values: yup.string().required(),
  //     })
  //   ),
  // });

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    // resolver: yupResolver(schema),
    // defaultValues: {
    //   ...defaultValues,
    // },
  });

  const categoriesControl = useCategoriesControl({
    control,
  });

  const attributesControl = useAttributesControl({
    control,
  });

  const variantsControl = useVariantsControl({
    control,
    getValues,
  });

  const isVariantValid = (
    variant: CreateProductVariantRequest,
    attributes: AttributeInCreateProduct[]
  ) => {
    return (
      variant.stock >= 0 &&
      variant.price > 0 &&
      !!variant.values.length &&
      variant.values.length === attributes.length &&
      variant.values.every((variantAttribute) => {
        const attribute = attributes.find((attr) => attr.attributeId === variantAttribute.id);

        return attribute ? attribute.values.includes(variantAttribute.value) : false;
      })
    );
  };

  const getFormState = (): {
    isVariantsValid: boolean;
    isAttributesValid: boolean;
  } => {
    const attributes = getValues('attributes');
    const variants = getValues('variants');

    if (!attributes || !variants) return { isAttributesValid: false, isVariantsValid: false };

    const isAttributesValid = attributes.every((a) => !!a.values.length);
    const isVariantsValid = variants.every((v) => isVariantValid(v, attributes));

    return {
      isAttributesValid,
      isVariantsValid,
    };
  };

  const onSubmit = handleSubmit((data) => {
    const { isAttributesValid, isVariantsValid } = getFormState();

    if (!isAttributesValid) {
      toast.error(t('errorMessages.someAttributesInvalid'));
      return;
    }
    if (!isVariantsValid) {
      toast.error(t('errorMessages.someProductVariantsInvalid'));
      return;
    }

    mutate(data);
  });

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <FormLayout>
        <FormHeader title={t('label.generalInformation')} />
        <FormBody>
          <FormContainer size="md" variant="outlined">
            <TextField control={control} name="name" label={t('label.name')} isRequired />

            <TextField control={control} name="slug" label={t('label.slug')} isRequired />

            {categoriesControl.field}

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
              onClick={() => variantsControl.generateRestVariants()}
            >
              <i className="bi bi-copy fs-1" />
            </button>
          }
        />

        <FormBody>{variantsControl.variantListComponent}</FormBody>
      </FormLayout>

      <FormLayout className="mt-5 mt-lg-10">
        <FormFooter className="border-top-0">
          <CancelButton onClick={goBack}>{t('actions.cancel')}</CancelButton>
          <OkButton isLoading={isMutating} onClick={onSubmit}>
            {t('actions.save')}
          </OkButton>
        </FormFooter>
      </FormLayout>
    </>
  );
};

export default MutationForm;
