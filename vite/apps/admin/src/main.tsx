import '@mila/metronic-core/style.scss';

import { createRoot } from 'react-dom/client';

import { Chart, registerables } from '@mila/metronic-core';
import { QueryClient, QueryClientProvider } from '@mila/api';

import { AppRoutes } from './app/routing/AppRoutes';
import { AuthProvider } from './app/modules/auth';
import { StoreProvider, createRootStore } from './stores';

Chart.register(...registerables);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const container = document.getElementById('root');
const rootStore = createRootStore();

if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StoreProvider value={rootStore}>
          <AppRoutes />
        </StoreProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
