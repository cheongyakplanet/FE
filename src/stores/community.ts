import {create} from "zustand";
import axiosInstance from "@/util/axios-instance";

interface Content {
  id: number,
  title: string,
  content: string,
  username: string,
  createdAt: string 
}

interface AllPostState {
  contents: Content[],
  allPost: () => Promise<void>

}

export const useAllPostStore = create<AllPostState>((set, get) => ({
  contents: [],

  allPost: async () => {
    try {
      const response = await axiosInstance.get("/community/posts");
      if(JSON.stringify(get().contents) !== JSON.stringify(response.data.content))
        set({contents: response.data.content});
      console.log("전체 커뮤니티 게시글", response.data);
    } catch(error) {
      console.error("Failed Get All Post: ", error);
      throw error;
    }
  }
}))