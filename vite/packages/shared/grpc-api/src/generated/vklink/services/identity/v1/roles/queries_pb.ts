// @generated by protoc-gen-es v1.8.0 with parameter "target=ts,import_extension=none"
// @generated from file vklink/services/identity/v1/roles/queries.proto (package vklink.identity.api.v1.roles.queries, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { FilteringParams } from "../../../../libs/data/params/filtering_params_pb";
import { SortingParams } from "../../../../libs/data/params/sorting_params_pb";
import { PagingParams } from "../../../../libs/data/params/paging_params_pb";

/**
 * @generated from message vklink.identity.api.v1.roles.queries.FindRoleByIdQuery
 */
export class FindRoleByIdQuery extends Message<FindRoleByIdQuery> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<FindRoleByIdQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.identity.api.v1.roles.queries.FindRoleByIdQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FindRoleByIdQuery {
    return new FindRoleByIdQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FindRoleByIdQuery {
    return new FindRoleByIdQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FindRoleByIdQuery {
    return new FindRoleByIdQuery().fromJsonString(jsonString, options);
  }

  static equals(a: FindRoleByIdQuery | PlainMessage<FindRoleByIdQuery> | undefined, b: FindRoleByIdQuery | PlainMessage<FindRoleByIdQuery> | undefined): boolean {
    return proto3.util.equals(FindRoleByIdQuery, a, b);
  }
}

/**
 * @generated from message vklink.identity.api.v1.roles.queries.GetListRolesQuery
 */
export class GetListRolesQuery extends Message<GetListRolesQuery> {
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

  constructor(data?: PartialMessage<GetListRolesQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.identity.api.v1.roles.queries.GetListRolesQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "filter", kind: "message", T: FilteringParams },
    { no: 2, name: "sortBy", kind: "message", T: SortingParams, repeated: true },
    { no: 3, name: "paging", kind: "message", T: PagingParams },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetListRolesQuery {
    return new GetListRolesQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetListRolesQuery {
    return new GetListRolesQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetListRolesQuery {
    return new GetListRolesQuery().fromJsonString(jsonString, options);
  }

  static equals(a: GetListRolesQuery | PlainMessage<GetListRolesQuery> | undefined, b: GetListRolesQuery | PlainMessage<GetListRolesQuery> | undefined): boolean {
    return proto3.util.equals(GetListRolesQuery, a, b);
  }
}

