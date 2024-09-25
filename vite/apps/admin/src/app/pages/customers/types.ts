import { Gender } from '@/api/responses';
import { PaginatedQueryParams } from '@/shared/types';

export type CreateCustomerRequest = {
  firstName: string;
  lastName?: string;
  birthDate?: string;
  gender?: Gender;
  email?: string;
  phoneNumber?: string;
};

export type UpdateCustomerRequest = CreateCustomerRequest & {
  id: string;
};

export type CreateCustomerPayload = {
  firstName: string;
  lastName?: string;
  birthDate?: string;
  gender?: Gender;
  email?: string;
  phoneNumber?: string;
};

export type CustomerListQuery = PaginatedQueryParams;
