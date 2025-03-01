import axiosInstance from '@/util/axios-instance';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface signinState {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
}

interface signupState {
  email: string;
  password: string;
  name: string;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

export const useSigninStore = create<signinState>()(
  persist(
    (set) => ({
      token: null,

      login: async (email, password) => {
        try {
          const response = await axiosInstance.post('/member/login', { email, password });
          if (response.data.status == 'fail') throw new Error('Failed Login');
          const accessToken = response.data.data.accessToken;
          // localStorage.setItem('token', accessToken);
          set({ token: accessToken });
        } catch (error) {
          console.error('Failed Login', error);
          throw error;
        }
      },
    }),
    {
      name: 'token',
      partialize: (state) => ({ token: state.token }),
    },
  ),
);

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
