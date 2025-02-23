// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import NavBar from "@/components/navbar";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
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
export default App