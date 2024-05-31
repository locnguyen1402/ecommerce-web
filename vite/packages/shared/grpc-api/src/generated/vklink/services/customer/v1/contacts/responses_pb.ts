// @generated by protoc-gen-es v1.8.0 with parameter "target=ts,import_extension=none"
// @generated from file vklink/services/customer/v1/contacts/responses.proto (package vklink.customer.api.v1.contacts.responses, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, StringValue } from "@bufbuild/protobuf";
import { AddressType } from "./enums_pb";
import { AddressResponse } from "../../../../libs/common/responses/address_response_pb";
import { PagingInfoResponse } from "../../../../libs/common/responses/paging_info_response_pb";

/**
 * @generated from message vklink.customer.api.v1.contacts.responses.ContactResponse
 */
export class ContactResponse extends Message<ContactResponse> {
  /**
   * data fields: from 1 to 50
   *
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: vklink.customer.api.v1.contacts.responses.AddressType type = 2;
   */
  type = AddressType.UNSPECIFIED;

  /**
   * @generated from field: string name = 3;
   */
  name = "";

  /**
   * @generated from field: string contactName = 4;
   */
  contactName = "";

  /**
   * @generated from field: string phoneNumber = 5;
   */
  phoneNumber = "";

  /**
   * @generated from field: google.protobuf.StringValue notes = 6;
   */
  notes?: string;

  /**
   * @generated from field: bool isDefault = 7;
   */
  isDefault = false;

  /**
   * relationship fields: from 51 to 60
   *
   * @generated from field: string customerId = 51;
   */
  customerId = "";

  /**
   * @generated from field: vklink.common.responses.AddressResponse address = 52;
   */
  address?: AddressResponse;

  constructor(data?: PartialMessage<ContactResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.customer.api.v1.contacts.responses.ContactResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "type", kind: "enum", T: proto3.getEnumType(AddressType) },
    { no: 3, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "contactName", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "phoneNumber", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "notes", kind: "message", T: StringValue },
    { no: 7, name: "isDefault", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 51, name: "customerId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 52, name: "address", kind: "message", T: AddressResponse },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ContactResponse {
    return new ContactResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ContactResponse {
    return new ContactResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ContactResponse {
    return new ContactResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ContactResponse | PlainMessage<ContactResponse> | undefined, b: ContactResponse | PlainMessage<ContactResponse> | undefined): boolean {
    return proto3.util.equals(ContactResponse, a, b);
  }
}

/**
 * @generated from message vklink.customer.api.v1.contacts.responses.SingleContactResponse
 */
export class SingleContactResponse extends Message<SingleContactResponse> {
  /**
   * @generated from field: vklink.customer.api.v1.contacts.responses.ContactResponse value = 1;
   */
  value?: ContactResponse;

  constructor(data?: PartialMessage<SingleContactResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.customer.api.v1.contacts.responses.SingleContactResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "value", kind: "message", T: ContactResponse },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SingleContactResponse {
    return new SingleContactResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SingleContactResponse {
    return new SingleContactResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SingleContactResponse {
    return new SingleContactResponse().fromJsonString(jsonString, options);
  }

  static equals(a: SingleContactResponse | PlainMessage<SingleContactResponse> | undefined, b: SingleContactResponse | PlainMessage<SingleContactResponse> | undefined): boolean {
    return proto3.util.equals(SingleContactResponse, a, b);
  }
}

/**
 * @generated from message vklink.customer.api.v1.contacts.responses.ListContactsResponse
 */
export class ListContactsResponse extends Message<ListContactsResponse> {
  /**
   * @generated from field: repeated vklink.customer.api.v1.contacts.responses.ContactResponse value = 1;
   */
  value: ContactResponse[] = [];

  /**
   * @generated from field: vklink.common.responses.PagingInfoResponse paging = 2;
   */
  paging?: PagingInfoResponse;

  constructor(data?: PartialMessage<ListContactsResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.customer.api.v1.contacts.responses.ListContactsResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "value", kind: "message", T: ContactResponse, repeated: true },
    { no: 2, name: "paging", kind: "message", T: PagingInfoResponse },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListContactsResponse {
    return new ListContactsResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListContactsResponse {
    return new ListContactsResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListContactsResponse {
    return new ListContactsResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListContactsResponse | PlainMessage<ListContactsResponse> | undefined, b: ListContactsResponse | PlainMessage<ListContactsResponse> | undefined): boolean {
    return proto3.util.equals(ListContactsResponse, a, b);
  }
}

