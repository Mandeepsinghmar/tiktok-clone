import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IUser } from '../types';

const authStore = (set: (arg0: { userProfile: IUser }) => any) => ({
  userProfile: null,
  addUser: (user: any) => set({ userProfile: user }),
  // @ts-ignore
  removeUser: () => set({ userProfile: null }),
});

const useAuthStore = create(
  devtools(
    // @ts-ignore
    persist(authStore, {
      name: 'auth',
    })
  )
);

export default useAuthStore;
