// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts,import_extension=none"
// @generated from file vklink/services/reporting/v1/orders/order_grpc_service.proto (package vklink.reporting.api.v1.orders, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { GetDashboardOrderRevenueByAreaReportQuery, GetDashboardOrderRevenueByCategoryReportQuery, GetDashboardOrderRevenueByCustomerReportQuery, GetDashboardOrderRevenueByDiscountReportQuery, GetDashboardOrderRevenueByProductReportQuery, GetDashboardOrderRevenueByStatusReportQuery, GetDashboardOrderRevenueReportQuery } from "./queries_pb";
import { DashboardCustomerListWidgetResponse, DashboardOrderRevenueWidgetResponse, DashboardProductListWidgetResponse } from "./responses_pb";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service vklink.reporting.api.v1.orders.OrderGrpcService
 */
export const OrderGrpcService = {
  typeName: "vklink.reporting.api.v1.orders.OrderGrpcService",
  methods: {
    /**
     * @generated from rpc vklink.reporting.api.v1.orders.OrderGrpcService.GetDashboardOrderRevenueReport
     */
    getDashboardOrderRevenueReport: {
      name: "GetDashboardOrderRevenueReport",
      I: GetDashboardOrderRevenueReportQuery,
      O: DashboardOrderRevenueWidgetResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.reporting.api.v1.orders.OrderGrpcService.GetDashboardOrderRevenueByAreaReport
     */
    getDashboardOrderRevenueByAreaReport: {
      name: "GetDashboardOrderRevenueByAreaReport",
      I: GetDashboardOrderRevenueByAreaReportQuery,
      O: DashboardOrderRevenueWidgetResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.reporting.api.v1.orders.OrderGrpcService.GetDashboardOrderRevenueByCategoryReport
     */
    getDashboardOrderRevenueByCategoryReport: {
      name: "GetDashboardOrderRevenueByCategoryReport",
      I: GetDashboardOrderRevenueByCategoryReportQuery,
      O: DashboardOrderRevenueWidgetResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.reporting.api.v1.orders.OrderGrpcService.GetDashboardOrderRevenueByCustomerReport
     */
    getDashboardOrderRevenueByCustomerReport: {
      name: "GetDashboardOrderRevenueByCustomerReport",
      I: GetDashboardOrderRevenueByCustomerReportQuery,
      O: DashboardCustomerListWidgetResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.reporting.api.v1.orders.OrderGrpcService.GetDashboardOrderRevenueByDiscountReport
     */
    getDashboardOrderRevenueByDiscountReport: {
      name: "GetDashboardOrderRevenueByDiscountReport",
      I: GetDashboardOrderRevenueByDiscountReportQuery,
      O: DashboardOrderRevenueWidgetResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.reporting.api.v1.orders.OrderGrpcService.GetDashboardOrderRevenueByProductReport
     */
    getDashboardOrderRevenueByProductReport: {
      name: "GetDashboardOrderRevenueByProductReport",
      I: GetDashboardOrderRevenueByProductReportQuery,
      O: DashboardProductListWidgetResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc vklink.reporting.api.v1.orders.OrderGrpcService.GetDashboardOrderRevenueByStatusReport
     */
    getDashboardOrderRevenueByStatusReport: {
      name: "GetDashboardOrderRevenueByStatusReport",
      I: GetDashboardOrderRevenueByStatusReportQuery,
      O: DashboardOrderRevenueWidgetResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

