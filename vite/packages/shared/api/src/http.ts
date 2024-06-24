import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

export type HttpInstance = AxiosInstance;

export type CreateHttpInstanceOptions = Omit<CreateAxiosDefaults<any>, 'baseURL'>;

export const createHttpInstance = (
  baseURL: string,
  options?: CreateHttpInstanceOptions
): HttpInstance => {
  return axios.create({
    ...options,
    baseURL,
  });
};
