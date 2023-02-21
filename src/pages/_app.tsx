import "../styles/globals.css";
import type { AppProps } from "next/app";
import queryClient from "../service/query";
import { ModalsProvider } from "../context/ModalsContext";
import { SearchContextProvider } from "../context/SearchContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "../context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchContextProvider>
        <AuthContextProvider>
          <SearchContextProvider>
            <ModalsProvider>
              <Component {...pageProps} />
            </ModalsProvider>
          </SearchContextProvider>
        </AuthContextProvider>
      </SearchContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
