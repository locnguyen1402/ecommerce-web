import { useQueryClient } from '@vklink/api';

import { DETAIL_QUERY_KEY, LIST_QUERY_KEY } from '@/constants';

enum InvalidationType {
  ContainAll = 'contain-all',
  ContainAny = 'contain-any',
}

export const useQueryHelpers = () => {
  const queryClient = useQueryClient();

  const invalidateListAndDetailQueries = (baseKey: string, id?: string) => {
    queryClient.invalidateQueries({
      predicate: ({ queryKey }) => {
        return (
          queryKey.includes(baseKey) &&
          (queryKey.includes(LIST_QUERY_KEY) ||
            (queryKey.includes(DETAIL_QUERY_KEY) && (!id || queryKey.includes(id))))
        );
      },
    });
  };

  type InvalidateOptions = {
    type?: InvalidationType;
  };
  const invalidate = (queryKeys: string[], options?: InvalidateOptions) => {
    const type = options?.type || InvalidationType.ContainAll;

    queryClient.invalidateQueries({
      predicate: ({ queryKey: base }) => {
        if (type === InvalidationType.ContainAny) {
          return base.some((key) => queryKeys.includes(key as string));
        }

        return queryKeys.every((key) => base.includes(key as string));
      },
    });
  };

  return { invalidateListAndDetailQueries, invalidate };
};
