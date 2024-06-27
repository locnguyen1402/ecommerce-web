import { Route, Routes, Outlet } from 'react-router-dom';

import ProductListPage from './ProductListPage';
import ProductDetailPage from './ProductDetailPage';
import CreateProductPage from './CreateProductPage';
// import EditProductPage from './EditProductPage';

const ProductRoutes = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route path="create" element={<CreateProductPage />} />
      <Route path=":id" element={<ProductDetailPage />} />
      {/* <Route path=":id/edit" element={<EditProductPage />} />
      <Route path=":id" element={<ProductDetailPage />} /> */}
      <Route index element={<ProductListPage />} />
    </Route>
  </Routes>
);

export default ProductRoutes;
