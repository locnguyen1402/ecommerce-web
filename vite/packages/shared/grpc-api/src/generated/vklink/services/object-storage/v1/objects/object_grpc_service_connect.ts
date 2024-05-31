// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts,import_extension=none"
// @generated from file vklink/services/object-storage/v1/objects/object_grpc_service.proto (package vklink.objectstorage.api.v1.objects, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { FindObjectByIdQuery, GetObjectsQuery } from "./queries_pb";
import { ListObjectsResponse, ListPresignedUrlsResponse, PresignedUrlResponse, SingleObjectResponse } from "./responses_pb";
import { Empty, MethodKind } from "@bufbuild/protobuf";
import { DeleteObjectCommand, PresignedUrlCommand, PresignedUrlsCommand, UpdateObjectInfoCommand, UploadObjectCommand } from "./commands_pb";

/**
 * @generated from service vklink.objectstorage.api.v1.objects.ObjectGrpcService
 */
export const ObjectGrpcService = {
  typeName: "vklink.objectstorage.api.v1.objects.ObjectGrpcService",
  methods: {
    /**
     * @generated from rpc vklink.objectstorage.api.v1.objects.ObjectGrpcService.GetObjects
     */
    getObjects: {
      name: "GetObjects",
      I: GetObjectsQuery,
      O: ListObjectsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.objectstorage.api.v1.objects.ObjectGrpcService.FindObjectById
     */
    findObjectById: {
      name: "FindObjectById",
      I: FindObjectByIdQuery,
      O: SingleObjectResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.objectstorage.api.v1.objects.ObjectGrpcService.UploadObject
     */
    uploadObject: {
      name: "UploadObject",
      I: UploadObjectCommand,
      O: SingleObjectResponse,
      kind: MethodKind.ClientStreaming,
    },
    /**
     * @generated from rpc vklink.objectstorage.api.v1.objects.ObjectGrpcService.UpdateObjectInfo
     */
    updateObjectInfo: {
      name: "UpdateObjectInfo",
      I: UpdateObjectInfoCommand,
      O: SingleObjectResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.objectstorage.api.v1.objects.ObjectGrpcService.DeleteObject
     */
    deleteObject: {
      name: "DeleteObject",
      I: DeleteObjectCommand,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.objectstorage.api.v1.objects.ObjectGrpcService.PresignedUrl
     */
    presignedUrl: {
      name: "PresignedUrl",
      I: PresignedUrlCommand,
      O: PresignedUrlResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.objectstorage.api.v1.objects.ObjectGrpcService.PresignedUrls
     */
    presignedUrls: {
      name: "PresignedUrls",
      I: PresignedUrlsCommand,
      O: ListPresignedUrlsResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

