import { ReactNode, useMemo } from 'react';

import reactStringReplace from 'react-string-replace';
import { TranslateOptions } from 'i18n-js';

import { useI18n } from '@/hooks';
import { i18n } from '@/i18n';


type Props = {
  message: string;
  options: TranslateOptions;
};

export const Trans = ({ message, options }: Props) => {
  const { locale } = useI18n();

  const transformed = useMemo(() => {
    options = Object.keys(options).reduce((buffer, key) => {
      buffer[i18n.transformKey(key)] = options[key];
      return buffer;
    }, {} as TranslateOptions);
    const matches = message.match(i18n.placeholder);

    if (!matches) {
      return message;
    }

    let transformedMessage: string | ReactNode[] = message;
    while (matches.length) {
      const placeholder = matches.shift() as string;
      const name = placeholder.replace(i18n.placeholder, '$1');

      try {
        transformedMessage = reactStringReplace(
          transformedMessage,
          placeholder,
          () => options[name]
        );
      } catch (err) {}
    }

    return transformedMessage;
  }, [message, options, locale]);

  return transformed;
};
