import { GetObjectValueOptions } from './type';

export const getObjectValue = <TData extends Record<string, any>>(
  source: TData,
  options: GetObjectValueOptions<TData>
) => {
  let value: any = undefined;

  if (!!options.accessorKey) {
    value = source[options.accessorKey];
  } else if (typeof options.valueGetter === 'function') {
    value = options.valueGetter(source);
  }

  return value;
};
