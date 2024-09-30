import { useState } from 'react';

import { ConfirmDialog, ConfirmDialogProps } from '@/shared/components';

type DialogProps = Omit<ConfirmDialogProps, 'isOpen' | 'onClose' | 'onCancel' | 'onConfirm'>;
type ConfirmPromise = {
  resolve: (val: boolean) => void;
  config?: Partial<DialogProps>;
};

export const useConfirmDialog = (): [
  React.FC<Partial<DialogProps>>,
  (config?: Partial<DialogProps>) => Promise<boolean>,
] => {
  const [promise, setPromise] = useState<ConfirmPromise | null>(null);

  const confirm = (config?: Partial<DialogProps>) => {
    return new Promise<boolean>((resolve) => {
      setPromise({ resolve, config });
    });
  };

  const onClose = () => {
    promise?.resolve(false);
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    onClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    onClose();
  };

  const Dialog: React.FC<Partial<DialogProps>> = (dialogProps) => {
    const mergedProps = {
      ...promise?.config,
      ...dialogProps,
    };

    return (
      <ConfirmDialog
      show={!!promise}
        onClose={onClose}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title={mergedProps.title}
        message={mergedProps.message}
        {...mergedProps}
      />
    );
  };

  return [Dialog, confirm];
};
