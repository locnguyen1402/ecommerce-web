import { lazy, FC, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

import { MasterLayout, WithChildren, KTUtil } from '@vklink/metronic-core';

import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper';

const PrivateRoutes = () => {
  const ProductRoutes = lazy(() => import('../pages/products/ProductRoutes'));
  const ProductCategoryRoutes = lazy(
    () => import('../pages/product-categories/ProductCategoryRoutes')
  );
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
          path="products/*"
          element={
            <SuspendedView>
              <ProductRoutes />
            </SuspendedView>
          }
        />

        <Route
          path="product-categories/*"
          element={
            <SuspendedView>
              <ProductCategoryRoutes />
            </SuspendedView>
          }
        />

        <Route
          path="product-attributes/*"
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
