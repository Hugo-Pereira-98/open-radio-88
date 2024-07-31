import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import * as z from 'zod';
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaSuitcase,
  FaComment,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { useState } from 'react';

import LightLogo from '../../public/assets/88Light.png';
import DarkLogo from '../../public/assets/88Dark.png';
import AppStore from '../../public/assets/AppStore.png';
import PlayStore from '../../public/assets/PlayStore.png';
import PicturesCarousel from '../../public/assets/PicturesCarousel.png';
import PillImages from '../../public/assets/PillImages.png';
import Office from '../../public/assets/Office.JPG';
import Devices from '../../public/assets/Devices.png';
import '../styles/globals.css';

import { ToastProvider } from '@/contexts/ToastContext';

const inter = Inter({ subsets: ['latin'] });

const formSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().min(1, { message: 'Telefone é obrigatório' }),
  subject: z.string().min(1, { message: 'Assunto é obrigatório' }),
  message: z.string().min(1, { message: 'Mensagem é obrigatória' }),
});

export default function App({ Component, pageProps }: AppProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit = () => {
    const result = formSchema.safeParse({
      name,
      email,
      phone,
      subject,
      message,
    });
    if (result.success) {
      console.log({ name, email, phone, subject, message });
    } else {
      result.error.errors.forEach((error) => {
        alert(error.message);
      });
    }
  };

  return (
    <>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <main className={`${inter.className} h-screen bg-gray-900 relative`}>
        <ToastProvider>
          <div className="absolute w-full p-4 flex items-center justify-between z-30 bg-black bg-opacity-50">
            <Image src={LightLogo} alt="LightLogo" height={48} />
            <div className="flex space-x-3">
              <FaYoutube
                className="hover:text-yellow-700 text-yellow-500 h-7 w-7 cursor-pointer"
                onClick={() => window.open('https://www.youtube.com', '_blank')}
              />
              <FaLinkedin
                className="hover:text-yellow-700 text-yellow-500 h-7 w-7 cursor-pointer"
                onClick={() =>
                  window.open('https://www.instagram.com/radio88fm/', '_blank')
                }
              />
              <FaInstagram
                className="hover:text-yellow-700 text-yellow-500 h-7 w-7 cursor-pointer"
                onClick={() =>
                  window.open('https://www.instagram.com', '_blank')
                }
              />
              <FaFacebook
                className="hover:text-yellow-700 text-yellow-500 h-7 w-7 cursor-pointer"
                onClick={() =>
                  window.open(
                    'https://www.facebook.com/radio88oficial/',
                    '_blank'
                  )
                }
              />
            </div>
          </div>
          <div className="relative sm:h-[600px] h-[650px] sm:flex sm:flex-row">
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-900 bg-opacity-70 text-white p-6 z-20 sm:relative sm:flex-1 sm:bg-transparent sm:z-10 h-full">
              <div className="flex flex-col gap-6 h-full justify-center">
                <div className="text-start">
                  <p className="font-bold text-6xl mb-6">
                    A vitória é do
                    <br />
                    povo de Deus
                  </p>
                  <p className="text-xl">
                    A rádio que você sempre ouviu,
                    <br />
                    agora também pode assistir.
                  </p>
                </div>
                <div className="flex space-x-4 items-start w-full">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-4xl w-36"
                    onClick={openModal}
                  >
                    Assistir
                  </button>
                  <button
                    className="bg-gray-700 text-white py-2 px-4 rounded-4xl w-36"
                    onClick={openModal}
                  >
                    Ouvir
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 absolute bottom-0 sm:relative sm:bottom-auto sm:mt-4">
                <a
                  href="https://wa.me/5524998680088"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FaWhatsapp className="h-7 w-7 text-green-500" />
                  <p className="text-lg leading-[22px]">
                    Envie-nos
                    <br />
                    uma mensagem
                  </p>
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center absolute inset-0 sm:relative sm:flex-1 sm:z-0 h-full w-full">
              <div className="w-auto h-full bg-green-950">
                <Image
                  src={PillImages}
                  alt="PillImages"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
          <div className="w-full bg-white">
            <div className="relative w-full sm:w-2/3 h-[400px] bg-white mx-auto p-6 pb-0">
              <p className="text-center text-xl">
                DAMOS GRAÇAS A DEUS PELO QUE PASSOU <br />
                PELO DIA DE HOJE E PELO DIA QUE VIRÁ.
              </p>
              <div className="flex h-full relative gap-3">
                <div className="flex-1 flex flex-col justify-center p-4">
                  <p className="text-justify">
                    A Rádio 88 FM foi fundada em 1986, em Volta Redonda, porém,
                    a história da emissora começou, de fato, em primeiro de
                    agosto de 1994, quando passou a ser administrada pelo então
                    operador de áudio Edson Albertassi, se tornou genuinamente
                    evangélica e passou a transmitir canções e palavras de amor
                    e paz. Em 30 anos de existência, a emissora cresceu,
                    conquistando a maior audiências do Sul do Estado. A 88 FM é
                    hoje referência em qualidade de programação e
                    responsabilidade social.
                  </p>
                </div>
                <div className="relative h-full w-2/5">
                  <Image
                    src={Office}
                    alt="Office"
                    layout="fill"
                    objectFit="contain"
                    className="h-full w-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-pink-950">
            <Image
              src={PicturesCarousel}
              alt="PicturesCarousel"
              layout="responsive"
              objectFit="contain"
            />
          </div>

          <div className="relative sm:h-[600px] h-[650px] sm:flex sm:flex-row bg-gray-900">
            <div className="flex flex-col items-center justify-center w-full h-full p-6">
              <p className="text-center text-white text-2xl mb-6">
                <strong>ABENÇOANDO</strong>, DIA APÓS DIA, <br />
                <strong>CENTENAS DE MILHARES</strong> DE CASAS
              </p>
              <div className="relative w-full h-[400px] mb-6">
                <Image
                  src={Devices}
                  alt="Devices"
                  layout="fill"
                  objectFit="contain"
                  className="h-full w-auto"
                />
              </div>
              <div className="flex gap-5">
                <div className="relative w-[120px] h-[40px]">
                  <Image
                    src={AppStore}
                    alt="AppStore"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="relative w-[120px] h-[40px]">
                  <Image
                    src={PlayStore}
                    alt="PlayStore"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white flex flex-col items-center">
            <p className="pt-4 text-5xl">
              <strong>FALE CONOSCO</strong>
            </p>
            <div className="w-full flex flex-col sm:flex-row gap-6 p-4">
              <div className="w-full sm:w-1/3 p-4 border border-gray-300 rounded">
                <p className="text-lg flex items-center">
                  <FaSuitcase className="text-red-500 mr-2" />
                  <strong>Dep. Comercial</strong>
                </p>
                <p className="ml-6 mb-2">
                  Tel:{' '}
                  <a href="tel:+242433388020"> (24) 3338-8020 Ramal - 209</a>
                  <br />
                  Email:{' '}
                  <a href="mailto:comercial@radio88.com">
                    comercial@radio88.com
                  </a>
                </p>
                <p className="text-lg flex items-center mt-4">
                  <FaComment className="text-red-500 mr-2" />
                  <strong>Atendimento</strong>
                </p>
                <p className="ml-6 mb-2">
                  Tel: <a href="tel:+242433388020"> (24) 3338-8020</a>
                  <br />
                  Email:{' '}
                  <a href="mailto:contato@radio88.com">contato@radio88.com</a>
                </p>
                <p className="text-lg flex items-center mt-4">
                  <FaMapMarkerAlt className="text-red-500 mr-2" />
                  <strong>Rua Moacyr de Paula Lobo, 304</strong>
                </p>
                <p className="ml-6">
                  <a
                    href="https://maps.google.com/?q=Rua Moacyr de Paula Lobo, 304, Limoeira - Volta Redonda - RJ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Limoeira - Volta Redonda - RJ
                  </a>
                </p>
              </div>

              <div className="w-full sm:w-2/3">
                <p className="text-lg mb-4">
                  Se você deseja anunciar na Rádio 88FM, preencha o formulário
                  abaixo e aguarde o nosso contato.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col space-y-4 w-full sm:w-1/2">
                    <input
                      type="text"
                      placeholder="Nome*"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="email"
                      placeholder="Email*"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="tel"
                      placeholder="Telefone*"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex flex-col space-y-4 w-full sm:w-1/2">
                    <input
                      type="text"
                      placeholder="Assunto*"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    />
                    <textarea
                      placeholder="Mensagem*"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="p-2 border border-gray-300 rounded h-24"
                    />
                    <button
                      onClick={handleSubmit}
                      className="bg-red-500 text-white py-2 px-4 rounded"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[180px] sm:flex sm:flex-row bg-gray-900"></div>
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
              onClick={closeModal}
            >
              <div
                className="bg-white p-6 rounded shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <audio
                  controls
                  src="https://stm39.srvstm.com:9776/stream"
                ></audio>
              </div>
            </div>
          )}
        </ToastProvider>
      </main>
    </>
  );
}
