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
  /**
   * Name of the contact
   */
  name?: string;
  /**
   * Name of the person to contact
   */
  contactName: string;
  phoneNumber: string;
  type?: AddressType;
  isDefault?: boolean;
  province: AdministrativeUnit | null;
  district: AdministrativeUnit | null;
  ward: AdministrativeUnit | null;
  addressLine1: string;
  // addressLine2?: string;
  notes?: string;
};

export type CreateCustomerContactPayload = {
  customerId: string;
  /**
   * Name of the contact
   */
  name?: string;
  /**
   * Name of the person to contact
   */
  contactName: string;
  phoneNumber: string;
  type?: AddressType;
  isDefault?: boolean;
  notes?: string;
  addressInfo: {
    provinceId: string;
    provinceName: string;
    provinceCode: string;
    districtId: string;
    districtName: string;
    districtCode: string;
    wardId: string;
    wardName: string;
    wardCode: string;
    addressLine1: string;
    // addressLine2?: string;
  };
};

export type CustomerListQuery = PaginatedQueryParams;
