export const APP_ROUTES = {
  merchants: {
    base: 'merchants/*',
    root: '/merchants',
    detail: '/merchants/:id',
    create: '/merchants/create',
    edit: '/merchants/:id/edit',
  },
  categories: {
    base: 'categories/*',
    root: '/categories',
    detail: '/categories/:id',
    create: '/categories/create',
    edit: '/categories/:id/edit',
  },
  shopCollections: {
    base: 'collections/*',
    root: '/collections',
    detail: '/collections/:id',
    create: '/collections/create',
    edit: '/collections/:id/edit',
  },
  products: {
    base: 'products/*',
    root: '/products',
    detail: '/products/:id',
    create: '/products/create',
    edit: '/products/:id/edit',
  },
  productAttributes: {
    base: 'product-attributes/*',
    root: '/product-attributes',
    detail: '/product-attributes/:id',
    create: '/product-attributes/create',
    edit: '/product-attributes/:id/edit',
  },
};
