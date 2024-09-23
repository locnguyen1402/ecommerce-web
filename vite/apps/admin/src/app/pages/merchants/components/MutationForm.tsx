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
} from '@/shared/components';
import { sendPostRequest, sendPutRequest } from '@/shared/http';

import { useI18n, useQueryHelpers, useToast } from '@/hooks';
import { INVENTORY_API_URLS } from '@/api';
import { idNameSchema, QUERY_KEYS } from '@/constants';

import { CreateMerchantPayload, CreateMerchantRequest } from '../types';
import { useCategoriesControl } from '../utils/use-categories-control';

type FormValues = CreateMerchantRequest;

type Props = {
  defaultValues?: FormValues;
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
    mutationKey: [isEditing ? 'update-merchant' : 'create-merchant', id],
    mutationFn: (data) => {
      const payload: CreateMerchantPayload = {
        name: data.name,
        slug: data.slug,
        description: data.description || '',
        categoryIds: data.categories.map((item) => item.id),
      };

      if (isEditing) {
        return sendPutRequest(
          generatePath(INVENTORY_API_URLS.MERCHANT_DETAIL, {
            id,
          }),
          {
            id,
            ...payload,
          }
        );
      }

      return sendPostRequest(INVENTORY_API_URLS.MERCHANTS, payload);
    },
    onSuccess: () => {
      toast.success(
        t(isEditing ? 'successfulNotification.update' : 'successfulNotification.create')
      );

      queryHelpers.invalidateListAndDetailQueries(QUERY_KEYS.merchant.base, id!);

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
    slug: yup.string().max(200).label(t('label.slug')),
    description: yup.string().max(500).label(t('label.description')),
    categories: yup.array().of(idNameSchema).required().default([]).label(t('label.categories')),
  });

  const { control, handleSubmit, setValue } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const categoriesControl = useCategoriesControl({
    control,
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

            {/* <SlugField
              control={control}
              name="slug"
              label={t('label.slug')}
              isEditing={isEditing}
              setValue={setValue}
            /> */}

            <TextareaField
              rows={3}
              control={control}
              name="description"
              label={t('label.description')}
            />

            {categoriesControl.field}
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
