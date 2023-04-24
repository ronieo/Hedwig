import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { getCookie } from '../utils/cookies'
// import dotenv from 'dotenv'

const getAxiosInstance = () => {
    const config: AxiosRequestConfig = {
        baseURL: process.env.customKey,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    }

    const instance = axios.create(config)

    instance.defaults.timeout = 3000

    instance.interceptors.request.use(
        (request) => {
            const token = getCookie('accessToken')
            if (token) request.headers['Authorization'] = `Bearer ${token}`
            return request
        },
        (error: AxiosError) => {
            console.log(error)
            return Promise.reject(error)
        },
    )

    return instance
}

export const axiosInstance = getAxiosInstance()
