export type Customer = {
  id: string;
  firstName: string;
  lastName?: string;
  fullName: string;
  birthDate?: string;
  email?: string;
  phoneNumber?: string;
  gender?: Gender;
};

export type CustomerContact = {
  id: string;
  /**
   * Name of the contact
   */
  name?: string;
  /**
   * Name of the person to contact
   */
  contactName: string;
  phoneNumber: string;
  note: string;
  type: AddressType;
  isDefault: boolean;
  addressInfo: CustomerContactAddress;
};

export type CustomerContactAddress = {
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
  addressLine2?: string;
  fullAddress: string;
};

export enum Gender {
  UNSPECIFIED,
  MALE,
  FEMALE,
}

export enum AddressType {
  UNSPECIFIED = 0,
  HOME = 1,
  OFFICE = 2,
}
