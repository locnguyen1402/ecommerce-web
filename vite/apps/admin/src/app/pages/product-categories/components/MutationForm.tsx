import { generatePath, useNavigate, useParams } from 'react-router-dom';

import {
  TextField,
  useForm,
  yupResolver,
  yup,
  FormContainer,
  TextareaField,
} from '@vklink/components';
import { useMutation } from '@vklink/api';

import {
  FormFooter,
  OkButton,
  CancelButton,
  FormLayout,
  FormBody,
  FormHeader,
  SlugField,
  ApiSearchableSelectField,
} from '@/shared/components';
import { sendPostRequest, sendPutRequest } from '@/shared/http';

import { idNameSchema } from '@/constants';
import { useI18n, useToast } from '@/hooks';
import { INVENTORY_API_URLS } from '@/api';

import { CreateProductCategoryPayload, CreateProductCategoryRequest } from '../types';

type FormValues = CreateProductCategoryRequest;

type Props = {
  defaultValues?: FormValues;
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
    mutationKey: [isEditing ? 'update-product-category' : 'create-product-category', id],
    mutationFn: (data) => {
      const payload: CreateProductCategoryPayload = {
        name: data.name,
        slug: data.slug,
        description: data.description || '',
        parentId: data.parent?.id,
      };

      if (isEditing) {
        return sendPutRequest(
          generatePath(INVENTORY_API_URLS.CATEGORY_DETAIL, {
            id,
          }),
          {
            id,
            ...payload,
          }
        );
      }

      return sendPostRequest(INVENTORY_API_URLS.CATEGORIES, payload);
    },
    onSuccess: () => {
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

  const schema: yup.ObjectSchema<FormValues> = yup.object({
    name: yup.string().required().max(200).label(t('label.name')),
    slug: yup.string().required().label(t('label.slug')),
    description: yup.string().max(500).label(t('label.description')),
    parent: idNameSchema.nullable().optional().label(t('label.parent')),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      parent: null,
    },
  });

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

            <SlugField
              control={control}
              name="slug"
              label={t('label.slug')}
              isRequired
              isEditing={isEditing}
              setValue={setValue}
            />

            <ApiSearchableSelectField
              isClearable
              label={t('label.parent')}
              control={control}
              name="parent"
              apiUrl={INVENTORY_API_URLS.CATEGORIES}
              queryKey={['product-category-parent']}
            />

            <TextareaField
              rows={3}
              control={control}
              name="description"
              label={t('label.description')}
            />
          </FormContainer>
        </FormBody>
        <FormFooter>
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
