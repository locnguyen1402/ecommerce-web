import { Route, Routes, Outlet } from 'react-router-dom';

import CategoryListPage from './CategoryListPage';
import CreateCategoryPage from './CreateCategoryPage';
import EditCategoryPage from './EditCategoryPage';
import CategoryDetailPage from './CategoryDetailPage';

const FeatureRoutes = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route path="create" element={<CreateCategoryPage />} />
      <Route path=":id/edit" element={<EditCategoryPage />} />
      <Route path=":id" element={<CategoryDetailPage />} />
      <Route index element={<CategoryListPage />} />
    </Route>
  </Routes>
);

export default FeatureRoutes;
