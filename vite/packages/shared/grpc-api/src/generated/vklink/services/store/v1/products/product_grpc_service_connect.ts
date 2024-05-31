// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts,import_extension=none"
// @generated from file vklink/services/store/v1/products/product_grpc_service.proto (package vklink.store.api.v1.products, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { ExportProductReportQuery, FindAdminProductByIdQuery, FindProductByIdQuery, GetAdminProductBundleItemsQuery, GetAdminProductsQuery, GetCategoriesByProductIdsQuery, GetOrderedProductsQuery, GetProductBundleItemsQuery, GetProductReportQuery, GetProductReviewQuery, GetProductsByIdsQuery, GetProductsQuery, GetSingleAdminProductQuery, GetSingleProductQuery, GetVariantsByIdsQuery } from "./queries_pb";
import { CategoriesByProductIdsResponse, ExportProductReportResponse, ListAdminProductBundleItemsResponse, ListAdminProductsResponse, ListBundleProductsResponse, ListProductReportsResponse, ListProductReviewResponse, ListProductsResponse, MultipleOrderedProductsResponse, MultipleProductsResponse, MultipleVariantsResponse, SingleAdminProductResponse, SingleProductResponse } from "./responses_pb";
import { Empty, MethodKind } from "@bufbuild/protobuf";
import { AddOrderProductReviewCommand, CreateProductCommand, CreateProductVariantCommand, CreateVariantCommand, DeleteProductCommand, DisableProductCommand, DisableProductVariantCommand, EnableProductCommand, EnableProductVariantCommand, UpdateProductCommand, UpdateProductVariantCommand, UpdateVariantCommand } from "./commands_pb";
import { IdResponse } from "../../../../libs/common/responses/id_response_pb";

/**
 * @generated from service vklink.store.api.v1.products.ProductGrpcService
 */
export const ProductGrpcService = {
  typeName: "vklink.store.api.v1.products.ProductGrpcService",
  methods: {
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.GetProducts
     */
    getProducts: {
      name: "GetProducts",
      I: GetProductsQuery,
      O: ListProductsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.GetProductsByIds
     */
    getProductsByIds: {
      name: "GetProductsByIds",
      I: GetProductsByIdsQuery,
      O: MultipleProductsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.GetProductBundleItems
     */
    getProductBundleItems: {
      name: "GetProductBundleItems",
      I: GetProductBundleItemsQuery,
      O: ListBundleProductsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.FindProductById
     */
    findProductById: {
      name: "FindProductById",
      I: FindProductByIdQuery,
      O: SingleProductResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.GetSingleProduct
     */
    getSingleProduct: {
      name: "GetSingleProduct",
      I: GetSingleProductQuery,
      O: SingleProductResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.GetAdminProducts
     */
    getAdminProducts: {
      name: "GetAdminProducts",
      I: GetAdminProductsQuery,
      O: ListAdminProductsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.FindAdminProductById
     */
    findAdminProductById: {
      name: "FindAdminProductById",
      I: FindAdminProductByIdQuery,
      O: SingleAdminProductResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.GetSingleAdminProduct
     */
    getSingleAdminProduct: {
      name: "GetSingleAdminProduct",
      I: GetSingleAdminProductQuery,
      O: SingleAdminProductResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.GetAdminProductBundleItems
     */
    getAdminProductBundleItems: {
      name: "GetAdminProductBundleItems",
      I: GetAdminProductBundleItemsQuery,
      O: ListAdminProductBundleItemsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.CreateProduct
     */
    createProduct: {
      name: "CreateProduct",
      I: CreateProductCommand,
      O: IdResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.UpdateProduct
     */
    updateProduct: {
      name: "UpdateProduct",
      I: UpdateProductCommand,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.CreateVariant
     */
    createVariant: {
      name: "CreateVariant",
      I: CreateVariantCommand,
      O: IdResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.UpdateVariant
     */
    updateVariant: {
      name: "UpdateVariant",
      I: UpdateVariantCommand,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.CreateProductVariant
     */
    createProductVariant: {
      name: "CreateProductVariant",
      I: CreateProductVariantCommand,
      O: IdResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.UpdateProductVariant
     */
    updateProductVariant: {
      name: "UpdateProductVariant",
      I: UpdateProductVariantCommand,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.EnableProductVariant
     */
    enableProductVariant: {
      name: "EnableProductVariant",
      I: EnableProductVariantCommand,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.DisableProductVariant
     */
    disableProductVariant: {
      name: "DisableProductVariant",
      I: DisableProductVariantCommand,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.EnableProduct
     */
    enableProduct: {
      name: "EnableProduct",
      I: EnableProductCommand,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.DisableProduct
     */
    disableProduct: {
      name: "DisableProduct",
      I: DisableProductCommand,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.DeleteProduct
     */
    deleteProduct: {
      name: "DeleteProduct",
      I: DeleteProductCommand,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.AddOrderProductReview
     */
    addOrderProductReview: {
      name: "AddOrderProductReview",
      I: AddOrderProductReviewCommand,
      O: Empty,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.GetProductReviews
     */
    getProductReviews: {
      name: "GetProductReviews",
      I: GetProductReviewQuery,
      O: ListProductReviewResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.GetOrderedProducts
     */
    getOrderedProducts: {
      name: "GetOrderedProducts",
      I: GetOrderedProductsQuery,
      O: MultipleOrderedProductsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.GetVariantsByIds
     */
    getVariantsByIds: {
      name: "GetVariantsByIds",
      I: GetVariantsByIdsQuery,
      O: MultipleVariantsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.GetCategoriesByProductIds
     */
    getCategoriesByProductIds: {
      name: "GetCategoriesByProductIds",
      I: GetCategoriesByProductIdsQuery,
      O: CategoriesByProductIdsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.GetProductReport
     */
    getProductReport: {
      name: "GetProductReport",
      I: GetProductReportQuery,
      O: ListProductReportsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.store.api.v1.products.ProductGrpcService.ExportProductReport
     */
    exportProductReport: {
      name: "ExportProductReport",
      I: ExportProductReportQuery,
      O: ExportProductReportResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

