import { proto3 } from '@bufbuild/protobuf';

const retrieveValue = (name: string, enumObject: any): any => {
  return proto3.getEnumType(enumObject).findName(name)!.no;
};

const retrieveKey = (name: string, enumObject: any): string => {
  return enumObject[retrieveValue(name, enumObject)];
};

export const EnumUtils = {
  retrieveKey,
  retrieveValue,
};
