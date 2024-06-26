import { Route, Routes, Outlet } from 'react-router-dom';
import ProductCategoryListPage from './ProductCategoryListPage';
import CreateProductCategoryPage from './CreateProductCategoryPage';
import EditProductCategoryPage from './EditProductCategoryPage';
import ProductCategoryDetailPage from './ProductCategoryDetailPage';

const ProductCategoryRoutes = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route path="create" element={<CreateProductCategoryPage />} />
      <Route path=":id/edit" element={<EditProductCategoryPage />} />
      <Route path=":id" element={<ProductCategoryDetailPage />} />
      <Route index element={<ProductCategoryListPage />} />
    </Route>
  </Routes>
);

export default ProductCategoryRoutes;
