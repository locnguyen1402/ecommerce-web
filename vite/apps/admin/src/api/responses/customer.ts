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

export enum Gender {
  UNSPECIFIED,
  MALE,
  FEMALE,
}
