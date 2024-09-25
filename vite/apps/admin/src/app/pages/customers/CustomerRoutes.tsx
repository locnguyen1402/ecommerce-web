import { Route, Routes, Outlet } from 'react-router-dom';

import CustomerListPage from './CustomerListPage';
import CreateCustomerPage from './CreateCustomerPage';
import EditCustomerPage from './EditCustomerPage';
import CustomerDetailPage from './CustomerDetailPage';

const FeatureRoutes = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route path="create" element={<CreateCustomerPage />} />
      <Route path=":id/edit" element={<EditCustomerPage />} />
      <Route path=":id" element={<CustomerDetailPage />} />
      <Route index element={<CustomerListPage />} />
    </Route>
  </Routes>
);

export default FeatureRoutes;
