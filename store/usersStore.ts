import create from 'zustand';
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
