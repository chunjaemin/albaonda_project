import { create } from 'zustand';

export const useSidebarStateStore = create((set) => ({
  isSidebar: false,
  doSwitch: () => set((state) => ({ isSidebar: !state.isSidebar })),
}));

export const useLoginStore = create((set) => ({
  isLogin: false,
  setLogin: () => set((state) => ({ isLogin: !state.isLogin })),
}));