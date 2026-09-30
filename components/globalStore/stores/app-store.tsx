import { createStore } from 'zustand/vanilla';

export type AppState = {
  menuePage: number;
};

export type AppActions = {
  setMenuePage: (page: number) => void;
};

export type AppStore = AppState & AppActions;

export const defaultInitState: AppState = {
  menuePage: 0,
};

export const createAppStore = (initState: AppState = defaultInitState) => {
  return createStore<AppStore>()((set) => ({
    ...initState,
    setMenuePage: (menuePage) => set({ menuePage }),
  }));
};