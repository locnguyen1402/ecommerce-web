import { useState } from 'react';
import { generatePath } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import { useMutation } from '@mila/api';

import { CancelButton, OkButton, FilteredProductsSelectionTable } from '@/shared/components';
import { sendPutRequest } from '@/shared/http';
import { INVENTORY_API_URLS } from '@/api';
import { RemoveProductsFromCollectionPayload, ShopCollection } from '@/api/responses';
import { useI18n, useToast } from '@/hooks';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  collection?: ShopCollection | null;
  successCallback?: () => void;
};

const RemoveProductsModal = ({ isOpen, onClose, collection, successCallback }: Props) => {
  const { t } = useI18n();
  const toast = useToast();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const {
    mutate: onSubmit,
    isPending: isMutating,
    reset: actionReset,
  } = useMutation<any, any, any>({
    mutationKey: ['remove-products-from-collection', collection?.id],
    mutationFn: () => {
      const payload: RemoveProductsFromCollectionPayload = {
        shopCollectionId: collection!.id,
        productIds: [...new Set(selectedIds)],
      };

      return sendPutRequest(
        generatePath(INVENTORY_API_URLS.SHOP_COLLECTION_REMOVE_PRODUCTS, {
          id: collection!.id,
        }),
        payload
      );
    },
    onSuccess: () => {
      toast.success(t('successfulNotification.save'));
      onClose();

      successCallback?.();
    },
    onError: (err) => {
      toast.error(t('failNotification.save'));
    },
    onSettled: () => {
      actionReset();
    },
  });

  return (
    <Modal size="lg" centered show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{collection?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FilteredProductsSelectionTable
          shopCollectionIds={[collection?.id ? collection.id : ''].filter(Boolean)}
          onChange={setSelectedIds}
        />
      </Modal.Body>
      <Modal.Footer>
        <CancelButton type="button" onClick={onClose}>
          {t('actions.cancel')}
        </CancelButton>
        <OkButton disabled={!selectedIds.length} isLoading={isMutating} onClick={onSubmit}>
          {t('actions.removeProducts')} {selectedIds.length > 0 ? `(${selectedIds.length})` : ''}
        </OkButton>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveProductsModal;
