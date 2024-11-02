import { usePessoasEscola } from "@/service/queries/getPessoasEscola";
import { usePessoasSaude } from "@/service/queries/getPessoasSaude";
import { usePessoas } from "@/service/queries/getPessoas";
import { PersonHealthData } from "@/components/pages/home/person-health-data";
import { PersonSchoolData } from "@/components/pages/home/person-school-data";
import { PersonCadunicoData } from "@/components/pages/home/person-cadunico-data";
import { PersonData } from "@/components/pages/home/person-data";
import Tags from "@/components/pages/home/Tags";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import SearchInput from "@/components/pages/home/SearchInput";
import React, { useState } from "react";
import {
  Bars3Icon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: pessoas, error: errorPessoa } = usePessoas();
  const { data: pessoasEscola, error: errorEscola } = usePessoasEscola();
  const { data: pessoasSaude, error: errorSaude } = usePessoasSaude();
  const { data: pessoasCadunico, error: errorCadunico } = usePessoas();

  // Aqui, usaremos o primeiro elemento do array `pessoas` como exemplo.
  const pessoa = pessoas?.[0];

  if (errorEscola || errorPessoa || errorSaude || errorCadunico) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="flex items-center gap-2 text-red-600">
          <ExclamationTriangleIcon className="h-5 w-5" /> Erro ao acessar a base
          de dados.
        </h2>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <Popover
        as="header"
        className="fixed w-full top-0 z-50 border-b-2 border-green-700/40"
      >
        <div className="bg-white py-4">
          <nav
            aria-label="Global"
            className="relative mx-auto flex max-w-7xl items-center justify-between px-6"
          >
            <div className="flex flex-1 items-center">
              <div className="flex w-full items-center justify-between md:w-auto">
                <a href="#">
                  <span className="sr-only">Prefeitura</span>
                  <Image
                    alt=""
                    src="/images/logo-pmb-horizontal.png"
                    className="h-8 w-auto sm:h-10"
                    height={140}
                    width={531}
                  />
                </a>
                <div className="-mr-2 flex items-center md:hidden">
                  <PopoverButton className="focus-ring-inset relative inline-flex items-center justify-center rounded-md bg-neutral-100 p-2 text-green-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Abrir menu principal</span>
                    <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                  </PopoverButton>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <PopoverPanel
          focus
          transition
          className="absolute inset-x-0 top-0 z-10 origin-top transform p-2 transition data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-150 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in md:hidden"
        >
          <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <div>
                <Image
                  alt=""
                  src="/images/logo-pmb-horizontal.png"
                  className="h-8 w-auto sm:h-10"
                  height={140}
                  width={531}
                />
              </div>
              <div className="-mr-2">
                <PopoverButton className="relative inline-flex items-center justify-center rounded-md bg-neutral-100 p-2 text-green-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-700">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Fechar menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </PopoverButton>
              </div>
            </div>
            <div className="pb-6 pt-5">
              <div className="mt-6 px-5">
                <a
                  href="https://orbita.srv.br/"
                  className="block w-full rounded-md bg-green-600 px-4 py-3 text-center font-medium text-white shadow hover:bg-green-700"
                >
                  Desenvolvido por Órbita Tecnologia
                </a>
              </div>
            </div>
          </div>
        </PopoverPanel>
      </Popover>

      <main>
        <div className="bg-white pt-24 lg:overflow-hidden lg:pb-14 lg:pt-28 min-h-screen">
          <div className="mx-auto max-w-[100rem] px-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {pessoa && (
                <PersonData
                  pessoasCadunico={pessoasCadunico}
                  pessoasSaude={pessoasSaude}
                  searchTerm={searchTerm}
                />
              )}
              <div className="flex-1 flex flex-col gap-4">
                <SearchInput
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />

                {/* Renderiza os componentes apenas se houver um termo de busca */}
                {searchTerm && (
                  <>
                    <PersonHealthData
                      pessoasSaude={pessoasSaude}
                      searchTerm={searchTerm}
                    />
                    <PersonSchoolData
                      pessoasEscola={pessoasEscola}
                      searchTerm={searchTerm}
                    />
                    <PersonCadunicoData
                      pessoasCadunico={pessoasCadunico}
                      searchTerm={searchTerm}
                    />
                  </>
                )}
              </div>
              <Tags
                healthData={pessoasSaude}
                cadunicoData={pessoasCadunico}
                searchTerm={searchTerm}
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="fixed bottom-0 py-4 w-full bg-green-600">
        <h2 className="text-white text-center font-semibold text-sm">
          Desenvolvido por Órbita Tecnologia
        </h2>
      </footer>
    </div>
  );
}
