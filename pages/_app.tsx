import { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import '@shared/globals.ts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
