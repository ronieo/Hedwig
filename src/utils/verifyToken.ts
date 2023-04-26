import { useState } from 'react'
import { useQuery } from 'react-query'
import { refresh, verify } from '@/apis/Auth'
import { getCookie, setCookie } from '../utils/cookies'

type AuthType = 'PENDING' | 'SUCCESS' | 'FAILED'

function verifyToken() {
    const [isAuthenticated, setIsAuthenticated] = useState<AuthType>('PENDING')
    const verifyResult = useQuery(['auth', 'verify'], verify, {
        enabled: !!getCookie('accessToken'), // 값이 없으면 undefined. 값을 boolean으로 변환
        // 유효하다면
        onSuccess: () => {
            setIsAuthenticated('SUCCESS')
        },
        // 유효하지 않다면
        onError: () => {
            setIsAuthenticated('FAILED')
        },
        retry: 0,
    })

    // 엑세스 토큰이 없을 때
    const refreshResult = useQuery(['auth', 'refresh'], refresh, {
        enabled: !getCookie('accessToken'), // 엑세스 토큰이 없을 때에만 refresh 요청 전송
        onSuccess: (data) => {
            setCookie('accessToken', data.accessToken, {
                path: '/',
                maxAge: data.content.exp - data.content.iat,
            })
            setIsAuthenticated('SUCCESS')
        },
        onError: () => {
            setIsAuthenticated('FAILED')
        },
        retry: 0,
    })

    return isAuthenticated
}

export default verifyToken