import { ReactNode, useState } from 'react';

import { useMutation, useStoreServiceClients } from '@vklink/grpc-api';

import { ConfirmDialog } from '@/shared/components';
import { useI18n, useToast } from '@/hooks';

type Props = {
  id: string;
  name: string;
  enabled: boolean;
  successCb?: () => void;

  render?: (props: { onClick: () => void; isLoading: boolean }) => ReactNode;
};

const EnableDisableButton = ({ enabled, id, successCb, name, render }: Props) => {
  const { t } = useI18n();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const { productClient } = useStoreServiceClients();

  const actionFn = enabled ? productClient.disableProduct : productClient.enableProduct;
  const actionKey = enabled ? 'productClient.disableProduct' : 'productClient.enableProduct';
  const { mutate, isPending, reset } = useMutation({
    mutationKey: [actionKey, id],
    mutationFn: actionFn,
  });

  const toggleConfirmDialog = () => setShow((pre) => !pre);

  const onSubmit = () => {
    setShow(false);
    mutate(
      { id },
      {
        onSuccess: () => {
          successCb && successCb();
        },
        onError: () => {
          toast.error(t('failNotification.updated'));
          reset();
        },
      }
    );
  };

  const actionText = enabled ? 'label.disable' : 'label.enable';
  return (
    <>
      {typeof render === 'function' ? (
        render({
          onClick: toggleConfirmDialog,
          isLoading: isPending,
        })
      ) : (
        <button className="btn btn-flush w-30px" onClick={toggleConfirmDialog} disabled={isPending}>
          <div className="form-check form-switch form-check-solid m-0">
            <input className="form-check-input w-30px h-20px" type="checkbox" checked={enabled} />
          </div>
        </button>
      )}

      <ConfirmDialog
        show={show}
        message={
          <span className="fs-6">
            {t('label.areYouSureTo')} {t(actionText).toLowerCase()}{' '}
            {t('label.service').toLowerCase()} <strong>{name}</strong>?
          </span>
        }
        onClose={toggleConfirmDialog}
        onCancel={toggleConfirmDialog}
        onConfirm={onSubmit}
      />
    </>
  );
};

export default EnableDisableButton;
