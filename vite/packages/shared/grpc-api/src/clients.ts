import { useContext, useState } from 'react';

import { ServiceType } from '@bufbuild/protobuf';
import { PromiseClient, Transport, createPromiseClient } from '@connectrpc/connect';

import { ProductGrpcService } from './generated/vklink/services/store/v1/products/product_grpc_service_connect';
import { ObjectGrpcService } from './generated/vklink/services/object-storage/v1/objects/object_grpc_service_connect';
import { StoreGrpcService } from './generated/vklink/services/store/v1/stores/store_grpc_service_connect';
import { CategoryGrpcService as ProductCategoryGrpcService } from './generated/vklink/services/store/v1/categories/category_grpc_service_connect';
import { OrderGrpcService } from './generated/vklink/services/ordering/v1/orders/order_grpc_service_connect';
import { ProvinceGrpcService } from './generated/vklink/services/catalog/v1/provinces/province_grpc_service_connect';
import { DistrictGrpcService } from './generated/vklink/services/catalog/v1/districts/district_grpc_service_connect';
import { WardGrpcService } from './generated/vklink/services/catalog/v1/wards/ward_grpc_service_connect';
import { CustomerGrpcService } from './generated/vklink/services/customer/v1/customers/customer_grpc_service_connect';
import { ContactGrpcService } from './generated/vklink/services/customer/v1/contacts/contact_grpc_service_connect';
import { PartnerGrpcService } from './generated/vklink/services/store/v1/partners/partner_grpc_service_connect';

// import { CategoryGrpcService as PostCategoryGrpcService } from './generated/vklink/services/blog/v1/categories/category_grpc_service_connect';
// import { CommentGrpcService as PostCommentGrpcService } from './generated/vklink/services/blog/v1/comments/comment_grpc_service_connect';
// import { PostGrpcService } from './generated/vklink/services/blog/v1/posts/post_grpc_service_connect';

import { TagGrpcService as PostTagGrpcService } from './generated/vklink/services/blog/v1/tags/tag_grpc_service_connect';
import { AccountGrpcService } from './generated/vklink/services/identity/v1/accounts/account_grpc_service_connect';
import { PermissionGroupGrpcService } from './generated/vklink/services/identity/v1/permissiongroups/permissionGroup_grpc_service_connect';
import { PermissionGrpcService } from './generated/vklink/services/identity/v1/permissions/permission_grpc_service_connect';
import { RoleGrpcService } from './generated/vklink/services/identity/v1/roles/role_grpc_service_connect';
import { UserGrpcService } from './generated/vklink/services/identity/v1/users/user_grpc_service_connect';
import { CouponGrpcService } from './generated/vklink/services/store/v1/coupons/coupon_grpc_service_connect';
import { PromotionGrpcService } from './generated/vklink/services/store/v1/promotions/promotion_grpc_service_connect';

import { PositionGrpcService } from './generated/vklink/services/cms/v1/positions/position_grpc_service_connect';
import { SettingGrpcService } from './generated/vklink/services/cms/v1/settings/setting_grpc_service_connect';
import { PostGrpcService as CmsPostGrpcService } from './generated/vklink/services/cms/v1/posts/post_grpc_service_connect';

import { OrderGrpcService as OrderReportingGrpcService } from './generated/vklink/services/reporting/v1/orders/order_grpc_service_connect';

import { ApiContext } from './provider';
import createTransport from './transport';

const useTransport = (servicePath: string) => {
  const ctx = useContext(ApiContext);

  return createTransport({
    baseUrl: `${ctx.apiUrl}/${servicePath}`,
    interceptors: [...(ctx.interceptors || [])],
    getTokenAsync: ctx.getTokenAsync,
    refreshTokenAsync: ctx.refreshTokenAsync,
  });
};

const useServiceClient = <T extends ServiceType>(
  service: T,
  transport: Transport
): PromiseClient<T> => {
  const [client] = useState(createPromiseClient(service, transport));

  return client;
};

export const useCatalogServiceClients = () => {
  const transport = useTransport('catalog');
  const provinceClient = useServiceClient(ProvinceGrpcService, transport);
  const districtClient = useServiceClient(DistrictGrpcService, transport);
  const wardClient = useServiceClient(WardGrpcService, transport);

  return {
    provinceClient,
    districtClient,
    wardClient,
  };
};

export const useStoreServiceClients = () => {
  const transport = useTransport('store');
  const partnerClient = useServiceClient(PartnerGrpcService, transport);
  const storeClient = useServiceClient(StoreGrpcService, transport);
  const productCategoryClient = useServiceClient(ProductCategoryGrpcService, transport);
  const productClient = useServiceClient(ProductGrpcService, transport);
  const couponClient = useServiceClient(CouponGrpcService, transport);
  const promotionClient = useServiceClient(PromotionGrpcService, transport);

  return {
    partnerClient,
    storeClient,
    productCategoryClient,
    productClient,
    couponClient,
    promotionClient,
  };
};

export const useObjectStorageServiceClients = () => {
  const transport = useTransport('object-storage');
  const objectStorageClient = useServiceClient(ObjectGrpcService, transport);

  return {
    objectStorageClient,
  };
};

export const useOrderServiceClients = () => {
  const transport = useTransport('ordering');
  const orderClient = useServiceClient(OrderGrpcService, transport);

  return {
    orderClient,
  };
};

export const useCustomerServiceClients = () => {
  const transport = useTransport('customer');
  const customerClient = useServiceClient(CustomerGrpcService, transport);
  const customerContactClient = useServiceClient(ContactGrpcService, transport);

  return {
    customerClient,
    customerContactClient,
  };
};

// export const useBlogServiceClients = () => {
//   const transport = useTransport('blog');
//   const [postClient] = useState(createPromiseClient(PostGrpcService, transport));
//   const [postCategoryClient] = useState(createPromiseClient(PostCategoryGrpcService, transport));
//   const [postCommentClient] = useState(createPromiseClient(PostCommentGrpcService, transport));
//   const [postTagClient] = useState(createPromiseClient(PostTagGrpcService, transport));

//   return {
//     postClient,
//     postCategoryClient,
//     postCommentClient,
//     postTagClient,
//   };
// };

export const useIdentityServiceClients = () => {
  const transport = useTransport('identity');
  const accountClient = useServiceClient(AccountGrpcService, transport);
  const permissionClient = useServiceClient(PermissionGrpcService, transport);
  const roleClient = useServiceClient(RoleGrpcService, transport);
  const identityUserClient = useServiceClient(UserGrpcService, transport);
  const permissionGroupClient = useServiceClient(PermissionGroupGrpcService, transport);

  return {
    accountClient,
    permissionGroupClient,
    permissionClient,
    roleClient,
    identityUserClient,
  };
};

export const useCMSServiceClients = () => {
  const transport = useTransport('cms');
  const positionClient = useServiceClient(PositionGrpcService, transport);
  const settingClient = useServiceClient(SettingGrpcService, transport);
  const postClient = useServiceClient(CmsPostGrpcService, transport);

  return {
    positionClient,
    settingClient,
    postClient,
  };
};

export const useReportingServiceClients = () => {
  const transport = useTransport('reporting');
  const orderClient = useServiceClient(OrderReportingGrpcService, transport);

  return {
    orderClient,
  };
};
