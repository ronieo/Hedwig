import { SignUpRequest, SignUpResponse } from '@/types/Auth'
import { axiosInstance } from './axios'

export const register = async (signUpData: SignUpRequest) => {
    const { data } = await axiosInstance.post<SignUpResponse>('/register', signUpData)
    return data
}
