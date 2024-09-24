import { lazy, FC, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

import { MasterLayout, WithChildren, KTUtil } from '@vklink/metronic-core';

import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper';
import { APP_ROUTES } from '@/constants';

const PrivateRoutes = () => {
  const MerchantRoutes = lazy(() => import('../pages/merchants/MerchantRoutes'));
  const CategoryRoutes = lazy(() => import('../pages/categories/CategoryRoutes'));
  const ProductRoutes = lazy(() => import('../pages/products/ProductRoutes'));
  const ShopCollectionRoutes = lazy(() => import('../pages/shop-collections/ShopCollectionRoutes'));
  const ProductAttributeRoutes = lazy(
    () => import('../pages/product-attributes/ProductAttributeRoutes')
  );

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registration */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />

        <Route
          path={APP_ROUTES.merchants.base}
          element={
            <SuspendedView>
              <MerchantRoutes />
            </SuspendedView>
          }
        />

        <Route
          path={APP_ROUTES.categories.base}
          element={
            <SuspendedView>
              <CategoryRoutes />
            </SuspendedView>
          }
        />

        <Route
          path={APP_ROUTES.shopCollections.base}
          element={
            <SuspendedView>
              <ShopCollectionRoutes />
            </SuspendedView>
          }
        />
        <Route
          path={APP_ROUTES.products.base}
          element={
            <SuspendedView>
              <ProductRoutes />
            </SuspendedView>
          }
        />

        <Route
          path={APP_ROUTES.productAttributes.base}
          element={
            <SuspendedView>
              <ProductAttributeRoutes />
            </SuspendedView>
          }
        />

        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspendedView: FC<WithChildren> = ({ children }) => {
  const baseColor = KTUtil.getCSSVariableValue('--bs-primary');
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
