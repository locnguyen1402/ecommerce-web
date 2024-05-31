import { useEffect, useState } from 'react';

import { TranslateOptions } from 'i18n-js';

import { i18n } from '@/i18n';
import en from '@/i18n/locales/en.json';

export const useI18n = () => {
  const [locale, setLocale] = useState(i18n.locale);

  const t = <T = string>(scope: Leaves<typeof en>, options?: TranslateOptions) =>
    i18n.t<T>(scope, options);

  const changeLocale = (newLocale: string) => {
    i18n.locale = newLocale;
  };

  useEffect(() => {
    const unsubscribe = i18n.onChange(() => {
      setLocale(i18n.locale);
    });

    return unsubscribe;
  }, []);

  return {
    t,
    changeLocale,
    /**
     * current locale
     */
    locale,
  };
};
