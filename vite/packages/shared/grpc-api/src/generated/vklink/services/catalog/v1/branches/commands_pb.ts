// @generated by protoc-gen-es v1.8.0 with parameter "target=ts,import_extension=none"
// @generated from file vklink/services/catalog/v1/branches/commands.proto (package vklink.catalog.api.v1.branches.commands, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { BranchType } from "./enums_pb";

/**
 * @generated from message vklink.catalog.api.v1.branches.commands.CreateBranchCommand
 */
export class CreateBranchCommand extends Message<CreateBranchCommand> {
  /**
   * @generated from field: string code = 2;
   */
  code = "";

  /**
   * @generated from field: string name = 3;
   */
  name = "";

  /**
   * @generated from field: string displayName = 4;
   */
  displayName = "";

  /**
   * @generated from field: string notes = 5;
   */
  notes = "";

  /**
   * @generated from field: vklink.catalog.api.v1.branches.responses.BranchType branchType = 6;
   */
  branchType = BranchType.UNSPECIFIED;

  /**
   * relationship fields: from 51 to 60
   *
   * @generated from field: string bankId = 51;
   */
  bankId = "";

  constructor(data?: PartialMessage<CreateBranchCommand>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.catalog.api.v1.branches.commands.CreateBranchCommand";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 2, name: "code", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "displayName", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "notes", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "branchType", kind: "enum", T: proto3.getEnumType(BranchType) },
    { no: 51, name: "bankId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateBranchCommand {
    return new CreateBranchCommand().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateBranchCommand {
    return new CreateBranchCommand().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateBranchCommand {
    return new CreateBranchCommand().fromJsonString(jsonString, options);
  }

  static equals(a: CreateBranchCommand | PlainMessage<CreateBranchCommand> | undefined, b: CreateBranchCommand | PlainMessage<CreateBranchCommand> | undefined): boolean {
    return proto3.util.equals(CreateBranchCommand, a, b);
  }
}

/**
 * @generated from message vklink.catalog.api.v1.branches.commands.UpdateBranchCommand
 */
export class UpdateBranchCommand extends Message<UpdateBranchCommand> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string code = 2;
   */
  code = "";

  /**
   * @generated from field: string name = 3;
   */
  name = "";

  /**
   * @generated from field: string displayName = 4;
   */
  displayName = "";

  /**
   * @generated from field: string notes = 5;
   */
  notes = "";

  /**
   * @generated from field: vklink.catalog.api.v1.branches.responses.BranchType branchType = 6;
   */
  branchType = BranchType.UNSPECIFIED;

  /**
   * relationship fields: from 51 to 60
   *
   * @generated from field: string bankId = 51;
   */
  bankId = "";

  constructor(data?: PartialMessage<UpdateBranchCommand>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.catalog.api.v1.branches.commands.UpdateBranchCommand";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "code", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "displayName", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "notes", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "branchType", kind: "enum", T: proto3.getEnumType(BranchType) },
    { no: 51, name: "bankId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateBranchCommand {
    return new UpdateBranchCommand().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateBranchCommand {
    return new UpdateBranchCommand().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateBranchCommand {
    return new UpdateBranchCommand().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateBranchCommand | PlainMessage<UpdateBranchCommand> | undefined, b: UpdateBranchCommand | PlainMessage<UpdateBranchCommand> | undefined): boolean {
    return proto3.util.equals(UpdateBranchCommand, a, b);
  }
}

/**
 * @generated from message vklink.catalog.api.v1.branches.commands.DisableBranchCommand
 */
export class DisableBranchCommand extends Message<DisableBranchCommand> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string notes = 2;
   */
  notes = "";

  constructor(data?: PartialMessage<DisableBranchCommand>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.catalog.api.v1.branches.commands.DisableBranchCommand";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "notes", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DisableBranchCommand {
    return new DisableBranchCommand().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DisableBranchCommand {
    return new DisableBranchCommand().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DisableBranchCommand {
    return new DisableBranchCommand().fromJsonString(jsonString, options);
  }

  static equals(a: DisableBranchCommand | PlainMessage<DisableBranchCommand> | undefined, b: DisableBranchCommand | PlainMessage<DisableBranchCommand> | undefined): boolean {
    return proto3.util.equals(DisableBranchCommand, a, b);
  }
}

/**
 * @generated from message vklink.catalog.api.v1.branches.commands.EnableBranchCommand
 */
export class EnableBranchCommand extends Message<EnableBranchCommand> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string notes = 2;
   */
  notes = "";

  constructor(data?: PartialMessage<EnableBranchCommand>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.catalog.api.v1.branches.commands.EnableBranchCommand";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "notes", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EnableBranchCommand {
    return new EnableBranchCommand().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EnableBranchCommand {
    return new EnableBranchCommand().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EnableBranchCommand {
    return new EnableBranchCommand().fromJsonString(jsonString, options);
  }

  static equals(a: EnableBranchCommand | PlainMessage<EnableBranchCommand> | undefined, b: EnableBranchCommand | PlainMessage<EnableBranchCommand> | undefined): boolean {
    return proto3.util.equals(EnableBranchCommand, a, b);
  }
}

