/* eslint-disable react-hooks/rules-of-hooks */

import dayjs from 'dayjs';

import { I18n, useMakePlural } from 'i18n-js';

import { en as enPlurals, vi as viPlurals } from 'make-plural';

import { PlainMessage, Timestamp } from '@vklink/grpc-api';

import { REPRESENTATIONS } from '@/constants';

import en from './locales/en.json';
import vi from './locales/vi.json';

export const supportedLocales = ['en', 'vi'] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export const resources = {
  en,
  vi,
};

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n(resources);

// Set the locale once at the beginning of your app.
i18n.defaultLocale = 'en';
i18n.locale = 'en';

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;

i18n.pluralization.register('en', useMakePlural({ pluralizer: enPlurals }));
i18n.pluralization.register('vi', useMakePlural({ pluralizer: viPlurals }));

i18n.missingPlaceholder = missingPlaceholder;

export { i18n };

const dateFormat = REPRESENTATIONS.format.date;
const timeFormat = REPRESENTATIONS.format.time;
const dateTimeFormat = REPRESENTATIONS.format.dateTime;

export const formatDateTime = (
  value: Timestamp | PlainMessage<Timestamp> | string | undefined | null,
  options?: {
    dateOnly?: boolean;
    timeOnly?: boolean;
  }
): string => {
  let format = dateTimeFormat;
  if (!value) {
    return '';
  }

  const date = dayjs(typeof value === 'object' ? new Timestamp(value).toDate() : value);

  if (!date.isValid()) {
    return '';
  }

  if (options) {
    if (options.dateOnly) {
      format = dateFormat;
    } else if (options.timeOnly) {
      format = timeFormat;
    }
  }

  return i18n.strftime(date.toDate(), format);
};

export const formatCurrency = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return '';
  }

  return i18n.numberToCurrency(Number(value), {
    precision: 0,
    unit: '₫',
    format: '%n%u',
    delimiter: '.',
  });
};

export const formatNumber = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return '';
  }

  return i18n.formatNumber(Number(value), {
    precision: 0,
    format: '%n%u',
    delimiter: '.',
  });
};

export const formatPercent = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return '';
  }

  return i18n.formatNumber(Number(value), {
    precision: 0,
    unit: '%',
    format: '%n%u',
    delimiter: '.',
  });
};

export const formatPhoneNumber = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null || Number.isNaN(value) || !value) {
    return '';
  }

  return `0${i18n.numberToDelimited(value, {
    delimiter: ' ',
  })}`;
};

function missingPlaceholder(_: I18n, placeholder: string): string {
  return placeholder;
}

export const formatRequestDate = (value: Date | string, options?: {format?: string}): string => {
  return dayjs(value, options).format('YYYY-MM-DD');
};
