import { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';

import '../styles/globals.css';

import { ToastProvider } from '@/contexts/ToastContext';
import { useRouter } from 'next/router';

const OpenSans = Open_Sans({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <main
        className={`${OpenSans.className} h-screen bg-[#1a171e] relative w-screen`}
      >
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </main>
    </>
  );
}
