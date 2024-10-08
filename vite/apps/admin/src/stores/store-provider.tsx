import { createContext } from 'react';

import { RootStore } from './root-store';

export const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider = StoreContext.Provider;
