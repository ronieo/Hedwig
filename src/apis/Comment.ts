import { CommentRequest, CommentUpdateRequest } from '@/types/Comment'
import { axiosInstance } from './axios'

export const getComments = async (postId: number) => {
    const response = await axiosInstance.get(`/comment/${postId}`)
    return response.data
}

export const createComment = async ({ postId, content }: CommentRequest) => {
    const response = await axiosInstance.post(`/comment`, { postId, content })
}
export const updateComment = async ({ commentId, comment }: CommentUpdateRequest) => {
    const response = await axiosInstance.put(`/comment/${commentId}`, { comment })
}
export const deleteComment = async (commentId: number) => {
    const response = await axiosInstance.delete(`/comment/${commentId}`)
}
