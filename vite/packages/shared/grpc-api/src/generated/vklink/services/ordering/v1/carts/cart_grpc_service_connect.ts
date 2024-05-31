// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts,import_extension=none"
// @generated from file vklink/services/ordering/v1/carts/cart_grpc_service.proto (package vklink.ordering.api.v1.carts, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { GetCartQuery, GetCartSnapshotQuery } from "./queries_pb";
import { CartSnapshotResponse, ListCartItemsResponse } from "./responses_pb";
import { Empty, MethodKind } from "@bufbuild/protobuf";
import { AddCartItemCommand, DeleteCartItemCommand, DeleteCartItemsByProductIdsCommand } from "./commands_pb";
import { IdResponse } from "../../../../libs/common/responses/id_response_pb";

/**
 * @generated from service vklink.ordering.api.v1.carts.CartGrpcService
 */
export const CartGrpcService = {
  typeName: "vklink.ordering.api.v1.carts.CartGrpcService",
  methods: {
    /**
     * @generated from rpc vklink.ordering.api.v1.carts.CartGrpcService.GetCartSnapshot
     */
    getCartSnapshot: {
      name: "GetCartSnapshot",
      I: GetCartSnapshotQuery,
      O: CartSnapshotResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.ordering.api.v1.carts.CartGrpcService.GetCartItems
     */
    getCartItems: {
      name: "GetCartItems",
      I: GetCartQuery,
      O: ListCartItemsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.ordering.api.v1.carts.CartGrpcService.AddCartItem
     */
    addCartItem: {
      name: "AddCartItem",
      I: AddCartItemCommand,
      O: IdResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.ordering.api.v1.carts.CartGrpcService.DeleteCartItem
     */
    deleteCartItem: {
      name: "DeleteCartItem",
      I: DeleteCartItemCommand,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.ordering.api.v1.carts.CartGrpcService.DeleteCartItemsByProductIds
     */
    deleteCartItemsByProductIds: {
      name: "DeleteCartItemsByProductIds",
      I: DeleteCartItemsByProductIdsCommand,
      O: Empty,
      kind: MethodKind.Unary,
    },
  }
} as const;

