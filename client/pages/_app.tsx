import React from 'react';
import type { AppProps } from 'next/app';
import { AppProvider } from '../context/app';

import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default App;