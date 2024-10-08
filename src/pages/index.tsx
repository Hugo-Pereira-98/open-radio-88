import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  FaComment,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaSuitcase,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa';
import * as z from 'zod';
const ReCAPTCHA = require('react-google-recaptcha').default;

import LightLogo from '../../public/assets/88Light.png';
import AppStore from '../../public/assets/AppStore.png';
import Balls from '../../public/assets/Balls.png';
import Devices from '../../public/assets/Devices.png';
import Office from '../../public/assets/Office.png';
import PicturesCarousel from '../../public/assets/PicturesCarousel.png';
import PillImages from '../../public/assets/PillImages.png';
import PlayStore from '../../public/assets/PlayStore.png';

import {} from '@/contexts/ToastContext';
import { useToast } from '@/hooks/useToast';
import { Spinner } from '../components/ui/Spinner';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().min(1, { message: 'Telefone é obrigatório' }),
  subject: z.string().min(1, { message: 'Assunto é obrigatório' }),
  message: z.string().min(1, { message: 'Mensagem é obrigatória' }),
});

export default function Home() {
  const { toast } = useToast();
  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [canSendEmail, setCanSendEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState<string | null>(null);

  const openModal = (type: string) => {
    setModalContent(type);
    setModalOpen(true);
  };

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState<{
      width: number | undefined;
      height: number | undefined;
    }>({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
  }

  const size = useWindowSize();
  const isSmallerThan850 = (size.width ?? 0) < 850;

  const closeModal = () => setModalOpen(false);

  const handleSubmit = async () => {
    const result = formSchema.safeParse({
      name,
      email,
      phone,
      subject,
      message,
    });

    if (result.success) {
      setLoading(true);
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            subject,
            message,
            token: captchaVerified,
          }),
        });

        const data = await response.json();
        if (response.status === 200) {
          setName('');
          setEmail('');
          setPhone('');
          setSubject('');
          setMessage('');
        } else {
          alert(`Failed to send email: ${data.error}`);
        }
      } catch (error) {
        alert('Failed to send email');
      } finally {
        setLoading(false);
      }
    } else {
      result.error.errors.forEach((error) => {
        alert(error.message);
      });
    }
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaVerified(value);
  };

  useEffect(() => {
    const result = formSchema.safeParse({
      name,
      email,
      phone,
      subject,
      message,
    });
    setCanSendEmail(result.success && captchaVerified !== null);
  }, [name, email, phone, subject, message, captchaVerified]);

  return (
    <main className={`h-screen bg-[#1a171e] relative`}>
      <div className="absolute w-full p-4 flex items-center justify-between z-30 bg-black bg-opacity-50">
        <Image src={LightLogo} alt="LightLogo" height={48} />
        <div className="flex space-x-3">
          <FaYoutube
            className="hover:text-yellow-700 text-yellow-500 h-7 w-7 cursor-pointer"
            onClick={() =>
              window.open('https://www.youtube.com/@radio88oficial', '_blank')
            }
          />
          <FaLinkedin
            className="hover:text-yellow-700 text-yellow-500 h-7 w-7 cursor-pointer"
            onClick={() =>
              window.open(
                'https://www.linkedin.com/company/radio-88-fm',
                '_blank'
              )
            }
          />
          <FaInstagram
            className="hover:text-yellow-700 text-yellow-500 h-7 w-7 cursor-pointer"
            onClick={() =>
              window.open('https://www.instagram.com/radio88fm/', '_blank')
            }
          />
          <FaFacebook
            className="hover:text-yellow-700 text-yellow-500 h-7 w-7 cursor-pointer"
            onClick={() =>
              window.open('https://www.facebook.com/radio88oficial/', '_blank')
            }
          />
        </div>
      </div>
      <div className="relative sm:h-[600px] h-[650px] sm:flex sm:flex-row">
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-[#1a171e] bg-opacity-70 text-[#f9f9f9] p-6 z-20 sm:relative sm:flex-1 sm:bg-transparent sm:z-10 h-full">
          <div className="flex flex-col gap-6 h-full justify-center relative">
            <div className="text-start relative">
              <div className="absolute top-[-50px] left-[-50px] z-0 w-[200px]">
                <Image
                  src={Balls}
                  alt="Balls"
                  layout="intrinsic"
                  objectFit="contain"
                  width={200}
                />
              </div>
              <div className="relative z-10 bg-[#1a171e] bg-opacity-75 rounded-md p-2">
                {isSmallerThan850 ? (
                  <p className="font-bold text-6xl mb-6 leading-tight">
                    A vitória é
                    <br />
                    do povo
                    <br />
                    de Deus
                  </p>
                ) : (
                  <p className="font-bold text-6xl mb-6 leading-tight">
                    A vitória é do
                    <br />
                    povo de Deus
                  </p>
                )}
                <p className="text-xl leading-relaxed">
                  A rádio que você sempre ouviu,
                  <br />
                  agora também pode assistir.
                </p>
              </div>
            </div>
            <div className="flex space-x-4 items-start w-full">
              <button
                className="bg-blue-500 text-[#f9f9f9] py-2 px-4 rounded-4xl w-36"
                onClick={() => openModal('assistir')}
              >
                Assistir
              </button>
              <button
                className="bg-gray-700 text-[#f9f9f9] py-2 px-4 rounded-4xl w-36"
                onClick={() => openModal('ouvir')}
              >
                Ouvir
              </button>
            </div>
            <div className="flex items-center justify-between gap-2 absolute bottom-0  sm:relative sm:bottom-auto sm:mt-4">
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
        </div>
        <div className="flex items-center justify-center absolute inset-0 sm:relative sm:flex-1 sm:z-0 h-full w-full">
          <div
            className={`w-auto h-full bg-green-950 ${
              isSmallerThan850 && 'pt-4'
            }`}
          >
            <Image
              src={PillImages}
              alt="PillImages"
              layout="fill"
              objectFit={isSmallerThan850 ? 'cover' : 'contain'}
            />
          </div>
        </div>
      </div>
      <div className="w-full bg-[#f9f9f9]">
        <div className="relative w-full sm:w-2/3 h-auto bg-[#f9f9f9] mx-auto p-6 py-20">
          <p className="text-center text-lg sm:text-2xl mb-6">
            "<strong>DAMOS GRAÇAS A DEUS</strong> PELO QUE PASSOU{' '}
            {isSmallerThan850 ? ' ' : <br />}
            PELO DIA DE HOJE E PELO DIA QUE VIRÁ."
          </p>

          <div className="flex flex-col sm:flex-row h-full relative gap-3 items-center">
            <div className="flex-1 flex flex-col justify-center p-4">
              <p className="text-justify text-base sm:text-lg">
                A Rádio 88 FM foi fundada em 1986, em Volta Redonda, porém, a
                história da emissora começou, de fato, em primeiro de agosto de
                1994, quando passou a ser administrada pelo então operador de
                áudio Edson Albertassi, se tornou genuinamente evangélica e
                passou a transmitir canções e palavras de amor e paz. Em 30 anos
                de existência, a emissora cresceu, conquistando a maior
                audiências do Sul do Estado. A 88 FM é hoje referência em
                qualidade de programação e responsabilidade social.
              </p>
            </div>
            <div className="relative w-full sm:w-2/5">
              <div className="w-2/3 sm:w-[400px] mx-auto">
                <Image
                  src={Office}
                  alt="Office"
                  layout="responsive"
                  objectFit="contain"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Image
          src={PicturesCarousel}
          alt="PicturesCarousel"
          layout="responsive"
          objectFit="contain"
        />
      </div>

      <div className="relative h-auto sm:h-[600px] sm:flex sm:flex-row bg-[#1a171e]">
        <div className="flex flex-col items-center justify-between w-full h-full p-10">
          <p className="text-center text-[#f9f9f9] text-base sm:text-2xl z-[50]">
            A RÁDIO QUE TRANSMITE
            <br />
            <strong>O SOM DO CÉU</strong>
          </p>
          <div className="relative w-full h-[300px] sm:h-[500px] z-[10]">
            <Image
              src={Devices}
              alt="Devices"
              layout="fill"
              objectFit="contain"
              className="h-full w-auto"
            />
          </div>
          <div className="flex gap-5 z-[50]">
            <a
              href="https://apps.apple.com/br/app/r%C3%A1dio-88-fm-o-som-do-c%C3%A9u/id1587595590?l=en-GB"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-[150px] h-[50px]"
            >
              <Image
                src={AppStore}
                alt="AppStore"
                layout="fill"
                objectFit="contain"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.radio88fm&hl=pt_BR"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-[150px] h-[50px]"
            >
              <Image
                src={PlayStore}
                alt="PlayStore"
                layout="fill"
                objectFit="contain"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-[#f9f9f9] flex flex-col items-center p-10">
        <p className="mb-2 text-base sm:text-2xl">
          <strong>FALE CONOSCO</strong>
        </p>
        <div className="w-full flex flex-col sm:flex-row gap-6 p-4">
          <div className="w-full sm:w-1/3 p-4 border border-gray-300 rounded">
            <p className="text-lg sm:text-lg flex items-center">
              <FaSuitcase className="text-red-500 mr-2 text-sm sm:text-lg" />
              <strong>Dep. Comercial</strong>
            </p>
            <p className="ml-4 sm:ml-6 mb-2 text-sm sm:text-lg">
              Tel:{' '}
              <a href="tel:+242433388820" className="hover:text-gray-500">
                (24) 3338-8820 Ramal - 209
              </a>
              <br />
              Email:{' '}
              <a
                href="mailto:comercialvpd@gmail.com"
                className="hover:text-gray-500"
              >
                comercialvpd@gmail.com
              </a>
            </p>
            <p className="text-lg sm:text-lg flex items-center mt-4">
              <FaComment className="text-red-500 mr-2 text-sm sm:text-lg" />
              <strong>Atendimento</strong>
            </p>
            <p className="ml-4 sm:ml-6 mb-2 text-sm sm:text-lg">
              Tel:{' '}
              <a href="tel:+242433388820" className="hover:text-gray-500">
                (24) 3338-8820
              </a>
              <br />
              Email:{' '}
              <a
                href="mailto:producao88fm@gmail.com"
                className="hover:text-gray-500"
              >
                producao88fm@gmail.com
              </a>
            </p>
            <a
              href="https://maps.google.com/?q=Rua Moacyr de Paula Lobo, 104 Limoeiro - Volta Redonda/RJ"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <p className="text-lg sm:text-lg flex items-center mt-4">
                <FaMapMarkerAlt className="text-red-500 mr-2 text-sm sm:text-lg" />
                <strong>Rua Moacyr de Paula Lobo, 104</strong>
              </p>
              <p className="ml-4 sm:ml-6 text-sm sm:text-lg">
                Limoeiro - Volta Redonda/RJ
              </p>
            </a>
          </div>

          <div className="w-full sm:w-2/3">
            <p className="text-lg sm:text-lg mb-4">
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
                  className="p-2 border border-gray-300 rounded text-sm sm:text-base"
                />
                <input
                  type="email"
                  placeholder="Email*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 border border-gray-300 rounded text-sm sm:text-base"
                />
                <input
                  type="tel"
                  placeholder="Telefone*"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-2 border border-gray-300 rounded text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col space-y-4 w-full sm:w-1/2">
                <input
                  type="text"
                  placeholder="Assunto*"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="p-2 border border-gray-300 rounded text-sm sm:text-base"
                />
                <textarea
                  placeholder="Mensagem*"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="p-2 border border-gray-300 rounded h-24 text-sm sm:text-base"
                />
                <ReCAPTCHA
                  sitekey="6LeHphwqAAAAAGDHOH_aUz98jRdJfz8sLDi_ry6Q"
                  onChange={handleCaptchaChange}
                />
                <button
                  onClick={handleSubmit}
                  className={`py-2 px-4 rounded text-sm sm:text-base ${
                    canSendEmail
                      ? 'bg-red-500 text-[#f9f9f9]'
                      : 'bg-gray-400 text-gray-700'
                  } flex items-center justify-center`}
                  disabled={!canSendEmail || loading}
                >
                  {loading ? <Spinner /> : 'Enviar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-auto sm:h-[180px] sm:flex sm:flex-row bg-[#1a171e] text-[#f9f9f9] flex flex-col items-center justify-center text-center p-4">
        <div className="flex flex-col items-center justify-center">
          <Image src={LightLogo} alt="LightLogo" height={48} />
          <p className="mt-3 text-sm sm:text-base">
            <a
              href="https://maps.google.com/?q=Rua Moacyr de Paula Lobo, 104, Limoeiro - Volta Redonda - RJ"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              Rua Moacyr de Paula Lobo, 104 Limoeiro - Volta Redonda/RJ
            </a>
            <br />
            Dep. Comercial:{' '}
            <a href="tel:+24243388820" className="hover:text-gray-400">
              (24) 3338-8820
            </a>{' '}
            |{' '}
            <a
              href="mailto:comercialvpd@gmail.com"
              className="hover:text-gray-400"
            >
              comercialvpd@gmail.com
            </a>
            <br />
            Atendimento:{' '}
            <a href="tel:+24243388820" className="hover:text-gray-400">
              (24) 3338-8820
            </a>{' '}
            /{' '}
            <a
              href="https://wa.me/5524998680088"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              99868-0088 WhatsApp
            </a>{' '}
            |{' '}
            <a
              href="mailto:producao88fm@gmail.com"
              className="hover:text-gray-400"
            >
              producao88fm@gmail.com
            </a>
            <br />
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]"
          onClick={closeModal}
        >
          <div
            className="bg-[#f9f9f9] p-6 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {modalContent === 'assistir' ? (
              <iframe
                style={{ width: '1280px', height: '720px' }}
                src="https://playerv.srvstm.com/video/radioenergia4369//true/false/c3RtdjEuc3J2c3RtLmNvbSsw/16:9//nao/nao"
                scrolling="no"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <audio
                autoPlay={true}
                controls
                src="https://stm39.srvstm.com:9776/stream"
              ></audio>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
