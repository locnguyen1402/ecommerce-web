import { ReactNode } from 'react';

export type ValueType = string | number | null | undefined;

export type GetObjectValueOptions<T extends Record<string, any>> = {
  accessorKey?: keyof T;
  valueGetter?: (item: T) => ValueType;
};

export type LabelValueItemDef<TData extends Record<string, any>> = {
  label?: ReactNode;
  renderLabel?: (data: TData) => ReactNode;

  value?: keyof TData | GetObjectValueOptions<TData>;
  renderValue?: (data: TData, value: ValueType) => ReactNode;

  render?: (data: TData) => ReactNode;
};

export type LabelValueListDef<TData extends Record<string, any>> = Array<LabelValueItemDef<TData>>;
