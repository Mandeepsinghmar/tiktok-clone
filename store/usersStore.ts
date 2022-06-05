// @ts-nocheck

import create from 'zustand'
import { devtools } from 'zustand/middleware';

const useUsersStore = create(devtools(set => ({
  suggestedAccounts:[],
  fetchSuggestedAccounts: async () => {
       const res = await fetch('http://localhost:3000/api/auth');
       const data = await res.json();
        set({ suggestedAccounts:data })
    },
})))


export default useUsersStore;