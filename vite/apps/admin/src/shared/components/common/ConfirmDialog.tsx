import { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';

import { useI18n } from '@/hooks';
import { CancelButton, OkButton } from '../button';

type Props = {
  show: boolean;
  onClose: () => void;

  onCancel?: () => void;
  onConfirm: () => void;

  title?: ReactNode;
  message: ReactNode;

  cancelText?: string;
  confirmText?: string;
};

const ConfirmDialog = ({
  show,
  title,
  message,
  onClose,
  onConfirm,
  onCancel,
  cancelText,
  confirmText,
}: Props) => {
  const { t } = useI18n();
  return (
    <>
      <Modal centered show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title || t('actions.confirm')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          {!!onCancel && (
            <CancelButton onClick={onCancel}>{cancelText || t('actions.cancel')}</CancelButton>
          )}
          <OkButton onClick={onConfirm}>{confirmText || t('actions.confirm')}</OkButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export type ConfirmDialogProps = Props;
export { ConfirmDialog };
