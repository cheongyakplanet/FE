export interface PostDto {
  sort: string;
  page: number;
}

export interface PostCommentDto {
  postId: string;
  content: string;
}
