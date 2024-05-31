// @generated by protoc-gen-es v1.8.0 with parameter "target=ts,import_extension=none"
// @generated from file vklink/services/store/v1/categories/queries.proto (package vklink.store.api.v1.categories.queries, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { FilteringParams } from "../../../../libs/data/params/filtering_params_pb";
import { SortingParams } from "../../../../libs/data/params/sorting_params_pb";
import { PagingParams } from "../../../../libs/data/params/paging_params_pb";

/**
 * @generated from message vklink.store.api.v1.categories.queries.FindCategoryByIdQuery
 */
export class FindCategoryByIdQuery extends Message<FindCategoryByIdQuery> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<FindCategoryByIdQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.store.api.v1.categories.queries.FindCategoryByIdQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FindCategoryByIdQuery {
    return new FindCategoryByIdQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FindCategoryByIdQuery {
    return new FindCategoryByIdQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FindCategoryByIdQuery {
    return new FindCategoryByIdQuery().fromJsonString(jsonString, options);
  }

  static equals(a: FindCategoryByIdQuery | PlainMessage<FindCategoryByIdQuery> | undefined, b: FindCategoryByIdQuery | PlainMessage<FindCategoryByIdQuery> | undefined): boolean {
    return proto3.util.equals(FindCategoryByIdQuery, a, b);
  }
}

/**
 * @generated from message vklink.store.api.v1.categories.queries.GetCategoriesQuery
 */
export class GetCategoriesQuery extends Message<GetCategoriesQuery> {
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

  constructor(data?: PartialMessage<GetCategoriesQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.store.api.v1.categories.queries.GetCategoriesQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "filter", kind: "message", T: FilteringParams },
    { no: 2, name: "sortBy", kind: "message", T: SortingParams, repeated: true },
    { no: 3, name: "paging", kind: "message", T: PagingParams },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetCategoriesQuery {
    return new GetCategoriesQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetCategoriesQuery {
    return new GetCategoriesQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetCategoriesQuery {
    return new GetCategoriesQuery().fromJsonString(jsonString, options);
  }

  static equals(a: GetCategoriesQuery | PlainMessage<GetCategoriesQuery> | undefined, b: GetCategoriesQuery | PlainMessage<GetCategoriesQuery> | undefined): boolean {
    return proto3.util.equals(GetCategoriesQuery, a, b);
  }
}

/**
 * @generated from message vklink.store.api.v1.categories.queries.FindCategoryByIdAdminQuery
 */
export class FindCategoryByIdAdminQuery extends Message<FindCategoryByIdAdminQuery> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<FindCategoryByIdAdminQuery>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.store.api.v1.categories.queries.FindCategoryByIdAdminQuery";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FindCategoryByIdAdminQuery {
    return new FindCategoryByIdAdminQuery().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FindCategoryByIdAdminQuery {
    return new FindCategoryByIdAdminQuery().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FindCategoryByIdAdminQuery {
    return new FindCategoryByIdAdminQuery().fromJsonString(jsonString, options);
  }

  static equals(a: FindCategoryByIdAdminQuery | PlainMessage<FindCategoryByIdAdminQuery> | undefined, b: FindCategoryByIdAdminQuery | PlainMessage<FindCategoryByIdAdminQuery> | undefined): boolean {
    return proto3.util.equals(FindCategoryByIdAdminQuery, a, b);
  }
}

