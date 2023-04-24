import { PostRequest, Post } from '@/types/Post'
import { axiosInstance } from './axios'
import { instance } from './instance'

export const createPost = async (createPostData: PostRequest) => {
    const { data } = await axiosInstance.post<Post>('/post', createPostData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    console.log(data)
}

export const getPost = async (id: string) => {
    const response = await instance.get(`/posts/${id}`)
    return response.data
}
