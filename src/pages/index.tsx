import { usePessoasEscola } from "@/service/queries/getPessoasEscola"
import { usePessoasSaude } from "@/service/queries/getPessoasSaude"
import { usePessoas } from "@/service/queries/getPessoas"
import { PersonHealthData } from "@/components/pages/home/person-health-data"
import { PersonSchoolData } from "@/components/pages/home/person-school-data"
import { PersonCadunicoData } from "@/components/pages/home/person-cadunico-data"
import { PersonData } from "@/components/pages/home/person-data"
import Tags from "@/components/pages/home/Tags"
import Login from "@/components/pages/login/login"
import Profile from "@/pages/profiles/profile"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { useState, useEffect } from "react"
import SearchInput from "@/components/pages/home/SearchInput"
import { useRouter } from "next/router"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { data: pessoas, error: errorPessoa } = usePessoas()
  const { data: pessoasEscola, error: errorEscola } = usePessoasEscola()
  const { data: pessoasSaude, error: errorSaude } = usePessoasSaude()
  const { data: pessoasCadunico, error: errorCadunico } = usePessoas()
  const router = useRouter()

  const pessoa = pessoas?.[0]

  useEffect(() => {
    // Redireciona para a página do perfil de Educação se o perfil for selecionado como "Educação"
    if (isAuthenticated && selectedProfile === "Educacao") {
      router.push("profiles/education-profile")
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

  const handleLogin = (profile: string) => {
    setIsAuthenticated(true)
    setSelectedProfile(profile)
    if (profile === "Admin") {
      // Admin permanece na tela de seleção de perfis
      setSelectedProfile("Admin")
    }
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  if (!selectedProfile) {
    return <Profile onSelect={(profile) => setSelectedProfile(profile)} />
  }

  return (
    <div className="relative overflow-hidden bg-gray-100">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 border-b-2 border-green-700/40">
        <div className="bg-white py-4">
          <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6">
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
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 min-h-screen">
        <div className="max-w-[100rem] mx-auto px-2">
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

      {/* Footer */}
      <footer className="fixed bottom-0 py-4 w-full bg-green-600 text-center">
        <h2 className="text-white font-semibold text-sm">
          Desenvolvido por Órbita Tecnologia
        </h2>
      </footer>
    </div>
  )
}
