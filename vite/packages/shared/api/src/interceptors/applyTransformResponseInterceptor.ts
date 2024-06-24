import { AxiosError, AxiosResponse } from 'axios';

import { PaginationInfo, Response, ResponseWithPagination } from '../common';
import { HttpInstance } from '../http';

const HEADER_PAGINATION_KEY = 'X-Pagination';

export const getPaginationInfo = (headers: AxiosResponse['headers']): PaginationInfo | null => {
  let paginationInfo: PaginationInfo | null = null;
  const paginationInHeader =
    headers[HEADER_PAGINATION_KEY] || headers[HEADER_PAGINATION_KEY.toLowerCase()];

  if (paginationInHeader) {
    try {
      paginationInfo = JSON.parse(paginationInHeader);
    } catch (error) {
      console.error(error);
    }
  }

  return paginationInfo;
};

export const applyTransformResponseInterceptor = (instance: HttpInstance) => {
  return instance.interceptors.response.use(
    (response) => {
      let data: Response<any> | ResponseWithPagination<any> = {
        content: response.data,
      };

      switch (response.config.responseType) {
        case 'blob':
        case 'arraybuffer': {
          // TODO: implement
          break;
        }

        default: {
          const paginationInfo = getPaginationInfo(response.headers);

          if (!!paginationInfo) {
            data = {
              ...data,
              meta: {
                pagination: paginationInfo,
              },
            };
          }

          break;
        }
      }

      return {
        ...response,
        data,
      };
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
};
