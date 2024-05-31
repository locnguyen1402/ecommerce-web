// @generated by protoc-gen-es v1.8.0 with parameter "target=ts,import_extension=none"
// @generated from file vklink/services/customer/v1/customers/queries.proto (package vklink.customer.api.v1.customers.queries, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, StringValue } from "@bufbuild/protobuf";
import { FilteringParams } from "../../../../libs/data/params/filtering_params_pb";
import { SortingParams } from "../../../../libs/data/params/sorting_params_pb";
import { PagingParams } from "../../../../libs/data/params/paging_params_pb";
import { UserStatus } from "../../../../libs/common/enums/user_status_pb";

/**
 * @generated from message vklink.customer.api.v1.customers.queries.FindCustomerByIdQuery
 */
export class FindCustomerByIdQuery extends Message<FindCustomerByIdQuery> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<FindCustomerByIdQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.customer.api.v1.customers.queries.FindCustomerByIdQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FindCustomerByIdQuery {
    return new FindCustomerByIdQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FindCustomerByIdQuery {
    return new FindCustomerByIdQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FindCustomerByIdQuery {
    return new FindCustomerByIdQuery().fromJsonString(jsonString, options);
  }

  static equals(a: FindCustomerByIdQuery | PlainMessage<FindCustomerByIdQuery> | undefined, b: FindCustomerByIdQuery | PlainMessage<FindCustomerByIdQuery> | undefined): boolean {
    return proto3.util.equals(FindCustomerByIdQuery, a, b);
  }
}

/**
 * @generated from message vklink.customer.api.v1.customers.queries.FindCustomerByUserNameQuery
 */
export class FindCustomerByUserNameQuery extends Message<FindCustomerByUserNameQuery> {
  /**
   * @generated from field: string userName = 1;
   */
  userName = "";

  constructor(data?: PartialMessage<FindCustomerByUserNameQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.customer.api.v1.customers.queries.FindCustomerByUserNameQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "userName", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FindCustomerByUserNameQuery {
    return new FindCustomerByUserNameQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FindCustomerByUserNameQuery {
    return new FindCustomerByUserNameQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FindCustomerByUserNameQuery {
    return new FindCustomerByUserNameQuery().fromJsonString(jsonString, options);
  }

  static equals(a: FindCustomerByUserNameQuery | PlainMessage<FindCustomerByUserNameQuery> | undefined, b: FindCustomerByUserNameQuery | PlainMessage<FindCustomerByUserNameQuery> | undefined): boolean {
    return proto3.util.equals(FindCustomerByUserNameQuery, a, b);
  }
}

/**
 * @generated from message vklink.customer.api.v1.customers.queries.GetSingleCustomerQuery
 */
export class GetSingleCustomerQuery extends Message<GetSingleCustomerQuery> {
  /**
   * @generated from field: vklink.data.params.FilteringParams filter = 1;
   */
  filter?: FilteringParams;

  constructor(data?: PartialMessage<GetSingleCustomerQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.customer.api.v1.customers.queries.GetSingleCustomerQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "filter", kind: "message", T: FilteringParams },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSingleCustomerQuery {
    return new GetSingleCustomerQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSingleCustomerQuery {
    return new GetSingleCustomerQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSingleCustomerQuery {
    return new GetSingleCustomerQuery().fromJsonString(jsonString, options);
  }

  static equals(a: GetSingleCustomerQuery | PlainMessage<GetSingleCustomerQuery> | undefined, b: GetSingleCustomerQuery | PlainMessage<GetSingleCustomerQuery> | undefined): boolean {
    return proto3.util.equals(GetSingleCustomerQuery, a, b);
  }
}

/**
 * @generated from message vklink.customer.api.v1.customers.queries.GetCustomersQuery
 */
export class GetCustomersQuery extends Message<GetCustomersQuery> {
  /**
   * @generated from field: vklink.data.params.FilteringParams filter = 1;
   */
  filter?: FilteringParams;

  /**
   * @generated from field: repeated vklink.data.params.SortingParams sortBy = 2;
   */
  sortBy: SortingParams[] = [];

  /**
   * @generated from field: vklink.data.params.PagingParams paging = 3;
   */
  paging?: PagingParams;

  constructor(data?: PartialMessage<GetCustomersQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.customer.api.v1.customers.queries.GetCustomersQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "filter", kind: "message", T: FilteringParams },
    { no: 2, name: "sortBy", kind: "message", T: SortingParams, repeated: true },
    { no: 3, name: "paging", kind: "message", T: PagingParams },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetCustomersQuery {
    return new GetCustomersQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetCustomersQuery {
    return new GetCustomersQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetCustomersQuery {
    return new GetCustomersQuery().fromJsonString(jsonString, options);
  }

  static equals(a: GetCustomersQuery | PlainMessage<GetCustomersQuery> | undefined, b: GetCustomersQuery | PlainMessage<GetCustomersQuery> | undefined): boolean {
    return proto3.util.equals(GetCustomersQuery, a, b);
  }
}

/**
 * @generated from message vklink.customer.api.v1.customers.queries.GetNewCustomersQuery
 */
export class GetNewCustomersQuery extends Message<GetNewCustomersQuery> {
  /**
   * @generated from field: google.protobuf.StringValue startDate = 1;
   */
  startDate?: string;

  /**
   * @generated from field: google.protobuf.StringValue endDate = 2;
   */
  endDate?: string;

  constructor(data?: PartialMessage<GetNewCustomersQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.customer.api.v1.customers.queries.GetNewCustomersQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "startDate", kind: "message", T: StringValue },
    { no: 2, name: "endDate", kind: "message", T: StringValue },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetNewCustomersQuery {
    return new GetNewCustomersQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetNewCustomersQuery {
    return new GetNewCustomersQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetNewCustomersQuery {
    return new GetNewCustomersQuery().fromJsonString(jsonString, options);
  }

  static equals(a: GetNewCustomersQuery | PlainMessage<GetNewCustomersQuery> | undefined, b: GetNewCustomersQuery | PlainMessage<GetNewCustomersQuery> | undefined): boolean {
    return proto3.util.equals(GetNewCustomersQuery, a, b);
  }
}

/**
 * @generated from message vklink.customer.api.v1.customers.queries.GetCustomerInDashboardQuery
 */
export class GetCustomerInDashboardQuery extends Message<GetCustomerInDashboardQuery> {
  /**
   * @generated from field: repeated string ids = 1;
   */
  ids: string[] = [];

  constructor(data?: PartialMessage<GetCustomerInDashboardQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.customer.api.v1.customers.queries.GetCustomerInDashboardQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ids", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetCustomerInDashboardQuery {
    return new GetCustomerInDashboardQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetCustomerInDashboardQuery {
    return new GetCustomerInDashboardQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetCustomerInDashboardQuery {
    return new GetCustomerInDashboardQuery().fromJsonString(jsonString, options);
  }

  static equals(a: GetCustomerInDashboardQuery | PlainMessage<GetCustomerInDashboardQuery> | undefined, b: GetCustomerInDashboardQuery | PlainMessage<GetCustomerInDashboardQuery> | undefined): boolean {
    return proto3.util.equals(GetCustomerInDashboardQuery, a, b);
  }
}

/**
 * @generated from message vklink.customer.api.v1.customers.queries.GetCustomerReportQuery
 */
export class GetCustomerReportQuery extends Message<GetCustomerReportQuery> {
  /**
   * @generated from field: google.protobuf.StringValue startDate = 1;
   */
  startDate?: string;

  /**
   * @generated from field: google.protobuf.StringValue endDate = 2;
   */
  endDate?: string;

  /**
   * @generated from field: google.protobuf.StringValue keyword = 3;
   */
  keyword?: string;

  /**
   * @generated from field: vklink.grpc.enums.UserStatus status = 4;
   */
  status = UserStatus.UNSPECIFIED;

  /**
   * @generated from field: vklink.data.params.PagingParams paging = 5;
   */
  paging?: PagingParams;

  constructor(data?: PartialMessage<GetCustomerReportQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.customer.api.v1.customers.queries.GetCustomerReportQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "startDate", kind: "message", T: StringValue },
    { no: 2, name: "endDate", kind: "message", T: StringValue },
    { no: 3, name: "keyword", kind: "message", T: StringValue },
    { no: 4, name: "status", kind: "enum", T: proto3.getEnumType(UserStatus) },
    { no: 5, name: "paging", kind: "message", T: PagingParams },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetCustomerReportQuery {
    return new GetCustomerReportQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetCustomerReportQuery {
    return new GetCustomerReportQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetCustomerReportQuery {
    return new GetCustomerReportQuery().fromJsonString(jsonString, options);
  }

  static equals(a: GetCustomerReportQuery | PlainMessage<GetCustomerReportQuery> | undefined, b: GetCustomerReportQuery | PlainMessage<GetCustomerReportQuery> | undefined): boolean {
    return proto3.util.equals(GetCustomerReportQuery, a, b);
  }
}

/**
 * @generated from message vklink.customer.api.v1.customers.queries.ExportCustomerReportQuery
 */
export class ExportCustomerReportQuery extends Message<ExportCustomerReportQuery> {
  /**
   * @generated from field: google.protobuf.StringValue startDate = 1;
   */
  startDate?: string;

  /**
   * @generated from field: google.protobuf.StringValue endDate = 2;
   */
  endDate?: string;

  /**
   * @generated from field: google.protobuf.StringValue keyword = 3;
   */
  keyword?: string;

  /**
   * @generated from field: vklink.grpc.enums.UserStatus status = 4;
   */
  status = UserStatus.UNSPECIFIED;

  constructor(data?: PartialMessage<ExportCustomerReportQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.customer.api.v1.customers.queries.ExportCustomerReportQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "startDate", kind: "message", T: StringValue },
    { no: 2, name: "endDate", kind: "message", T: StringValue },
    { no: 3, name: "keyword", kind: "message", T: StringValue },
    { no: 4, name: "status", kind: "enum", T: proto3.getEnumType(UserStatus) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExportCustomerReportQuery {
    return new ExportCustomerReportQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExportCustomerReportQuery {
    return new ExportCustomerReportQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExportCustomerReportQuery {
    return new ExportCustomerReportQuery().fromJsonString(jsonString, options);
  }

  static equals(a: ExportCustomerReportQuery | PlainMessage<ExportCustomerReportQuery> | undefined, b: ExportCustomerReportQuery | PlainMessage<ExportCustomerReportQuery> | undefined): boolean {
    return proto3.util.equals(ExportCustomerReportQuery, a, b);
  }
}

