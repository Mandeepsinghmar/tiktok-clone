import create from 'zustand';
// TODO: Why are we using zustand? Can this be done using React Context?
import { devtools } from 'zustand/middleware';

import { base_url, fetcher } from './../utils/index';

const useUsersStore = create(
  devtools((set) => ({
    suggestedAccounts: [],
    fetchSuggestedAccounts: async () => {
      const data = await fetcher(`${base_url}/api/auth`);
      set({ suggestedAccounts: data });
    },
  }))
);

export default useUsersStore;
