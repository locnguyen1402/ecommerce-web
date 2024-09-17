import { Route, Routes, Outlet } from 'react-router-dom';

import MerchantListPage from './MerchantListPage';
import CreateMerchantPage from './CreateMerchantPage';
import EditMerchantPage from './EditMerchantPage';
import MerchantDetailPage from './MerchantDetailPage';

const FeatureRoutes = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route path="create" element={<CreateMerchantPage />} />
      <Route path=":id/edit" element={<EditMerchantPage />} />
      <Route path=":id" element={<MerchantDetailPage />} />
      <Route index element={<MerchantListPage />} />
    </Route>
  </Routes>
);

export default FeatureRoutes;
