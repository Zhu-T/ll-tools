// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import NavBar from "@/components/navbar";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { AppProps } from "next/app";
import Lease2 from './ll-tools-formats/Lease2';

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="app-container">
      <main className="main-content">
        <AppRouterCacheProvider>
          <NavBar />
          <Lease2 />
          <Component {...pageProps} />
        </AppRouterCacheProvider>
      </main>
    </div>
  );
}
export default App