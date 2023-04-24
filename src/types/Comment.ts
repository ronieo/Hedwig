import { User } from './User';

export interface CommentRequest {
  content: string
  postId: number
}

export interface Comment extends CommentRequest {
  commentId: number
  author: User
  createdAt: Date
  updatedAt: Date
}