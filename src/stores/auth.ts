import { create } from 'zustand';
import axiosInstance from "@/util/axios-instance";

interface AuthState {
  token: string | null,
  login: (email: string, password: string) => Promise<void>
}

interface signupState {
  email: string,
  password: string,
  name: string,
  signup: (email: string, password: string, name: string) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,

  login: async (email, password) => {
    try {
      const response = await axiosInstance.post("/member/login", { email, password });
      if(response.data.status == "fail") throw new Error("Failed Login");
        const accessToken = response.data.data.accessToken;
        localStorage.setItem("token", accessToken);
        set({ token: accessToken });     
    } catch (error) {
      console.error("Failed Login", error);
      throw error;
    }
  }
}))

export const useSignupStore = create<signupState>((set) => ({
  email: "",
  password: "",
  name: "",

  signup: async (email, password, name) => {
    try {
      const response = await axiosInstance.post("/member/signup", { email, password, name });
      if (response.data.status == "fail") throw new Error("Failed Signup");
      const signupInfo = response.data.data;
      set({ email: signupInfo.email, password: signupInfo.password, name: signupInfo.username });
    } catch(error) {
      console.error("Failed Signup", error);
      throw error;
    }
  }
}))