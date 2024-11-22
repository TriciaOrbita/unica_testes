import { useState } from 'react'
import Image from 'next/image'
import SearchInput from './pesquisa'

interface PersonData {
  pessoaNome: string
  pessoaCPF: string
  pessoaNIS: string
  sexo: string
  dataNascimento: string
  ufNascimento: string
  municipioNascimento: string
  situacaoRua: string
  local: string
  rua: string
  numeroLogradouro: string
  mesesDesatualizacaoCadastro: string
  avatar: string
  escola: string
  turma: string
  situacaoAcademica: string
  faltas: string
  media: string
  horario: Record<string, string>
  avisos: { title: string; date: string }[]
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [cpfPesquisado, setCpfPesquisado] = useState('')

  const mockPessoas: Record<string, PersonData> = {
    '10028205294': {
      pessoaNome: 'João da Silva',
      pessoaCPF: '10028205294',
      pessoaNIS: '123456',
      sexo: 'Masculino',
      dataNascimento: '01/01/1980',
      ufNascimento: 'SP',
      municipioNascimento: 'São Paulo',
      situacaoRua: '0',
      local: 'Centro',
      rua: 'Rua A',
      numeroLogradouro: '123',
      mesesDesatualizacaoCadastro: '12',
      avatar: '/images/avatar-placeholder.png',
      escola: 'Escola ABC',
      turma: '3º Ano',
      situacaoAcademica: 'Matriculado',
      faltas: '5 faltas',
      media: '7.8',
      horario: {
        segunda: '8:00 - Matemática, 10:00 - Português, 13:00 - Ciências',
        terca: '8:00 - História, 10:00 - Geografia, 13:00 - Educação Física',
      },
      avisos: [
        { title: 'Prova de Matemática', date: '25/11/2024' },
        { title: 'Reunião de Pais', date: '28/11/2024' },
      ],
    },
    '90367154234': {
      pessoaNome: 'Maria Oliveira',
      pessoaCPF: '90367154234',
      pessoaNIS: '654321',
      sexo: 'Feminino',
      dataNascimento: '15/05/1995',
      ufNascimento: 'MG',
      municipioNascimento: 'Belo Horizonte',
      situacaoRua: '1',
      local: 'Centro',
      rua: 'Rua B',
      numeroLogradouro: '456',
      mesesDesatualizacaoCadastro: '5',
      avatar: '/images/avatar-placeholder.png',
      escola: 'Escola XYZ',
      turma: '2º Ano',
      situacaoAcademica: 'Matriculada',
      faltas: '3 faltas',
      media: '8.5',
      horario: {
        segunda: '8:00 - Matemática, 10:00 - Química, 13:00 - Biologia',
        terca: '8:00 - História, 10:00 - Inglês, 13:00 - Artes',
      },
      avisos: [
        { title: 'Prova de Química', date: '26/11/2024' },
        { title: 'Reunião de Pais', date: '29/11/2024' },
      ],
    },
    '09579794286': {
      pessoaNome: 'Carlos Souza',
      pessoaCPF: '09579794286',
      pessoaNIS: '789456',
      sexo: 'Masculino',
      dataNascimento: '12/07/1992',
      ufNascimento: 'RJ',
      municipioNascimento: 'Rio de Janeiro',
      situacaoRua: '2',
      local: 'Zona Sul',
      rua: 'Rua C',
      numeroLogradouro: '789',
      mesesDesatualizacaoCadastro: '8',
      avatar: '/images/avatar-placeholder.png',
      escola: 'Escola DEF',
      turma: '1º Ano',
      situacaoAcademica: 'Matriculado',
      faltas: '2 faltas',
      media: '9.0',
      horario: {
        segunda: '9:00 - Física, 11:00 - Filosofia, 14:00 - Matemática',
        terca: '9:00 - Sociologia, 11:00 - História, 14:00 - Língua Portuguesa',
      },
      avisos: [
        { title: 'Prova de Física', date: '27/11/2024' },
        { title: 'Reunião de Pais', date: '30/11/2024' },
      ],
    },
  }

  const renderDashboard = (cpf: string) => {
    const user = mockPessoas[cpf]

    if (!user) {
      return (
        <div className="text-center text-red-600">
          <h3>CPF não encontrado</h3>
        </div>
      )
    }

    return (
      <>
        <h2 className="mb-6 text-center text-3xl font-bold text-green-600">
          Painel do Aluno
        </h2>
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col rounded-lg bg-green-50 p-4 shadow-md">
            <span className="text-base font-medium text-neutral-800">
              Última Atualização
            </span>
            <div className="text-xl font-semibold text-neutral-600">
              {user.mesesDesatualizacaoCadastro} meses atrás
            </div>
          </div>
          <div className="flex flex-col rounded-lg bg-green-50 p-4 shadow-md">
            <span className="text-base font-medium text-neutral-800">
              Escola
            </span>
            <div className="text-xl font-semibold text-neutral-600">
              {user.escola}
            </div>
          </div>
          <div className="flex flex-col rounded-lg bg-green-50 p-4 shadow-md">
            <span className="text-base font-medium text-neutral-800">
              Turma
            </span>
            <div className="text-xl font-semibold text-neutral-600">
              {user.turma}
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-4 shadow-md">
            <span className="text-base font-medium text-neutral-800">
              Situação Acadêmica
            </span>
            <div className="text-xl font-semibold text-green-600">
              {user.situacaoAcademica}
            </div>
          </div>
          <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-4 shadow-md">
            <span className="text-base font-medium text-neutral-800">
              Faltas no Semestre
            </span>
            <div className="text-xl font-semibold text-neutral-600">
              {user.faltas}
            </div>
          </div>
          <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-4 shadow-md">
            <span className="text-base font-medium text-neutral-800">
              Média Final
            </span>
            <div className="text-xl font-semibold text-neutral-600">
              {user.media}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-4 text-2xl font-semibold text-neutral-800">
            Avisos Importantes
          </h3>
          {user.avisos.map(
            (aviso: { title: string; date: string }, index: number) => (
              <div
                key={index}
                className="flex flex-col rounded-lg border border-neutral-200 bg-white p-4 shadow-md"
              >
                <span className="text-base font-medium text-neutral-800">
                  {aviso.title}
                </span>
                <div className="text-lg font-semibold text-neutral-600">
                  Data: {aviso.date}
                </div>
              </div>
            ),
          )}
        </div>
      </>
    )
  }

  const handleSearch = (searchTerm: string) => {
    setCpfPesquisado(searchTerm) // Atualiza o CPF pesquisado com o termo
  }

  return (
    <div className="relative bg-gray-100 pb-8">
      <header className="fixed top-0 z-50 w-full border-b-2 border-green-700/40">
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

            <div className="flex items-center gap-4">
              <SearchInput
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearch={handleSearch} // Passando a função de pesquisa
              />
            </div>
          </nav>
        </div>
      </header>

      <main className="min-h-screen bg-gray-100 pb-16 pt-24">
        <div className="mx-auto max-w-[1000px] px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <section className="rounded-lg bg-white p-6 shadow-lg lg:col-span-3">
              {renderDashboard(cpfPesquisado)}
              {/* Exibindo o painel do aluno */}
            </section>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full bg-green-600 py-4 text-center">
        <h2 className="text-sm font-semibold text-white">
          Desenvolvido por Órbita Tecnologia
        </h2>
      </footer>
    </div>
  )
}
