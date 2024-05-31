// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts,import_extension=none"
// @generated from file vklink/services/notification/v1/devices/device_grpc_service.proto (package vklink.notification.api.v1.devices, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { DeregisterDeviceCommand, RegisterDeviceCommand } from "./commands_pb";
import { IdResponse } from "../../../../libs/common/responses/id_response_pb";
import { Empty, MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service vklink.notification.api.v1.devices.DeviceGrpcService
 */
export const DeviceGrpcService = {
  typeName: "vklink.notification.api.v1.devices.DeviceGrpcService",
  methods: {
    /**
     * @generated from rpc vklink.notification.api.v1.devices.DeviceGrpcService.RegisterDevice
     */
    registerDevice: {
      name: "RegisterDevice",
      I: RegisterDeviceCommand,
      O: IdResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.notification.api.v1.devices.DeviceGrpcService.DeregisterDevice
     */
    deregisterDevice: {
      name: "DeregisterDevice",
      I: DeregisterDeviceCommand,
      O: Empty,
      kind: MethodKind.Unary,
    },
  }
} as const;

