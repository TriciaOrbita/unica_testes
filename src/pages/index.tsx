import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Login from '@/components/pages/login/login'
import Profile from '@/pages/profiles/profile'
import { usePessoasEscola } from '@/service/queries/getPessoasEscola'
import { usePessoasSaude } from '@/service/queries/getPessoasSaude'
import { usePessoas } from '@/service/queries/getPessoas'
import { PersonHealthData } from '@/components/pages/home/person-health-data'
import { PersonSchoolData } from '@/components/pages/home/person-school-data'
import { PersonCadunicoData } from '@/components/pages/home/person-cadunico-data'
import { PersonData } from '@/components/pages/home/person-data'
import Tags from '@/components/pages/home/Tags'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import SearchInput from '@/components/pages/home/SearchInput'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const { data: pessoas, error: errorPessoa } = usePessoas()
  const { data: pessoasEscola, error: errorEscola } = usePessoasEscola()
  const { data: pessoasSaude, error: errorSaude } = usePessoasSaude()
  const { data: pessoasCadunico, error: errorCadunico } = usePessoas()
  const router = useRouter()

  const pessoa = pessoas?.[0]

  useEffect(() => {
    // Recupera o perfil salvo no localStorage, se houver
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      setIsAuthenticated(true)
      setSelectedProfile(savedProfile)
      if (savedProfile === 'Admin') {
        router.push('/')
      } else {
        router.push(`/profiles/${savedProfile.toLowerCase()}-profile`)
      }
    }
  }, [router])

  useEffect(() => {
    // Redireciona para a página do perfil de Educação se o perfil for selecionado como 'Educação'
    if (isAuthenticated && selectedProfile === 'Educacao') {
      router.push('profiles/education-profile')
    }
  }, [isAuthenticated, selectedProfile, router])

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

  const handleLogout = () => {
    // Limpa o localStorage e reseta os estados
    localStorage.removeItem('userProfile')
    setIsAuthenticated(false)
    setSelectedProfile(null)
    router.push('/login') // Redireciona para a página de login
  }

  const handleLogin = (profile: string) => {
    setIsAuthenticated(true)
    setSelectedProfile(profile)
    // Salva o perfil no localStorage
    localStorage.setItem('userProfile', profile)

    // Redireciona para a página correta após o login
    if (profile === 'Admin') {
      router.push('/')
    } else {
      router.push(`/profiles/${profile.toLowerCase()}-profile`)
    }
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  if (!selectedProfile) {
    return <Profile onSelect={(profile) => setSelectedProfile(profile)} />
  }

  return (
    <div className="relative bg-gray-100 pb-8">
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
              <button
                onClick={handleLogout}
                className="rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
              >
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
            <aside className="flex-1 rounded-lg p-4">
              {/* Mostra apenas PersonData abaixo do SearchInput */}
              {pessoa && (
                <section className="mx-auto mt-4">
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
                {/* Center Section (Person Data) */}
                <section className="mx-auto max-w-3xl flex-1 p-6 pt-4">
                  <div className="max-h-96 overflow-y-auto">
                    <PersonSchoolData
                      pessoasEscola={pessoasEscola}
                      searchTerm={searchTerm}
                    />
                  </div>
                  <div className="mt-4 max-h-96 overflow-y-auto">
                    <PersonHealthData
                      pessoasSaude={pessoasSaude}
                      searchTerm={searchTerm}
                    />
                  </div>
                  <div className="mt-4 max-h-96 overflow-y-auto">
                    <PersonCadunicoData
                      pessoasCadunico={pessoasCadunico}
                      searchTerm={searchTerm}
                    />
                  </div>
                </section>

                {/* Right Sidebar (Tags) */}
                <aside className="ml-auto max-w-xs flex-1">
                  <Tags
                    healthData={pessoasSaude}
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
