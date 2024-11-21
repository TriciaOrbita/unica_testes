import { usePessoasEscola } from '@/service/queries/getPessoasEscola'
import { usePessoas } from '@/service/queries/getPessoas'
import { PersonSchoolData } from '@/components/pages/home/person-school-data'
import { PersonCadunicoData } from '@/components/pages/home/person-cadunico-data'
// import { PersonHealthData } from '@/components/pages/home/person-health-data'
import { PersonData } from '@/components/pages/home/person-data'
import Tags from '@/components/pages/home/Tags'
import SearchInput from '@/components/pages/home/SearchInput'
import Avaliacoes from '@/components/pages/education/avaliacoes'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React, { useState } from 'react'
import { usePessoasSaude } from '@/service/queries/getPessoasSaude'

export default function EducationProfile() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: pessoas, error: errorPessoa } = usePessoas()
  const { data: pessoasEscola, error: errorEscola } = usePessoasEscola()
  const { data: pessoasCadunico, error: errorCadunico } = usePessoas()
  const { data: pessoasSaude } = usePessoasSaude()

  const pessoa = pessoas?.[0]

  console.log('pessoas:', pessoas)
  console.log('pessoasEscola:', pessoasEscola)
  console.log('pessoasCadunico:', pessoasCadunico)

  if (errorEscola || errorPessoa || errorCadunico) {
    console.log('Erro ao carregar dados:', {
      errorPessoa,
      errorEscola,
      errorCadunico,
    })
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="flex items-center gap-2 text-red-600">
          <ExclamationTriangleIcon className="h-5 w-5" /> Erro ao acessar a base
          de dados.
        </h2>
      </div>
    )
  }

  // Certifique-se de que todas as chaves ou parênteses estão fechados
  return (
    <div className="relative bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b-2 border-green-700/40">
        <div className="bg-white py-4">
          <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6">
            {/* Logo */}
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
            </div>
            {/* Search Input and Logout Button */}
            <div className="flex items-center gap-4">
              <SearchInput
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <button className="rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
                Sair
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen pb-16 pt-24">
        <div className="mx-auto max-w-[100rem] px-2">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Left Sidebar (Person Data) */}
            <aside className="flex-1 rounded-lg">
              {/* Mostra apenas PersonData abaixo do SearchInput */}
              {pessoa && (
                <section className="mx-auto">
                  <PersonData
                    pessoasCadunico={pessoasCadunico}
                    pessoasSaude={pessoasSaude}
                    searchTerm={searchTerm}
                  />
                </section>
              )}
            </aside>

            {/* Condição para mostrar itens apenas se houver pesquisa */}
            {searchTerm && (
              <>
                <div className="mx-auto flex max-w-3xl flex-col gap-8">
                  {/* Center Section (Person Data) */}
                  <section className="mx-auto max-h-96 max-w-3xl flex-1 border border-green-300 p-6">
                    <div className="max-h-96 overflow-y-auto">
                      <PersonSchoolData
                        pessoasEscola={pessoasEscola}
                        searchTerm={searchTerm}
                      />
                    </div>
                  </section>

                  {/* Seção para Cadunico e Avaliacoes lado a lado */}
                  <section className="flex-1 border border-green-300 p-6">
                    <div className="mt-8 flex gap-8">
                      <div className="max-h-96 flex-1 overflow-y-auto">
                        <PersonCadunicoData
                          pessoasCadunico={pessoasCadunico}
                          searchTerm={searchTerm}
                        />
                      </div>

                      <div className="max-h-96 flex-1 overflow-y-auto">
                        <Avaliacoes />
                      </div>
                    </div>
                  </section>
                </div>
                {/* Right Sidebar (Tags) */}
                <aside className="ml-auto max-h-[300px] w-[300px] overflow-y-auto border border-green-300">
                  <Tags
                    cadunicoData={pessoasCadunico}
                    searchTerm={searchTerm}
                  />
                </aside>
              </>
            )}
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-green-600 py-4 text-center">
        <h2 className="text-sm font-semibold text-white">
          Desenvolvido por Órbita Tecnologia
        </h2>
      </footer>
    </div>
  )
}
