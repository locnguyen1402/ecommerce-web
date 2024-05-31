// @generated by protoc-gen-es v1.8.0 with parameter "target=ts,import_extension=none"
// @generated from file vklink/services/cms/v1/positions/queries.proto (package vklink.cms.api.v1.positions.queries, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { FilteringParams } from "../../../../libs/data/params/filtering_params_pb";
import { SortingParams } from "../../../../libs/data/params/sorting_params_pb";
import { PagingParams } from "../../../../libs/data/params/paging_params_pb";

/**
 * @generated from message vklink.cms.api.v1.positions.queries.FindPositionByIdQuery
 */
export class FindPositionByIdQuery extends Message<FindPositionByIdQuery> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<FindPositionByIdQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.cms.api.v1.positions.queries.FindPositionByIdQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FindPositionByIdQuery {
    return new FindPositionByIdQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FindPositionByIdQuery {
    return new FindPositionByIdQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FindPositionByIdQuery {
    return new FindPositionByIdQuery().fromJsonString(jsonString, options);
  }

  static equals(a: FindPositionByIdQuery | PlainMessage<FindPositionByIdQuery> | undefined, b: FindPositionByIdQuery | PlainMessage<FindPositionByIdQuery> | undefined): boolean {
    return proto3.util.equals(FindPositionByIdQuery, a, b);
  }
}

/**
 * @generated from message vklink.cms.api.v1.positions.queries.GetPositionsQuery
 */
export class GetPositionsQuery extends Message<GetPositionsQuery> {
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

  constructor(data?: PartialMessage<GetPositionsQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.cms.api.v1.positions.queries.GetPositionsQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "filter", kind: "message", T: FilteringParams },
    { no: 2, name: "sortBy", kind: "message", T: SortingParams, repeated: true },
    { no: 3, name: "paging", kind: "message", T: PagingParams },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetPositionsQuery {
    return new GetPositionsQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetPositionsQuery {
    return new GetPositionsQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetPositionsQuery {
    return new GetPositionsQuery().fromJsonString(jsonString, options);
  }

  static equals(a: GetPositionsQuery | PlainMessage<GetPositionsQuery> | undefined, b: GetPositionsQuery | PlainMessage<GetPositionsQuery> | undefined): boolean {
    return proto3.util.equals(GetPositionsQuery, a, b);
  }
}

/**
 * @generated from message vklink.cms.api.v1.positions.queries.AdminFindPositionByIdQuery
 */
export class AdminFindPositionByIdQuery extends Message<AdminFindPositionByIdQuery> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<AdminFindPositionByIdQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.cms.api.v1.positions.queries.AdminFindPositionByIdQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AdminFindPositionByIdQuery {
    return new AdminFindPositionByIdQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AdminFindPositionByIdQuery {
    return new AdminFindPositionByIdQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AdminFindPositionByIdQuery {
    return new AdminFindPositionByIdQuery().fromJsonString(jsonString, options);
  }

  static equals(a: AdminFindPositionByIdQuery | PlainMessage<AdminFindPositionByIdQuery> | undefined, b: AdminFindPositionByIdQuery | PlainMessage<AdminFindPositionByIdQuery> | undefined): boolean {
    return proto3.util.equals(AdminFindPositionByIdQuery, a, b);
  }
}

