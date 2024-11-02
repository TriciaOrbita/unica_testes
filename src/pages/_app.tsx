import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "leaflet/dist/leaflet.css"
import "../styles/globals.css"

import type { AppProps } from "next/app"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}
