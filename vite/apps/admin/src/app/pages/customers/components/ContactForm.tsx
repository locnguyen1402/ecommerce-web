import { ReactNode } from 'react';
import { generatePath } from 'react-router-dom';

import {
  TextField,
  useForm,
  yupResolver,
  yup,
  FormContainer,
  TextareaField,
  DateTimeField,
  CheckboxField,
  SelectField,
} from '@vklink/components';
import { useMutation } from '@vklink/api';

import { sendPostRequest, sendPutRequest } from '@/shared/http';
import { LocationField } from '@/shared/components';
import { useI18n, useQueryHelpers, useToast } from '@/hooks';
import { AddressTypeOptions, getPhoneNumberSchema, QUERY_KEYS } from '@/constants';
import { AddressType } from '@/api/responses';
import { CATALOG_API_URLS, CUSTOMER_API_URLS } from '@/api';

import { CreateCustomerContactPayload, CreateCustomerContactRequest } from '../types';
import { locationSchema } from '../utils';

type FormValues = CreateCustomerContactRequest;

type Props = {
  customerId?: string;
  contactId?: string;
  defaultValues?: FormValues;
  children: (props: { onSubmit: () => void; isMutating: boolean; form: ReactNode }) => ReactNode;
  successCallback?: () => void;
};

const ContactForm = ({
  customerId,
  contactId,
  defaultValues,
  successCallback,
  children,
}: Props) => {
  const { t } = useI18n();
  const toast = useToast();
  const queryHelpers = useQueryHelpers();

  const isEditing = !!contactId;

  const {
    mutate,
    isPending: isMutating,
    reset: actionReset,
  } = useMutation<any, any, FormValues>({
    mutationKey: [
      customerId,
      isEditing ? 'update-customer-contact' : 'create-customer-contact',
      contactId,
    ],
    mutationFn: (data) => {
      const payload: CreateCustomerContactPayload = {
        customerId: customerId!,
        name: data.name,
        contactName: data.contactName,
        phoneNumber: data.phoneNumber,
        type: data.type ? data.type : AddressType.UNSPECIFIED,
        isDefault: data.isDefault,
        notes: data.notes,
        addressInfo: {
          provinceId: data.province!.id,
          provinceName: data.province!.name,
          provinceCode: data.province!.code,
          districtId: data.district!.id,
          districtName: data.district!.name,
          districtCode: data.district!.code,
          wardId: data.ward!.id,
          wardName: data.ward!.name,
          wardCode: data.ward!.code,
          addressLine1: data.addressLine1,
        },
      };

      if (isEditing) {
        return sendPutRequest(
          generatePath(CUSTOMER_API_URLS.CONTACT_DETAIL, {
            id: customerId,
            contactId,
          }),
          {
            id: contactId,
            ...payload,
          }
        );
      }

      return sendPostRequest(
        generatePath(CUSTOMER_API_URLS.CONTACTS, {
          id: customerId,
        }),
        payload
      );
    },
    onSuccess: () => {
      toast.success(
        t(isEditing ? 'successfulNotification.update' : 'successfulNotification.create')
      );

      queryHelpers.invalidate([
        QUERY_KEYS.customer.base,
        QUERY_KEYS.customer.detail,
        customerId!,
        QUERY_KEYS.customerContact.base,
        QUERY_KEYS.customerContact.list,
      ]);

      successCallback?.();
    },
    onError: (err) => {
      toast.error(t(isEditing ? 'failNotification.update' : 'failNotification.create'));
    },
    onSettled: () => {
      actionReset();
    },
  });

  const schema: yup.ObjectSchema<FormValues> = yup.object({
    name: yup.string().max(100).label(t('label.name')),
    contactName: yup.string().required().max(100).label(t('label.contactName')),
    phoneNumber: getPhoneNumberSchema(t).required().label(t('label.phoneNumber')),
    isDefault: yup.boolean(),
    type: yup
      .mixed<AddressType>()
      .transform(Number)
      .oneOf(Object.values(AddressType) as number[])
      .label(t('label.addressType')),
    province: locationSchema.nullable().required().label(t('label.province')),
    district: locationSchema.nullable().required().label(t('label.district')),
    ward: locationSchema.nullable().required().label(t('label.ward')),
    addressLine1: yup.string().required().max(100).label(t('label.addressLine1')),
    notes: yup.string().max(150).optional().label(t('label.notes')),
  });

  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || {
      isDefault: false,
    },
  });
  const selectedProvince = watch('province');
  const selectedDistrict = watch('district');

  const selectedProvinceId = selectedProvince?.id;
  const selectedDistrictId = selectedDistrict?.id;

  const onSubmit = handleSubmit((data) => mutate(data));

  const form = (
    <>
      {/* <TextField name="name" control={control} label={t('label.name')} /> */}

      <TextField isRequired name="contactName" control={control} label={t('label.contactName')} />

      <TextField isRequired name="phoneNumber" control={control} label={t('label.phoneNumber')} />

      <CheckboxField control={control} name="isDefault" label={t('label.default')} />

      <SelectField
        isRequired
        control={control}
        name="type"
        label={t('label.addressType')}
        placeholder="Select address type"
        options={[
          {
            label: 'Select...',
            value: undefined,
            disabled: true,
          },
          ...AddressTypeOptions.map(
            (item) =>
              ({
                label: t(item.label as any),
                value: item.value,
              }) as any
          ),
        ]}
      />

      <LocationField
        apiUrl={CATALOG_API_URLS.PROVINCES}
        name="province"
        control={control}
        label={t('label.province')}
        queryKey={['provinceClient.getProvinces', 'all']}
        onChange={(value) => {
          if (value && value.id !== selectedProvinceId) {
            setValue('district', null);
            setValue('ward', null);
          }
        }}
        isRequired
      />

      <LocationField
        apiUrl={
          selectedProvinceId
            ? generatePath(CATALOG_API_URLS.DISTRICTS, {
                id: selectedProvinceId,
              })
            : undefined
        }
        name="district"
        control={control}
        label={t('label.district')}
        queryKey={['districtClient.getDistricts', 'all']}
        dependOn={{
          label: 'ProvinceId',
          value: selectedProvinceId,
        }}
        onChange={(value) => {
          if (value && value.id !== selectedDistrictId) {
            setValue('ward', null);
          }
        }}
        enabled={!!selectedProvinceId}
        isRequired
      />

      <LocationField
        apiUrl={
          selectedDistrictId
            ? generatePath(CATALOG_API_URLS.WARDS, { id: selectedDistrictId })
            : undefined
        }
        name="ward"
        control={control}
        label={t('label.ward')}
        queryKey={['wardClient.getWards', 'all']}
        dependOn={{
          label: 'DistrictId',
          value: selectedDistrictId,
        }}
        enabled={!!selectedDistrictId}
        isRequired
      />

      <TextField isRequired name="addressLine1" control={control} label={t('label.addressLine1')} />
    </>
  );

  return (
    <>
      {children({
        onSubmit,
        isMutating,
        form,
      })}
    </>
  );
};

export default ContactForm;
