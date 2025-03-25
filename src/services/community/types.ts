export interface PostDto {
  sort: string;
  page: number;
}

export interface PostCommentDto {
  postId: string;
  content: string;
}

export interface NewPostDto {
  title: string;
  content: string;
}

export interface PostReplyDto {
  commentId: string;
  content: string;
}
