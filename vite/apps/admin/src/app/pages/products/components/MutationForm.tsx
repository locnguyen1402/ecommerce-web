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
import { http } from '@/shared/http';

import { useI18n, usePaginationQuery, useToast } from '@/hooks';
import { INVENTORY_API_URLS } from '@/api';
import { BaseNumericFormatOptions, FIRST_PAGE_INDEX } from '@/constants';

import { CreateProductRequest, CreateProductPayload } from '../types';
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

  const { mutate, isPending: isMutating } = useMutation<IdResponse, any, FormValues>({
    mutationKey: ['create-product'],
    mutationFn: (data) => {
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

      return http.post(INVENTORY_API_URLS.PRODUCTS, payload);
    },
    onSuccess: (data) => {
      console.log('🚀 ~ MutationForm ~ data:', data);
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

  const onSubmit = handleSubmit((data) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
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
