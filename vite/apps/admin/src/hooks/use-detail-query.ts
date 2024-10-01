import { useQuery, Response } from '@mila/api';

import { sendGetRequest } from '@/shared/http';

type UseDetailQueryOptions = {
  enabled?: boolean;
  queryKey: any[];
};

export const useDetailQuery = <T extends Record<string, any>>(
  url: string,
  { queryKey, enabled }: UseDetailQueryOptions
) => {
  const { data, isLoading, isRefetching, refetch } = useQuery({
    enabled,
    queryKey,
    queryFn: async () => {
      const response = await sendGetRequest<T>(url);

      return response.data.content;
    },
  });

  return {
    data,
    isLoading,
    isRefetching,
    refetch,
  };
};
