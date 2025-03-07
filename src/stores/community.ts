import { create } from 'zustand';

import api from '@/lib/api';

interface Content {
  id: number;
  title: string;
  content: string;
  username: string;
  createdAt: string;
}

interface AllPostState {
  contents: Content[];
  totalPages: number;
}

interface PostActions {
  updatePost: (data: AllPostState) => void;
}

export const useAllPostStore = create<AllPostState & PostActions>((set, get) => ({
  contents: [],
  totalPages: 0,
  updatePost: (data) => set({ contents: data.contents, totalPages: data.totalPages }),
}));