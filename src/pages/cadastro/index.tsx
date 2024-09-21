import { useState } from 'react';

export default function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>();
  const [postalCode, setPostalCode] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [origin, setOrigin] = useState('');
  const [blink, setBlink] = useState(false);

  const fetchAddressFromCep = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        alert('CEP não encontrado.');
        return;
      }
      setNeighborhood(data.bairro || '');
      setAddress1(data.logradouro || '');
      setCity(data.localidade || '');
      setState(data.uf || '');

      setBlink(true);
      setTimeout(() => setBlink(false), 500);
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value.replace(/\D/g, '');
    if (phoneValue.length <= 11) {
      const formattedPhone = phoneValue
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
      setPhone(formattedPhone);
    }
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cpfValue = e.target.value.replace(/\D/g, '');
    if (cpfValue.length <= 11) {
      const formattedCpf = cpfValue
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      setCpf(formattedCpf);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepValue = e.target.value.replace(/\D/g, '');
    if (cepValue.length <= 8) {
      const formattedCep = cepValue.replace(/(\d{5})(\d{1,3})$/, '$1-$2');
      setPostalCode(formattedCep);
      if (cepValue.length === 8) {
        fetchAddressFromCep(cepValue);
      }
    }
  };

  const handleBirthDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'day' | 'month' | 'year'
  ) => {
    const value = e.target.value.replace(/\D/g, '');
    if (type === 'day') setBirthDay(value.slice(0, 2));
    if (type === 'month') setBirthMonth(value.slice(0, 2));
    if (type === 'year') setBirthYear(value.slice(0, 4));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      name,
      email,
      phone,
      cpf,
      gender,
      postalCode,
      neighborhood,
      address1,
      address2,
      city,
      state,
      birthDate: `${birthDay}/${birthMonth}/${birthYear}`,
      origin,
    });
  };

  return (
    <div className="h-full flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-black rounded-md p-6 space-y-6 max-w-[700px] w-full"
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Perfil</h2>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-1.5 rounded-md bg-gray-800 text-gray-200"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-1.5 rounded-md bg-gray-800 text-gray-200"
            required
          />
          <input
            type="text"
            placeholder="(11) 9 5172-1250"
            value={phone}
            onChange={handlePhoneChange}
            className="w-full p-1.5 rounded-md bg-gray-800 text-gray-200"
            required
          />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={handleCpfChange}
            className="w-full p-1.5 rounded-md bg-gray-800 text-gray-200"
            required
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as 'Male' | 'Female')}
            className="w-full p-1.5 rounded-md bg-gray-800 text-gray-200"
            required
          >
            <option value="">Gênero</option>
            <option value="Male">Masculino</option>
            <option value="Female">Feminino</option>
          </select>

          <div className="flex items-center space-x-2 mt-4">
            <div className="flex w-1/2 space-x-2">
              <input
                type="text"
                placeholder="Dia"
                value={birthDay}
                onChange={(e) => handleBirthDateChange(e, 'day')}
                className="w-1/3 p-1.5 rounded-md bg-gray-800 text-gray-200 text-center"
                required
              />
              <span className="text-gray-500 text-4xl">/</span>

              <input
                type="text"
                placeholder="Mês"
                value={birthMonth}
                onChange={(e) => handleBirthDateChange(e, 'month')}
                className="w-1/3 p-1.5 rounded-md bg-gray-800 text-gray-200 text-center"
                required
              />
              <span className="text-gray-500 text-4xl">/</span>
              <input
                type="text"
                placeholder="Ano"
                value={birthYear}
                onChange={(e) => handleBirthDateChange(e, 'year')}
                className="w-1/3 p-1.5 rounded-md bg-gray-800 text-gray-200 text-center"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Endereço</h2>
          <input
            type="text"
            placeholder="CEP"
            value={postalCode}
            onChange={handleCepChange}
            className="w-full p-1.5 rounded-md bg-gray-800 text-gray-200"
            maxLength={9}
            required
          />

          <input
            type="text"
            placeholder="Bairro"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className={`w-full p-1.5 rounded-md bg-gray-800 text-gray-200 border border-gray-800 transition duration-500 ${
              blink ? 'ring-2 ring-gray-400' : ''
            }`}
            required
          />
          <input
            type="text"
            placeholder="Endereço"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            className={`w-full p-1.5 rounded-md bg-gray-800 text-gray-200 border border-gray-800 transition duration-500 ${
              blink ? 'ring-2 ring-gray-400' : ''
            }`}
            required
          />
          <input
            type="text"
            placeholder="Complemento"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            className="w-full p-1.5 rounded-md bg-gray-800 text-gray-200"
          />
          <input
            type="text"
            placeholder="Cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`w-full p-1.5 rounded-md bg-gray-800 text-gray-200 border border-gray-800 transition duration-500 ${
              blink ? 'ring-2 ring-gray-400' : ''
            }`}
            required
          />
          <input
            type="text"
            placeholder="Estado"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={`w-full p-1.5 rounded-md bg-gray-800 text-gray-200 border border-gray-800 transition duration-500 ${
              blink ? 'ring-2 ring-gray-400' : ''
            }`}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 rounded-md text-white"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
