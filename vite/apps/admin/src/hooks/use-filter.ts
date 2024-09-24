import { useState } from 'react';

export const useFilter = <T extends Record<string, any>>(
  initial: T
): [T, (val: Partial<T>, override?: boolean) => void] => {
  const [filter, setFilter] = useState(initial);

  const onSetFilter = (val: Partial<T>, override?: boolean) => {
    setFilter((old) => {
      return {
        ...(override ? {} : old),
        ...val,
      } as T;
    });
  };

  return [filter, onSetFilter];
};
