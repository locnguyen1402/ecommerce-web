import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { generatePath } from 'react-router-dom';

import { TextField, useForm, yupResolver, yup, FormContainer } from '@vklink/components';
import { useMutation } from '@vklink/api';

import { OkButton, CancelButton } from '@/shared/components';
import { sendPostRequest, sendPutRequest } from '@/shared/http';

import { useI18n, useToast } from '@/hooks';
import { INVENTORY_API_URLS } from '@/api';

import { CreateProductAttributeRequest } from '../types';

type FormValues = CreateProductAttributeRequest;

type Props = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: FormValues;
  successCallback?: () => void;
};

const MutationModal = ({ defaultValues, isOpen, onClose, id, successCallback }: Props) => {
  const { t } = useI18n();
  const toast = useToast();

  const isEditing = !!id;

  const {
    mutate,
    isPending: isMutating,
    reset: actionReset,
  } = useMutation<any, any, FormValues>({
    mutationKey: [isEditing ? 'update-product-attribute' : 'create-product-attribute', id],
    mutationFn: (payload) => {
      if (isEditing) {
        return sendPutRequest(
          generatePath(INVENTORY_API_URLS.PRODUCT_ATTRIBUTE_DETAIL, {
            id,
          }),
          {
            id,
            ...payload,
          }
        );
      }

      return sendPostRequest(INVENTORY_API_URLS.PRODUCT_ATTRIBUTES, payload);
    },
    onSuccess: () => {
      toast.success(
        t(isEditing ? 'successfulNotification.update' : 'successfulNotification.create')
      );

      successCallback && successCallback();
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
  });

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = handleSubmit((data) => mutate(data));

  useEffect(() => {
    if (isOpen) {
      reset({
        name: defaultValues?.name || '',
      });
    }
  }, [isOpen]);

  return (
    <Modal centered show={isOpen} onHide={onClose}>
      <form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{t(isEditing ? 'actions.update' : 'actions.create')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            orientation="vertical"
            control={control}
            name="name"
            label={t('label.name')}
            isRequired
          />
        </Modal.Body>
        <Modal.Footer>
          <CancelButton type="button" onClick={onClose}>
            {t('actions.cancel')}
          </CancelButton>
          <OkButton type="submit" isLoading={isMutating} onClick={onSubmit}>
            {t(isEditing ? 'actions.save' : 'actions.create')}
          </OkButton>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default MutationModal;
