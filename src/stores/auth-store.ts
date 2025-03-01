import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import cookieStorage from '@/lib/cookie-storage';

/** token store */
type TokenState = {
  accessToken: string | null;
  refreshToken: string | null;
};
type TokenActions = {
  updateToken: (data: TokenState) => void;
  logout: () => void;
};
const tokenInitialState: TokenState = {
  accessToken: null,
  refreshToken: null,
};

export const useTokenStore = create(
  persist<TokenState & TokenActions>(
    (set) => ({
      ...tokenInitialState,
      updateToken: (data) => set(data),
      logout: () => {
        set(tokenInitialState);
        window.location.href = '/login';
      },
    }),
    {
      name: 'cheongyakplanet-token',
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);
