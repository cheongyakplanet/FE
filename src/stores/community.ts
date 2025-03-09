import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

interface DetailPost {
  username: string;
  title: string;
  content: string;
  views: number;
  likes: number;
  comments: Comment[];
  createdAt: string;
}

interface Comment {
  content: string;
  replies: Reply[];
}

interface Reply {
  content: string;
}

interface DetailPostActions {
  updateDetailPost: (data: DetailPost) => void;
}

export const useAllPostStore = create<AllPostState & PostActions>((set) => ({
  contents: [],
  totalPages: 0,
  updatePost: (data) => set({ contents: data.contents, totalPages: data.totalPages }),
}));

export const useDetailPostStore = create<DetailPost & DetailPostActions>()(
  persist(
    (set) => ({
      username: '',
      title: '',
      content: '',
      views: 0,
      likes: 0,
      comments: [],
      createdAt: '',
      updateDetailPost: (data) => set(data),
    }),
    {
      name: 'detailPost',
    },
  ),
);
