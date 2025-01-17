import { SignInRequest, SignUpRequest, AuthResponse, userPayload } from '@/types/Auth'
import { axiosInstance } from './axios'
import { removeCookie } from '@/utils/cookies'

export const register = async (signUpData: SignUpRequest) => {
    const { data } = await axiosInstance.post<AuthResponse>('/register', signUpData)
    return data
}

export const login = async (signInData: SignInRequest) => {
    const { data } = await axiosInstance.post<AuthResponse>('/login', signInData)
    return data
}

export const logout = async () => {
    const { data } = await axiosInstance.post<AuthResponse>('/logout')
    removeCookie('accessToken')
    return data
}

export const verify = async () => {
    const { data } = await axiosInstance.get<userPayload>('/verify')
    return data
}

export const refresh = async () => {
    const { data } = await axiosInstance.get<AuthResponse>('/refresh')
    return data
}
