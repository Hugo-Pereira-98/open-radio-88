import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa';

import Logo from '../../public/assets/88Light.png';
import '../styles/globals.css';

import { ToastProvider } from '@/contexts/ToastContext';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <main
        className={`${inter.className} h-screen bg-gray-900 flex flex-col justify-center items-center`}
      >
        <ToastProvider>
          <div className="flex flex-col gap-6 items-center">
            <Image src={Logo} alt="Logo" height={150} />
            <div className="text-center">
              <p className="text-gray-300">
                <span className="font-bold">Em breve</span>, a rádio que você
                sempre ouviu,
                <br />
                de um jeito que você nunca viu.
              </p>
            </div>
            <audio controls src="https://stm39.srvstm.com:9776/stream"></audio>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/radio88oficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaFacebook className="h-9 w-9 text-white" />
              </a>
              <a
                href="https://www.instagram.com/radio88fm/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaInstagram className="h-9 w-9 text-white" />
              </a>
              <a
                href="https://wa.me/5524998680088"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaWhatsapp className="h-9 w-9 text-white" />
              </a>
            </div>
          </div>
        </ToastProvider>
      </main>
    </>
  );
}
