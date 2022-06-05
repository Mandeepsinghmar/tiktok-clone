// @ts-nocheck

import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const authStore = (set) => ({
  userProfile: {},
  searchText: '',
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
  setSearchText: (value: any) => set({ searchText: value }),
});

const useAuthStore = create(
  devtools(
    persist(authStore, {
      name: 'auth',
    })
  )
);

export default useAuthStore;
