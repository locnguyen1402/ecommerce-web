import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { generatePath } from 'react-router-dom';

import { NumberTextField, useForm, yup, yupResolver } from '@mila/components';
import { KTIcon } from '@mila/metronic-core';
import { useMutation } from '@mila/api';

import { CancelButton, CellButton, OkButton } from '@/shared/components';
import { sendPutRequest } from '@/shared/http';

import { useDisclosure, useI18n, useQueryHelpers, useToast } from '@/hooks';
import { BaseNumericFormatOptions, QUERY_KEYS } from '@/constants';
import { INVENTORY_API_URLS } from '@/api';

import { ExtendProductVariantStockPayload } from '../types';

type FormValues = {
  quantity: number;
};

type Props = {
  productId: string;
  productVariantId: string;
  stock: number;
  modalTitle: string;
};

const ProductVariantExtendStockButton = ({
  stock,
  productId,
  productVariantId,
  modalTitle,
}: Props) => {
  const { t } = useI18n();
  const toast = useToast();
  const queryHelpers = useQueryHelpers();
  const { isOpen, open, close } = useDisclosure();

  const {
    mutate,
    isPending: isMutating,
    reset: actionReset,
  } = useMutation<any, any, FormValues>({
    mutationKey: [productId, productVariantId, 'extend-stock'],
    mutationFn: async (data) => {
      const payload: ExtendProductVariantStockPayload = {
        productVariantId,
        quantity: data.quantity,
      };

      return sendPutRequest(
        generatePath(INVENTORY_API_URLS.EXTEND_PRODUCT_VARIANT_STOCK, {
          id: productId,
          variantId: productVariantId,
        }),
        payload
      );
    },
    onSuccess: (data) => {
      toast.success(t('successfulNotification.save'));

      queryHelpers.invalidate([QUERY_KEYS.product.base, QUERY_KEYS.product.detail, productId]);

      close();
    },
    onError: (err) => {
      toast.error(t('failNotification.save'));
    },
    onSettled: () => {
      actionReset();
    },
  });

  const schema: yup.ObjectSchema<FormValues> = yup.object({
    quantity: yup.number().required().min(1).label(t('label.stock')),
  });

  const {
    control,
    handleSubmit,
    reset: formReset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  useEffect(() => {
    if (isOpen) {
      formReset({ quantity: 1 });
    }
  }, [isOpen]);

  return (
    <>
      <CellButton
        onClick={open}
        className="btn-active-color-primary"
        icon={<KTIcon iconName="plus-circle" className="fs-2 pe-0" />}
      >
        {stock}
      </CellButton>

      <Modal size="sm" centered show={isOpen} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NumberTextField
            {...BaseNumericFormatOptions}
            allowNegative={false}
            control={control}
            name="quantity"
            label={t('label.stock')}
          />
        </Modal.Body>
        <Modal.Footer>
          <CancelButton type="button" onClick={close}>
            {t('actions.cancel')}
          </CancelButton>
          <OkButton isLoading={isMutating} onClick={onSubmit}>
            {t('actions.increaseStock')}
          </OkButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductVariantExtendStockButton;
