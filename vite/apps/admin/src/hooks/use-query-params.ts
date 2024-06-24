import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { deserialize, serialize } from '@vklink/api';

export type QueryParamInit = Parameters<typeof useSearchParams>[0];

export const useQueryParams = <T extends Record<string, any>>(
  defaultInit?: T
): [T, (val: Partial<T>, override?: boolean) => void] => {
  const [searchParams, setSearchParams] = useSearchParams(defaultInit);
  const [queryParams, setQueryParamsInternal] = useState(() => {
    const params = deserialize(searchParams.toString());

    return params as T;
  });

  useEffect(() => {
    setSearchParams(serialize(queryParams));
  }, [queryParams]);

  const setQueryParams = (val: Partial<T>, override?: boolean) => {
    setQueryParamsInternal((old) => {
      return {
        ...(override ? {} : old),
        ...val,
      } as T;
    });
  };

  return [queryParams as any, setQueryParams];
};
