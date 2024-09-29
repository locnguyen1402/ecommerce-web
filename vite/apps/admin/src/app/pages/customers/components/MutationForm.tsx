import { generatePath, useNavigate, useParams } from 'react-router-dom';

import {
  TextField,
  useForm,
  yupResolver,
  yup,
  FormContainer,
  TextareaField,
  DateTimeField,
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
import { CUSTOMER_API_URLS, INVENTORY_API_URLS } from '@/api';
import {
  getEmailSchema,
  getPhoneNumberSchema,
  idNameSchema,
  QUERY_KEYS,
  REPRESENTATIONS,
} from '@/constants';

import { CreateCustomerPayload, CreateCustomerRequest } from '../types';
import { formatRequestDate } from '@/i18n';
import { Gender } from '@/api/responses';

type FormValues = CreateCustomerRequest;

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
      const payload: CreateCustomerPayload = {
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate ? formatRequestDate(data.birthDate) : undefined,
        phoneNumber: data.phoneNumber,
        email: data.email,
      };

      if (isEditing) {
        return sendPutRequest(
          generatePath(CUSTOMER_API_URLS.CUSTOMER_DETAIL, {
            id,
          }),
          {
            id,
            ...payload,
          }
        );
      }

      return sendPostRequest(CUSTOMER_API_URLS.CUSTOMERS, payload);
    },
    onSuccess: () => {
      toast.success(
        t(isEditing ? 'successfulNotification.update' : 'successfulNotification.create')
      );

      queryHelpers.invalidateListAndDetailQueries(QUERY_KEYS.customer.base, id);

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
    firstName: yup.string().required().max(200).label(t('label.firstName')),
    lastName: yup.string().max(200).label(t('label.lastName')),
    birthDate: yup.string().label(t('label.birthDate')),
    phoneNumber: getPhoneNumberSchema(t).label(t('label.phoneNumber')),
    email: getEmailSchema(t).label(t('label.email')),
    gender: yup
      .mixed<Gender>()
      .transform(Number)
      .oneOf(Object.values(Gender) as number[])
      .label(t('label.gender')),
  });

  const { control, handleSubmit, setValue } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
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
            <TextField control={control} name="firstName" label={t('label.firstName')} isRequired />

            <TextField control={control} name="lastName" label={t('label.lastName')} />

            {!isEditing && (
              <TextField control={control} name="phoneNumber" label={t('label.phoneNumber')} />
            )}

            <TextField control={control} name="email" label={t('label.email')} />

            <DateTimeField
              control={control}
              name="birthDate"
              label={t('label.birthDate')}
              options={{
                dateFormat: REPRESENTATIONS.picker.date,
              }}
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
