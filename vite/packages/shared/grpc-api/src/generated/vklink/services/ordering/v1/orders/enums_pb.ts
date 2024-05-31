// @generated by protoc-gen-es v1.8.0 with parameter "target=ts,import_extension=none"
// @generated from file vklink/services/ordering/v1/orders/enums.proto (package vklink.ordering.api.v1.orders.responses, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum vklink.ordering.api.v1.orders.responses.OrderStatus
 */
export enum OrderStatus {
  /**
   * @generated from enum value: ORDER_STATUS_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: ORDER_STATUS_NEW = 1;
   */
  NEW = 1,

  /**
   * @generated from enum value: ORDER_STATUS_CONFIRMED = 2;
   */
  CONFIRMED = 2,

  /**
   * @generated from enum value: ORDER_STATUS_PICKED = 3;
   */
  PICKED = 3,

  /**
   * @generated from enum value: ORDER_STATUS_PROCESSING = 4;
   */
  PROCESSING = 4,

  /**
   * @generated from enum value: ORDER_STATUS_QUALITYCHECKDONE = 5;
   */
  QUALITYCHECKDONE = 5,

  /**
   * @generated from enum value: ORDER_STATUS_DELIVERED = 6;
   */
  DELIVERED = 6,

  /**
   * @generated from enum value: ORDER_STATUS_COMPLETED = 7;
   */
  COMPLETED = 7,

  /**
   * @generated from enum value: ORDER_STATUS_CANCELLED = 8;
   */
  CANCELLED = 8,
}
// Retrieve enum metadata with: proto3.getEnumType(OrderStatus)
proto3.util.setEnumType(OrderStatus, "vklink.ordering.api.v1.orders.responses.OrderStatus", [
  { no: 0, name: "ORDER_STATUS_UNSPECIFIED" },
  { no: 1, name: "ORDER_STATUS_NEW" },
  { no: 2, name: "ORDER_STATUS_CONFIRMED" },
  { no: 3, name: "ORDER_STATUS_PICKED" },
  { no: 4, name: "ORDER_STATUS_PROCESSING" },
  { no: 5, name: "ORDER_STATUS_QUALITYCHECKDONE" },
  { no: 6, name: "ORDER_STATUS_DELIVERED" },
  { no: 7, name: "ORDER_STATUS_COMPLETED" },
  { no: 8, name: "ORDER_STATUS_CANCELLED" },
]);

/**
 * @generated from enum vklink.ordering.api.v1.orders.responses.PaymentMethod
 */
export enum PaymentMethod {
  /**
   * @generated from enum value: PAYMENT_METHOD_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: PAYMENT_METHOD_COD = 1;
   */
  COD = 1,

  /**
   * @generated from enum value: PAYMENT_METHOD_CARD = 2;
   */
  CARD = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(PaymentMethod)
proto3.util.setEnumType(PaymentMethod, "vklink.ordering.api.v1.orders.responses.PaymentMethod", [
  { no: 0, name: "PAYMENT_METHOD_UNSPECIFIED" },
  { no: 1, name: "PAYMENT_METHOD_COD" },
  { no: 2, name: "PAYMENT_METHOD_CARD" },
]);

/**
 * @generated from enum vklink.ordering.api.v1.orders.responses.PaymentStatus
 */
export enum PaymentStatus {
  /**
   * @generated from enum value: PAYMENT_STATUS_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: PAYMENT_STATUS_PENDING = 1;
   */
  PENDING = 1,

  /**
   * @generated from enum value: PAYMENT_STATUS_PAID = 2;
   */
  PAID = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(PaymentStatus)
proto3.util.setEnumType(PaymentStatus, "vklink.ordering.api.v1.orders.responses.PaymentStatus", [
  { no: 0, name: "PAYMENT_STATUS_UNSPECIFIED" },
  { no: 1, name: "PAYMENT_STATUS_PENDING" },
  { no: 2, name: "PAYMENT_STATUS_PAID" },
]);

/**
 * @generated from enum vklink.ordering.api.v1.orders.responses.ReportFilterBy
 */
export enum ReportFilterBy {
  /**
   * @generated from enum value: REPORT_FILTER_BY_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: REPORT_FILTER_BY_DAY = 1;
   */
  DAY = 1,

  /**
   * @generated from enum value: REPORT_FILTER_BY_WEEK = 2;
   */
  WEEK = 2,

  /**
   * @generated from enum value: REPORT_FILTER_BY_MONTH = 3;
   */
  MONTH = 3,

  /**
   * @generated from enum value: REPORT_FILTER_BY_YEAR = 4;
   */
  YEAR = 4,
}
// Retrieve enum metadata with: proto3.getEnumType(ReportFilterBy)
proto3.util.setEnumType(ReportFilterBy, "vklink.ordering.api.v1.orders.responses.ReportFilterBy", [
  { no: 0, name: "REPORT_FILTER_BY_UNSPECIFIED" },
  { no: 1, name: "REPORT_FILTER_BY_DAY" },
  { no: 2, name: "REPORT_FILTER_BY_WEEK" },
  { no: 3, name: "REPORT_FILTER_BY_MONTH" },
  { no: 4, name: "REPORT_FILTER_BY_YEAR" },
]);

/**
 * @generated from enum vklink.ordering.api.v1.orders.responses.ReportType
 */
export enum ReportType {
  /**
   * @generated from enum value: REPORT_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: REPORT_TYPE_ORDER_CATEGORY_REVENUE = 1;
   */
  ORDER_CATEGORY_REVENUE = 1,

  /**
   * @generated from enum value: REPORT_TYPE_ORDER_AVEGARE_ORDER = 2;
   */
  ORDER_AVEGARE_ORDER = 2,

  /**
   * @generated from enum value: REPORT_TYPE_ORDER_REVENUE = 3;
   */
  ORDER_REVENUE = 3,

  /**
   * @generated from enum value: REPORT_TYPE_ORDER_DISCOUNT = 4;
   */
  ORDER_DISCOUNT = 4,

  /**
   * @generated from enum value: REPORT_TYPE_ORDER_SERVICE = 5;
   */
  ORDER_SERVICE = 5,

  /**
   * @generated from enum value: REPORT_TYPE_ORDER_COUNT = 6;
   */
  ORDER_COUNT = 6,

  /**
   * @generated from enum value: REPORT_TYPE_ORDER_STATUS = 7;
   */
  ORDER_STATUS = 7,

  /**
   * @generated from enum value: REPORT_TYPE_ORDER_LOCATION = 8;
   */
  ORDER_LOCATION = 8,
}
// Retrieve enum metadata with: proto3.getEnumType(ReportType)
proto3.util.setEnumType(ReportType, "vklink.ordering.api.v1.orders.responses.ReportType", [
  { no: 0, name: "REPORT_TYPE_UNSPECIFIED" },
  { no: 1, name: "REPORT_TYPE_ORDER_CATEGORY_REVENUE" },
  { no: 2, name: "REPORT_TYPE_ORDER_AVEGARE_ORDER" },
  { no: 3, name: "REPORT_TYPE_ORDER_REVENUE" },
  { no: 4, name: "REPORT_TYPE_ORDER_DISCOUNT" },
  { no: 5, name: "REPORT_TYPE_ORDER_SERVICE" },
  { no: 6, name: "REPORT_TYPE_ORDER_COUNT" },
  { no: 7, name: "REPORT_TYPE_ORDER_STATUS" },
  { no: 8, name: "REPORT_TYPE_ORDER_LOCATION" },
]);

