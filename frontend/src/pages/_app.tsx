import NavBar from "@/components/navbar";
import "@/styles/globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="app-container">
      <main className="main-content">
        <AppRouterCacheProvider>
          <NavBar />
          <Component {...pageProps} />
        </AppRouterCacheProvider>
      </main>
    </div>
  );
}