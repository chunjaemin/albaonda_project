import { create } from 'zustand';

export const useSidebarStateStore = create((set) => ({
  isSidebar: false,
  doSwitch: () => set((state) => ({ isSidebar: !state.isSidebar })),

   selectedTeamName: '맘스터치 팀공간',
  setSelectedTeamName: (name) => set({ selectedTeamName: name }),
}));

export const useLoginStore = create((set) => ({
  isLogin: false,
  setLogin: () => set((state) => ({ isLogin: !state.isLogin })),
}));
