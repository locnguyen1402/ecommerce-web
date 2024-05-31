// @generated by protoc-gen-es v1.8.0 with parameter "target=ts,import_extension=none"
// @generated from file vklink/services/notification/v1/messages/commands.proto (package vklink.notification.api.v1.messages.commands, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, StringValue, Timestamp } from "@bufbuild/protobuf";
import { IntegrationEventCommand } from "../../../../libs/common/commands/integration_event_command_pb";
import { MessageType } from "../../../../libs/common/enums/message_type_pb";

/**
 * @generated from message vklink.notification.api.v1.messages.commands.MarkAllMessageAsReadCommand
 */
export class MarkAllMessageAsReadCommand extends Message<MarkAllMessageAsReadCommand> {
  constructor(data?: PartialMessage<MarkAllMessageAsReadCommand>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.notification.api.v1.messages.commands.MarkAllMessageAsReadCommand";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MarkAllMessageAsReadCommand {
    return new MarkAllMessageAsReadCommand().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MarkAllMessageAsReadCommand {
    return new MarkAllMessageAsReadCommand().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MarkAllMessageAsReadCommand {
    return new MarkAllMessageAsReadCommand().fromJsonString(jsonString, options);
  }

  static equals(a: MarkAllMessageAsReadCommand | PlainMessage<MarkAllMessageAsReadCommand> | undefined, b: MarkAllMessageAsReadCommand | PlainMessage<MarkAllMessageAsReadCommand> | undefined): boolean {
    return proto3.util.equals(MarkAllMessageAsReadCommand, a, b);
  }
}

/**
 * @generated from message vklink.notification.api.v1.messages.commands.MarkSingleMessageAsReadCommand
 */
export class MarkSingleMessageAsReadCommand extends Message<MarkSingleMessageAsReadCommand> {
  /**
   * data fields: from 1 to 50
   *
   * @generated from field: string id = 1;
   */
  id = "";

  constructor(data?: PartialMessage<MarkSingleMessageAsReadCommand>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.notification.api.v1.messages.commands.MarkSingleMessageAsReadCommand";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MarkSingleMessageAsReadCommand {
    return new MarkSingleMessageAsReadCommand().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MarkSingleMessageAsReadCommand {
    return new MarkSingleMessageAsReadCommand().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MarkSingleMessageAsReadCommand {
    return new MarkSingleMessageAsReadCommand().fromJsonString(jsonString, options);
  }

  static equals(a: MarkSingleMessageAsReadCommand | PlainMessage<MarkSingleMessageAsReadCommand> | undefined, b: MarkSingleMessageAsReadCommand | PlainMessage<MarkSingleMessageAsReadCommand> | undefined): boolean {
    return proto3.util.equals(MarkSingleMessageAsReadCommand, a, b);
  }
}

/**
 * @generated from message vklink.notification.api.v1.messages.commands.SendMessageCommand
 */
export class SendMessageCommand extends Message<SendMessageCommand> {
  /**
   * data fields: from 1 to 50
   *
   * @generated from field: string userId = 2;
   */
  userId = "";

  /**
   * @generated from field: string title = 3;
   */
  title = "";

  /**
   * @generated from field: string content = 4;
   */
  content = "";

  /**
   * @generated from field: repeated string titleParameters = 5;
   */
  titleParameters: string[] = [];

  /**
   * @generated from field: repeated string contentParameters = 6;
   */
  contentParameters: string[] = [];

  /**
   * @generated from field: google.protobuf.StringValue image = 7;
   */
  image?: string;

  /**
   * @generated from field: google.protobuf.StringValue link = 8;
   */
  link?: string;

  /**
   * @generated from field: bool isMultilingual = 9;
   */
  isMultilingual = false;

  /**
   * @generated from field: google.protobuf.Timestamp notifiedAt = 10;
   */
  notifiedAt?: Timestamp;

  /**
   * @generated from field: map<string, string> data = 11;
   */
  data: { [key: string]: string } = {};

  /**
   * @generated from field: vklink.common.commands.IntegrationEventCommand baseEvent = 12;
   */
  baseEvent?: IntegrationEventCommand;

  /**
   * @generated from field: vklink.grpc.enums.MessageType type = 13;
   */
  type = MessageType.UNSPECIFIED;

  constructor(data?: PartialMessage<SendMessageCommand>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.notification.api.v1.messages.commands.SendMessageCommand";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 2, name: "userId", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "title", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "titleParameters", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 6, name: "contentParameters", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 7, name: "image", kind: "message", T: StringValue },
    { no: 8, name: "link", kind: "message", T: StringValue },
    { no: 9, name: "isMultilingual", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 10, name: "notifiedAt", kind: "message", T: Timestamp },
    { no: 11, name: "data", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
    { no: 12, name: "baseEvent", kind: "message", T: IntegrationEventCommand },
    { no: 13, name: "type", kind: "enum", T: proto3.getEnumType(MessageType) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SendMessageCommand {
    return new SendMessageCommand().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SendMessageCommand {
    return new SendMessageCommand().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SendMessageCommand {
    return new SendMessageCommand().fromJsonString(jsonString, options);
  }

  static equals(a: SendMessageCommand | PlainMessage<SendMessageCommand> | undefined, b: SendMessageCommand | PlainMessage<SendMessageCommand> | undefined): boolean {
    return proto3.util.equals(SendMessageCommand, a, b);
  }
}

