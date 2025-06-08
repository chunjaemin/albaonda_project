import { create } from 'zustand';

export const useSidebarStateStore = create((set) => ({
  isSidebar: false,
  doSwitch: () => set((state) => ({ isSidebar: !state.isSidebar })),
}));

export const useLoginStore = create((set) => ({
  isLogin: false,
  setLogin: () => set((state) => ({ isLogin: !state.isLogin })),
}));

export const useCurrentSpaceNameStore = create((set)=>({
  name: "",
  setName: (newName) => set(() => ({ name: newName }))
}));


export const useCurrentTeamIdStore = create((set)=>({
  teamId: null,
  setId: (newId) => set(() => ({ teamId: newId }))
}));


export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));