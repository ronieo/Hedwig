/** @type {import('next').NextConfig} */

if (!process.env.NEXT_PUBLIC_SERVER_URL) {
    throw new Error('NEXT_PUBLIC_SERVER_URL is not defined')
}

const nextConfig = {
    reactStrictMode: true,
    env: {
        customKey: process.env.NEXT_PUBLIC_SERVER_URL,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fe4-react5-hedwig.s3.ap-northeast-2.amazonaws.com', // s3 서버 주소로 설정
                port: '',
                pathname: '**',
            },
        ],
    },
}

module.exports = nextConfig
