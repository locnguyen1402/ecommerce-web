import { Route, Routes, Outlet } from 'react-router-dom';

import ProductAttributeListPage from './ProductAttributeListPage';

const ProductAttributeRoutes = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route index element={<ProductAttributeListPage />} />
    </Route>
  </Routes>
);

export default ProductAttributeRoutes;
