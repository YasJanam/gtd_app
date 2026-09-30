'use client';

import { ReactNode, createContext, useState, useContext } from 'react';
import { useStore } from 'zustand';

import { AppStore, createAppStore } from '../stores/app-store';

export type AppStoreApi = ReturnType<typeof createAppStore>;

export const AppStoreContext = createContext<AppStoreApi | undefined>(undefined);

export const AppStoreProvider = ({ children }: { children: ReactNode }) => {
  const [store] = useState(() => createAppStore());

  return (
    <AppStoreContext.Provider value={store}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const appStoreContext = useContext(AppStoreContext);

  if (!appStoreContext) {
    throw new Error('useAppStore must be used within AppStoreProvider');
  }

  return useStore(appStoreContext, selector);
};