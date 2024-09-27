import { AddressType, Gender } from '@/api/responses';
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

export type AdministrativeUnit = {
  id: string;
  name: string;
  code: string;
};

export type CreateCustomerContactRequest = {
  type?: AddressType;
  contactName: string;
  phoneNumber: string;
  isDefault?: boolean;
  province: AdministrativeUnit;
  district: AdministrativeUnit;
  ward: AdministrativeUnit;
  addressLine1: string;
  addressLine2?: string;
  note?: string;
};

export type CustomerListQuery = PaginatedQueryParams;
