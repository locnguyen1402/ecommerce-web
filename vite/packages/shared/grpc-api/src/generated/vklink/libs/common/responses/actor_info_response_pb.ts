// @generated by protoc-gen-es v1.8.0 with parameter "target=ts,import_extension=none"
// @generated from file vklink/libs/common/responses/actor_info_response.proto (package vklink.common.responses, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * @generated from message vklink.common.responses.ActorInfoResponse
 */
export class ActorInfoResponse extends Message<ActorInfoResponse> {
  /**
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * @generated from field: string userName = 2;
   */
  userName = "";

  /**
   * @generated from field: string displayName = 3;
   */
  displayName = "";

  /**
   * @generated from field: google.protobuf.Timestamp timestamp = 10;
   */
  timestamp?: Timestamp;

  constructor(data?: PartialMessage<ActorInfoResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "vklink.common.responses.ActorInfoResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "userName", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "displayName", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 10, name: "timestamp", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ActorInfoResponse {
    return new ActorInfoResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ActorInfoResponse {
    return new ActorInfoResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ActorInfoResponse {
    return new ActorInfoResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ActorInfoResponse | PlainMessage<ActorInfoResponse> | undefined, b: ActorInfoResponse | PlainMessage<ActorInfoResponse> | undefined): boolean {
    return proto3.util.equals(ActorInfoResponse, a, b);
  }
}

