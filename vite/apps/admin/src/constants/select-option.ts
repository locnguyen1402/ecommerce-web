import { AddressType, Gender } from '@/api/responses';

export const GenderOptions: Option[] = [
  { label: 'gender.unspecified', value: Gender.UNSPECIFIED },
  { label: 'gender.male', value: Gender.MALE },
  { label: 'gender.female', value: Gender.FEMALE },
];

export const AddressTypeOptions: Option[] = [
  { label: 'addressType.unspecified', value: AddressType.UNSPECIFIED },
  { label: 'addressType.home', value: AddressType.HOME },
  { label: 'addressType.office', value: AddressType.OFFICE },
];
