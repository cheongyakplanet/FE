// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface DetailPost {
//   id: number;
//   username: string;
//   title: string;
//   content: string;
//   views: number;
//   likes: number;
//   comments: Comment[];
//   createdAt: string;
// }

// interface Comment {
//   content: string;
//   replies: Reply[];
// }

// interface Reply {
//   content: string;
// }

// interface DetailPostActions {
//   updateDetailPost: (data: DetailPost) => void;
// }

// export const useDetailPostStore = create<DetailPost & DetailPostActions>()(
//   persist(
//     (set) => ({
//       id: 0,
//       username: '',
//       title: '',
//       content: '',
//       views: 0,
//       likes: 0,
//       comments: [],
//       createdAt: '',
//       updateDetailPost: (data) => set(data),
//     }),
//     {
//       name: 'detailPost',
//     },
//   ),
// );
