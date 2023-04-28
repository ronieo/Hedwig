export interface CommentRequest {
  content: string
  postId: number
}

export interface CommentUpdateRequest {
  commentId: number
  comment: string
}

export interface Comment extends CommentRequest {
  commentId: number
  userName: string
  createdAt: Date
  updatedAt: Date
}