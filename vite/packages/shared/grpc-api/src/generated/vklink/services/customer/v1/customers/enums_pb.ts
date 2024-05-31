// @generated by protoc-gen-es v1.8.0 with parameter "target=ts,import_extension=none"
// @generated from file vklink/services/customer/v1/customers/enums.proto (package vklink.customer.api.v1.customers.responses, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum vklink.customer.api.v1.customers.responses.DashboardFilterBy
 */
export enum DashboardFilterBy {
  /**
   * @generated from enum value: DASHBOARD_FILTER_BY_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: DASHBOARD_FILTER_BY_DAY = 1;
   */
  DAY = 1,

  /**
   * @generated from enum value: DASHBOARD_FILTER_BY_WEEK = 2;
   */
  WEEK = 2,

  /**
   * @generated from enum value: DASHBOARD_FILTER_BY_MONTH = 3;
   */
  MONTH = 3,

  /**
   * @generated from enum value: DASHBOARD_FILTER_BY_YEAR = 4;
   */
  YEAR = 4,
}
// Retrieve enum metadata with: proto3.getEnumType(DashboardFilterBy)
proto3.util.setEnumType(DashboardFilterBy, "vklink.customer.api.v1.customers.responses.DashboardFilterBy", [
  { no: 0, name: "DASHBOARD_FILTER_BY_UNSPECIFIED" },
  { no: 1, name: "DASHBOARD_FILTER_BY_DAY" },
  { no: 2, name: "DASHBOARD_FILTER_BY_WEEK" },
  { no: 3, name: "DASHBOARD_FILTER_BY_MONTH" },
  { no: 4, name: "DASHBOARD_FILTER_BY_YEAR" },
]);

