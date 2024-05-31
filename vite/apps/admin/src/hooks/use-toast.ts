import { randomId } from '@/shared/utils';
import { TOAST_DURATION } from '@/constants';
import { Toast, useStore } from '@/stores';

import { useI18n } from './use-i18n';

type DisplayToastOptions = {
  title?: string;
};

export const useToast = () => {
  const { t } = useI18n();
  const store = useStore('toastStore');

  const show = (info: Omit<Toast, 'id'>) => {
    const id = randomId();

    const toast: Toast = {
      id,
      ...info,
    };

    store.add(toast);
    setTimeout(() => store.remove(id), TOAST_DURATION);
  };

  const info = (description: string, options?: DisplayToastOptions) =>
    show({
      description,
      title: options?.title || t('notification.info'),
      type: 'info',
    });

  const success = (description: string, options?: DisplayToastOptions) =>
    show({
      description,
      title: options?.title || t('notification.success'),
      type: 'success',
    });

  const warning = (description: string, options?: DisplayToastOptions) =>
    show({
      description,
      title: options?.title || t('notification.warning'),
      type: 'warning',
    });

  const error = (description: string, options?: DisplayToastOptions) =>
    show({
      description,
      title: options?.title || t('notification.error'),
      type: 'error',
    });

  return {
    default: info,
    success,
    warning,
    error,
  };
};
