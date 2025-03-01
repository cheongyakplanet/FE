import axiosInstance from '@/util/axios-instance';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import cookieStorage from '@/lib/cookie-storage';

interface signupState {
  email: string;
  password: string;
  name: string;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

export const useSignupStore = create<signupState>((set) => ({
  email: '',
  password: '',
  name: '',

  signup: async (email, password, username) => {
    try {
      const response = await axiosInstance.post('/member/signup', { email, password, username });
      if (response.data.status == 'fail') throw new Error('Failed Signup');
      const signupInfo = response.data.data;
      set({ email: signupInfo.email, password: signupInfo.password, name: signupInfo.username });
    } catch (error) {
      console.error('Failed Signup', error);
      throw error;
    }
  },
}));

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
