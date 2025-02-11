import { create } from 'zustand';
import axiosInstance from "@/util/axios-instance";
import { error } from 'console';

interface AuthState {
  token: string | null,
  login: (email: string, password: string) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,

  login: async (email, password) => {
    try {
      const response = await axiosInstance.post("/member/login", { email, password });
      if(response.data.status == 'success') {
        const accessToken = response.data.data.accessToken;
        localStorage.setItem("token", accessToken);
        set({ token: accessToken });
      } else {
        throw new Error;
      }
      
    } catch (error) {
      console.error("Failed Login", error);
      throw error;
    }
  }
}))