import { Fragment } from 'react';

import { LabelValueItem } from '@mila/components';

import { TransLabelValueListDef } from './type';

export type LabelValueListProps<
  TData extends Record<string, any>,
  TTranslationField extends keyof TData = 'translations',
> = {
  t?: (key: string) => string;
  data: TData | null | undefined;
  subData: TData[TTranslationField][number];
  def: TransLabelValueListDef<TData, TTranslationField>;
};

const TransLabelValueList = <
  TData extends Record<string, any>,
  TTranslationField extends keyof TData = 'translations',
>({
  t,
  data,
  subData,
  def,
}: LabelValueListProps<TData, TTranslationField>) => {
  if (!data) {
    return <></>;
  }

  return (
    <>
      {def.map((item, idx) => {
        return (
          <Fragment key={idx}>
            {item.isSubLang ? (
              <LabelValueItem t={t} data={subData} def={item} />
            ) : (
              <LabelValueItem t={t} data={data} def={item} />
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export { TransLabelValueList };
