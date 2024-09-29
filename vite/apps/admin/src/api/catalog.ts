const CATALOG_GROUP = 'inventory/directories';

export const CATALOG_API_URLS = {
  PROVINCES: `${CATALOG_GROUP}/provinces`,
  DISTRICTS: `${CATALOG_GROUP}/provinces/:id/districts`,
  WARDS: `${CATALOG_GROUP}/provinces/districts/:id/wards`,
};
