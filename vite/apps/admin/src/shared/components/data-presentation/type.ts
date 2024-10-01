import { ReactNode } from 'react';

import { GetObjectValueOptions, ValueType } from '@mila/components';

type GetTransItemType<TData extends Record<string, any>, TTranslationField extends keyof TData> =
  TData[TTranslationField] extends Array<infer TTranslationObject>
    ? TTranslationObject extends Record<string, any>
      ? TTranslationObject
      : never
    : never;

export type TransLabelValueItemDef<
  TData extends Record<string, any>,
  TTranslationField extends keyof TData,
  TTransItem extends GetTransItemType<TData, TTranslationField> = GetTransItemType<
    TData,
    TTranslationField
  >,
> =
  | {
      label?: ReactNode;
      renderLabel?: (data: TData) => ReactNode;

      value?: keyof TData | GetObjectValueOptions<TData>;
      renderValue?: (data: TData, value: ValueType) => ReactNode;

      render?: (data: TData) => ReactNode;

      isSubLang?: false;
    }
  | {
      label?: ReactNode;
      renderLabel?: (data: TTransItem) => ReactNode;

      value?: keyof TTransItem | GetObjectValueOptions<TTransItem>;
      renderValue?: (data: TTransItem, value: ValueType) => ReactNode;

      render?: (data: TTransItem) => ReactNode;

      isSubLang: true;
    };

export type TransLabelValueListDef<
  TData extends Record<string, any>,
  TTranslationField extends keyof TData = 'translations',
> = Array<TransLabelValueItemDef<TData, TTranslationField>>;
