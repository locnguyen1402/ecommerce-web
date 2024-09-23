import { DETAIL_QUERY_KEY, LIST_QUERY_KEY } from '@/constants';
import { useQueryClient } from '@vklink/api';

export const useQueryHelpers = () => {
  const queryClient = useQueryClient();

  const invalidateListAndDetailQueries = (baseKey: string, id: string) => {
    queryClient.invalidateQueries({
      predicate: ({ queryKey }) => {
        return (
          queryKey.includes(baseKey) &&
          (queryKey.includes(LIST_QUERY_KEY) ||
            (queryKey.includes(DETAIL_QUERY_KEY) && queryKey.includes(id)))
        );
      },
    });
  };

  return { invalidateListAndDetailQueries };
};
