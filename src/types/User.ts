import { PostResponseData } from "./Post"


export interface User {
    username: string
}

export interface UserResponse extends User {
    likes: number
    posts: PostResponseData[]
}

