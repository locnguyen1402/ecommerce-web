import { generatePath, useNavigate, useParams } from 'react-router-dom';

import { TextField, useForm, yupResolver, yup, FormContainer } from '@vklink/components';
import { useMutation, useQueryClient } from '@vklink/api';

import {
  FormFooter,
  OkButton,
  CancelButton,
  FormLayout,
  FormBody,
  FormHeader,
  SlugField,
} from '@/shared/components';
import { sendPostRequest, sendPutRequest } from '@/shared/http';

import { useI18n, useQueryHelpers, useToast } from '@/hooks';
import { INVENTORY_API_URLS } from '@/api';
import { idNameSchema, QUERY_KEYS } from '@/constants';

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
  const queryHelpers = useQueryHelpers();

  const isEditing = !!id;

  const {
    mutate,
    isPending: isMutating,
    reset: actionReset,
  } = useMutation<any, any, FormValues>({
    mutationKey: [isEditing ? 'update-product' : 'create-product', id],
    mutationFn: async (data) => {
      const payload: CreateProductPayload = {
        name: data.name,
        slug: data.slug,
        description: data.description,
        categories: data.categories.map((c) => c.id),
        attributes: data.attributes.map((a) => a.attributeId),
        variants: data.variants.map((v) => ({
          id: (v as any).id,
          stock: v.stock,
          price: v.price,
          values: v.values.map((vv) => ({
            productAttributeId: vv.id,
            value: vv.value,
          })),
        })),
      };

      if (isEditing) {
        return sendPutRequest(
          generatePath(INVENTORY_API_URLS.PRODUCT_DETAIL, {
            id,
          }),
          {
            id,
            ...payload,
          }
        );
      }

      return sendPostRequest<IdResponse>(INVENTORY_API_URLS.PRODUCTS, payload);
    },
    onSuccess: (data) => {
      toast.success(
        t(isEditing ? 'successfulNotification.update' : 'successfulNotification.create')
      );

      queryHelpers.invalidateListAndDetailQueries(QUERY_KEYS.product.base, id);

      goBack();
    },
    onError: (err) => {
      toast.error(t(isEditing ? 'failNotification.update' : 'failNotification.create'));
    },
    onSettled: () => {
      actionReset();
    },
  });

  const attributeSchema: yup.ObjectSchema<AttributeInCreateProduct> = yup.object({
    attributeId: yup.string().required(),
    name: yup.string().required(),
    values: yup
      .array(yup.string().required())
      .required()
      .min(1)
      .default([])
      .label(t('label.value')),
  });

  const variantSchema: yup.ObjectSchema<CreateProductVariantRequest> = yup.object({
    stock: yup.number().required(),
    price: yup.number().required(),
    values: yup
      .array()
      .of(
        yup.object({
          id: yup.string().required(),
          name: yup.string().required(),
          value: yup.string().required(),
        })
      )
      .required()
      .default([]),
  });

  const schema: yup.ObjectSchema<FormValues> = yup.object({
    name: yup.string().required().max(200).label(t('label.name')),
    slug: yup.string().max(200).label(t('label.slug')),
    description: yup.string().required().max(500).label(t('label.description')),
    categories: yup.array().of(idNameSchema).required().default([]).label(t('label.categories')),
    attributes: yup.array(attributeSchema).required().default([]).label(t('label.attributes')),
    variants: yup.array(variantSchema).required().default([]).label(t('label.variants')),
  });

  const { control, handleSubmit, getValues, setValue } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues,
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
    setValue,
  });

  const isVariantValid = (
    variant: CreateProductVariantRequest,
    attributes: AttributeInCreateProduct[]
  ) => {
    return (
      variant.stock >= 0 &&
      variant.price >= 0 &&
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

            {/* <SlugField
              control={control}
              name="slug"
              label={t('label.slug')}
              isEditing={isEditing}
              setValue={setValue}
            /> */}

            {/* {categoriesControl.field} */}

            <TextField control={control} name="description" label={t('label.description')} />
          </FormContainer>
        </FormBody>
      </FormLayout>

      <FormLayout className="mt-5 mt-lg-10">
        <FormHeader
          title={t('label.attributes')}
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
            <div className="d-flex gap-2">
              <button
                data-toggle="tooltip"
                data-placement="top"
                title="Generate rest variants"
                className="btn btn-sm btn-icon btn-bg-light btn-active-primary"
                onClick={() => variantsControl.generateRestVariants()}
              >
                <i className="bi bi-gear fs-1" />
              </button>

              <button
                data-toggle="tooltip"
                data-placement="top"
                title="Regenerate all"
                className="btn btn-sm btn-icon btn-bg-light btn-active-primary"
                onClick={() => variantsControl.regenerateAllVariants()}
              >
                <i className="bi bi-repeat fs-1" />
              </button>

              <button
                data-toggle="tooltip"
                data-placement="top"
                title="Clear all"
                className="btn btn-sm btn-icon btn-bg-light btn-active-danger"
                onClick={() => variantsControl.clearAllVariants()}
              >
                <i className="bi bi-x-circle fs-1" />
              </button>
            </div>
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
