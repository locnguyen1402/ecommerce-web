// @generated by protoc-gen-es v1.8.0 with parameter "target=ts,import_extension=none"
// @generated from file vklink/services/reporting/v1/orders/enums.proto (package vklink.reporting.api.v1.orders.enums, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum vklink.reporting.api.v1.orders.enums.ReportFilterBy
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
proto3.util.setEnumType(ReportFilterBy, "vklink.reporting.api.v1.orders.enums.ReportFilterBy", [
  { no: 0, name: "REPORT_FILTER_BY_UNSPECIFIED" },
  { no: 1, name: "REPORT_FILTER_BY_DAY" },
  { no: 2, name: "REPORT_FILTER_BY_WEEK" },
  { no: 3, name: "REPORT_FILTER_BY_MONTH" },
  { no: 4, name: "REPORT_FILTER_BY_YEAR" },
]);

/**
 * @generated from enum vklink.reporting.api.v1.orders.enums.ReportType
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
proto3.util.setEnumType(ReportType, "vklink.reporting.api.v1.orders.enums.ReportType", [
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

