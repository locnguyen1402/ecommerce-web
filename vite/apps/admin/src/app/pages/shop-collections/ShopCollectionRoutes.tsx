import { Route, Routes, Outlet } from 'react-router-dom';

import ShopCollectionListPage from './ShopCollectionListPage';
import CreateShopCollectionPage from './CreateShopCollectionPage';
import EditShopCollectionPage from './EditShopCollectionPage';
import ShopCollectionDetailPage from './ShopCollectionDetailPage';

const FeatureRoutes = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route path="create" element={<CreateShopCollectionPage />} />
      <Route path=":id/edit" element={<EditShopCollectionPage />} />
      <Route path=":id" element={<ShopCollectionDetailPage />} />
      <Route index element={<ShopCollectionListPage />} />
    </Route>
  </Routes>
);

export default FeatureRoutes;
