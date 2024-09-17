const PRODUCT_GROUP = '/inventory/products';
const CATEGORY_GROUP = '/inventory/categories';
const MERCHANT_GROUP = '/inventory/merchants';

export const INVENTORY_API_URLS = {
  CATEGORIES: `${CATEGORY_GROUP}`,
  CATEGORY_DETAIL: `${CATEGORY_GROUP}/:id`,

  MERCHANTS: `${MERCHANT_GROUP}`,
  MERCHANT_DETAIL: `${MERCHANT_GROUP}/:id`,

  PRODUCTS: `${PRODUCT_GROUP}`,
  PRODUCT_DETAIL: `${PRODUCT_GROUP}/:id`,

  PRODUCT_ATTRIBUTES: `${PRODUCT_GROUP}/attributes`,
  PRODUCT_ATTRIBUTE_DETAIL: `${PRODUCT_GROUP}/attributes/:id`,
};
