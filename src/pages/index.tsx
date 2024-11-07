import { usePessoasEscola } from "@/service/queries/getPessoasEscola"
import { usePessoasSaude } from "@/service/queries/getPessoasSaude"
import { usePessoas } from "@/service/queries/getPessoas"
import { PersonHealthData } from "@/components/pages/home/person-health-data"
import { PersonSchoolData } from "@/components/pages/home/person-school-data"
import { PersonCadunicoData } from "@/components/pages/home/person-cadunico-data"
import { PersonData } from "@/components/pages/home/person-data"
import Tags from "@/components/pages/home/Tags"
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import SearchInput from "@/components/pages/home/SearchInput"
import React, { useState } from "react"
import {
  Bars3Icon,
  ExclamationTriangleIcon,
  XMarkIcon
} from "@heroicons/react/24/outline"
import Image from "next/image"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const { data: pessoas, error: errorPessoa } = usePessoas()
  const { data: pessoasEscola, error: errorEscola } = usePessoasEscola()
  const { data: pessoasSaude, error: errorSaude } = usePessoasSaude()
  const { data: pessoasCadunico, error: errorCadunico } = usePessoas()

  const pessoa = pessoas?.[0]

  if (errorEscola || errorPessoa || errorSaude || errorCadunico) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="flex items-center gap-2 text-red-600">
          <ExclamationTriangleIcon className="h-5 w-5" /> Erro ao acessar a base
          de dados.
        </h2>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden bg-gray-100">
      <Popover
        as="header"
        className="fixed w-full top-0 z-50 border-b-2 border-green-700/40"
      >
        <div className="bg-white py-4">
          <nav
            aria-label="Global"
            className="relative mx-auto flex max-w-7xl items-center justify-between px-6"
          >
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

        <PopoverPanel className="absolute inset-x-0 top-0 z-10 origin-top transform p-2 transition data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-150 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in md:hidden">
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
        <div className="max-w-[100rem] mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left Sidebar (Search and Data) */}
            <aside className="flex-1 bg-gray-200 p-4 rounded-lg shadow-sm">
              <SearchInput
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
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
              <Tags
                healthData={pessoasSaude}
                cadunicoData={pessoasCadunico}
                searchTerm={searchTerm}
              />
            </aside>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 py-4 w-full bg-green-600 text-center">
        <h2 className="text-white font-semibold text-sm">
          Desenvolvido por Órbita Tecnologia
        </h2>
      </footer>
    </div>
  )
}
