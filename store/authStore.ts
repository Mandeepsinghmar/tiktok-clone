import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IUser } from '../types';

const authStore = (set: (arg0: { userProfile: IUser }) => any) => ({
  userProfile: {},
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: {} }),
});

const useAuthStore = create(
  devtools(
    persist(authStore, {
      name: 'auth',
    })
  )
);

export default useAuthStore;
