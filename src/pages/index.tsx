import { useState } from "react";
import { motion } from "framer-motion";
import { Bars3Icon, ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Image from "next/image";
import { usePessoasEscola } from "@/service/queries/getPessoasEscola";
import { usePessoasSaude } from "@/service/queries/getPessoasSaude";
import { usePessoas } from "@/service/queries/getPessoas";
import { PersonHealthData } from "@/components/pages/home/person-health-data";
import { PersonSchoolData } from "@/components/pages/home/person-school-data";
import { PersonCadunicoData } from "@/components/pages/home/person-cadunico-data";
import { PersonData } from "@/components/pages/home/person-data";
import Tags from "@/components/pages/home/Tags";
import SearchInput from "@/components/pages/home/SearchInput";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Controle de login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Estado de login em progresso

  const { data: pessoas, error: errorPessoa } = usePessoas();
  const { data: pessoasEscola, error: errorEscola } = usePessoasEscola();
  const { data: pessoasSaude, error: errorSaude } = usePessoasSaude();
  const { data: pessoasCadunico, error: errorCadunico } = usePessoas();

  const pessoa = pessoas?.[0];

  const handleLogin = () => {
    setIsLoggingIn(true);
    // Simulando a autenticação, substitua com a lógica real
    setTimeout(() => {
      if (email === "teste@teste.com" && password === "1234") {
        setIsAuthenticated(true);
      } else {
        alert("Credenciais inválidas");
      }
      setIsLoggingIn(false);
    }, 1500); // Simula um delay para o login
  };

  if (errorEscola || errorPessoa || errorSaude || errorCadunico) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="flex items-center gap-2 text-red-600">
          <ExclamationTriangleIcon className="h-5 w-5" /> Erro ao acessar a base de dados.
        </h2>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800">Login</h2>
          <div className="mt-6">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
              placeholder="Digite seu email"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block text-gray-600">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
              placeholder="Digite sua senha"
            />
          </div>
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isLoggingIn ? "Entrando..." : "Entrar"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gray-100">
      {/* Header and Sidebar */}
      <Popover as="header" className="fixed w-full top-0 z-50 border-b-2 border-green-700/40">
        <div className="bg-white py-4">
          <nav aria-label="Global" className="relative mx-auto flex max-w-7xl items-center justify-between px-6">
            <div className="flex items-center">
              <a href="#">
                <Image
                  alt="Prefeitura"
                  src="/images/logo-pmb-horizontal.png"
                  className="h-8 w-auto sm:h-10"
                  height={140}
                  width={531}
                />
              </a>
              <div className="-mr-2 flex items-center md:hidden">
                <PopoverButton className="relative inline-flex items-center justify-center rounded-md bg-neutral-100 p-2 text-green-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400">
                  <Bars3Icon className="h-6 w-6" />
                </PopoverButton>
              </div>
            </div>
          </nav>
        </div>

        <PopoverPanel className="absolute inset-x-0 top-0 z-10 origin-top transform p-2 transition">
          <div className="rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <Image
                alt="Prefeitura"
                src="/images/logo-pmb-horizontal.png"
                className="h-8 w-auto sm:h-10"
                height={140}
                width={531}
              />
              <PopoverButton className="rounded-md bg-neutral-100 p-2 text-green-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-green-700">
                <XMarkIcon className="h-6 w-6" />
              </PopoverButton>
            </div>
            <div className="pb-6 pt-5 px-5">
              <a
                href="https://orbita.srv.br/"
                className="block w-full rounded-md bg-green-600 px-4 py-3 text-center font-medium text-white shadow hover:bg-green-700"
              >
                Desenvolvido por Órbita Tecnologia
              </a>
            </div>
          </div>
        </PopoverPanel>
      </Popover>

      <main className="pt-24 min-h-screen">
        <div className="max-w-[100rem] mx-auto px-2">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left Sidebar (Search and Data) */}
            <aside className="flex-1 bg-gray-200 p-4 rounded-lg shadow-sm">
              <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              {pessoa && (
                <PersonData
                  pessoasCadunico={pessoasCadunico}
                  pessoasSaude={pessoasSaude}
                  searchTerm={searchTerm}
                />
              )}
            </aside>

            {/* Center Section (Person Data) */}
            <section className="flex-1 bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
              {searchTerm && (
                <>
                  <div className="max-h-96 overflow-y-auto">
                    <PersonSchoolData
                      pessoasEscola={pessoasEscola}
                      searchTerm={searchTerm}
                    />
                  </div>
                  <div className="max-h-96 overflow-y-auto mt-4">
                    <PersonHealthData
                      pessoasSaude={pessoasSaude}
                      searchTerm={searchTerm}
                    />
                  </div>
                  <div className="max-h-96 overflow-y-auto mt-4">
                    <PersonCadunicoData
                      pessoasCadunico={pessoasCadunico}
                      searchTerm={searchTerm}
                    />
                  </div>
                </>
              )}
            </section>

            {/* Right Sidebar (Tags) */}
            <aside className="flex-1 bg-gray-200 p-4 rounded-lg shadow-sm max-w-xs ml-auto">
              <Tags />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
