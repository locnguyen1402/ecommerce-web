import { Route, Routes, Outlet } from 'react-router-dom';

import CustomerListPage from './CustomerListPage';
import CustomerDetailPage from './CustomerDetailPage';

const FeatureRoutes = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route path=":id" element={<CustomerDetailPage />} />
      <Route index element={<CustomerListPage />} />
    </Route>
  </Routes>
);

export default FeatureRoutes;
