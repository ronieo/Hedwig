import { User } from './User'
import { Comment } from './Comment'

export interface PostRequest {
    content: string
    img?: string
}

export interface Post extends PostRequest {
    id: number
    author: User
    likes: User[]
    comments: Comment[]
    createdAt: Date
    updatedAt: Date
}
