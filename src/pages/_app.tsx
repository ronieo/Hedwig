import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {},
    },
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
    )
}
