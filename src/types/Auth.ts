export interface SignUpRequest {
    username: string
    email: string
    password: string
}

export interface SignInRequest {
    email: string
    password: string
}

export interface SignUpResponse {
    accessToken: string
    user: {
        username: string
        email: string
        createdAt: Date
        updatedAt: Date
    }
}
