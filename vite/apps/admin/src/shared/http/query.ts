import { http } from './instance';

export const getPaginatedList = async <T>(url: string) => {
  const response = await http.get<T[]>(url);

  return response.data;
};
