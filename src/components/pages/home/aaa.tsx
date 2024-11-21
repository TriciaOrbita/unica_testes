import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PessoaSaude } from '@/service/queries/getPessoasSaude'
import { formatDistanceToNow } from 'date-fns'
import parseISO from 'date-fns/parseISO'

interface PessoaCadunico {
  avatar: string
  pessoaNome: string
  pessoaCPF: string
  sexo: string
  dataNascimento: string
  ufNascimento: string
  municipioNascimento: string
  local: string
  rua: string
  numeroLogradouro: string
}

interface PersonDataProps {
  pessoasCadunico: PessoaCadunico[]
  pessoasSaude: PessoaSaude[]
  searchTerm: string
}

const cpfMapping: { [key: string]: string } = {
  'HENRY GABRIEL DA SILVA FERREIRA': '10028205294',
  'Hyrllen Batista Lisboa Furtado': '01809843227',
  'LARA SOUZA DA TRINDADE': '12345678901',
  'DAVID DO SOCORRO QUEIROZ DE OLIVEIRA': '10987654321',
}

const sexMapping: { [key: string]: string } = {
  'HENRY GABRIEL DA SILVA FERREIRA': 'Masculino',
  'Hyrllen Batista Lisboa Furtado': 'Feminino',
  'LARA SOUZA DA TRINDADE': 'Feminino',
  'DAVID DO SOCORRO QUEIROZ DE OLIVEIRA': 'Masculino',
}

const dateMapping: { [key: string]: string } = {
  'HENRY GABRIEL DA SILVA FERREIRA': '19/11/2021',
  'Hyrllen Batista Lisboa Furtado': '29/08/1999',
  'LARA SOUZA DA TRINDADE': '10/05/1995',
  'DAVID DO SOCORRO QUEIROZ DE OLIVEIRA': '15/12/1990',
}

const activityMapping: { [key: string]: { activity: string; date: string }[] } =
  {
    'HENRY GABRIEL DA SILVA FERREIRA': [
      {
        activity: 'Henry Gabriel da Silva Ferreira foi vacinado.',
        date: '2024-11-01',
      },
      {
        activity:
          'Henry Gabriel da Silva Ferreira teve consulta médica agendada.',
        date: '2024-11-02',
      },
      {
        activity: 'Henry Gabriel da Silva Ferreira realizou exame de rotina.',
        date: '2024-11-03',
      },
    ],
    'HYRLLEN BATISTA LISBOA FURTADO': [
      {
        activity: 'Hyrllen Batista Lisboa Furtado foi vacinado.',
        date: '2024-10-20',
      },
      {
        activity:
          'Hyrllen Batista Lisboa Furtado não compareceu à consulta médica.',
        date: '2024-10-25',
      },
      {
        activity: 'Hyrllen Batista Lisboa Furtado realizou exame de rotina.',
        date: '2024-09-15',
      },
    ],
    'LARA SOUZA DA TRINDADE': [
      { activity: 'Lara Souza da Trindade foi vacinada.', date: '2024-08-10' },
      {
        activity: 'Lara Souza da Trindade teve consulta médica agendada.',
        date: '2024-09-12',
      },
      {
        activity: 'Lara Souza da Trindade realizou exame de rotina.',
        date: '2024-09-05',
      },
    ],
    'DAVID DO SOCORRO QUEIROZ DE OLIVEIRA': [
      {
        activity: 'David do Socorro Queiroz de Oliveira não foi vacinado.',
        date: '2024-06-15',
      },
      {
        activity:
          'David do Socorro Queiroz de Oliveira teve consulta médica agendada.',
        date: '2024-07-02',
      },
      {
        activity:
          'David do Socorro Queiroz de Oliveira realizou exame de rotina.',
        date: '2024-07-10',
      },
    ],
    'EMERSON ELVES MATOS ALBUQUERQUE': [
      {
        activity: 'Emerson Elves Matos Albuquerque foi vacinado.',
        date: '2024-10-20',
      },
      {
        activity:
          'Emerson Elves Matos Albuquerque não compareceu à consulta médica.',
        date: '2024-11-01',
      },
      {
        activity: 'Emerson Elves Matos Albuquerque realizou exame de rotina.',
        date: '2024-11-15',
      },
    ],
  }

const schoolActivityMapping: {
  [key: string]: { activity: string; date: string }[]
} = {
  'HENRY GABRIEL DA SILVA FERREIRA': [
    {
      activity: 'Henry Gabriel da Silva Ferreira entrou na escola.',
      date: '2024-03-01',
    },
    {
      activity: 'Henry Gabriel da Silva Ferreira realizou prova de Matemática.',
      date: '2024-10-20',
    },
    {
      activity:
        'Henry Gabriel da Silva Ferreira apresentou o projeto de Ciências.',
      date: '2024-09-15',
    },
    {
      activity: 'Henry Gabriel da Silva Ferreira saiu da escola.',
      date: '2024-12-15',
    },
  ],
  'LARA SOUZA DA TRINDADE': [
    {
      activity: 'Lara Souza da Trindade entrou na escola.',
      date: '2024-01-05',
    },
    {
      activity: 'Lara Souza da Trindade realizou prova de História.',
      date: '2024-08-12',
    },
    {
      activity:
        'Lara Souza da Trindade realizou atividade externa de aprendizado.',
      date: '2024-07-15',
    },
    {
      activity: 'Lara Souza da Trindade apresentou em um evento da escola.',
      date: '2024-11-30',
    },
  ],
  'DAVID DO SOCORRO QUEIROZ DE OLIVEIRA': [
    {
      activity: 'David do Socorro Queiroz de Oliveira entrou na escola.',
      date: '2024-04-01',
    },
    {
      activity:
        'David do Socorro Queiroz de Oliveira realizou prova de Física.',
      date: '2024-06-18',
    },
    {
      activity:
        'David do Socorro Queiroz de Oliveira apresentou o projeto de Robótica.',
      date: '2024-06-30',
    },
    {
      activity: 'David do Socorro Queiroz de Oliveira saiu da escola.',
      date: '2024-12-05',
    },
  ],
}

export function PersonData({
  pessoasCadunico,
  pessoasSaude,
  searchTerm,
}: PersonDataProps) {
  const filteredCadunicoData = pessoasCadunico.filter(
    (pessoa) =>
      pessoa.pessoaNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pessoa.pessoaCPF.includes(searchTerm),
  )

  const safePessoasSaude = pessoasSaude || []
  const filteredHealthData =
    filteredCadunicoData.length === 0
      ? safePessoasSaude.filter((pessoa) => {
          const cpf = cpfMapping[pessoa.nomeCidadao]
          return (
            pessoa.nomeCidadao
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            (cpf && cpf.includes(searchTerm))
          )
        })
      : []
  const combinedData =
    filteredCadunicoData.length > 0 ? filteredCadunicoData : filteredHealthData
  const hasResults = combinedData.length > 0 && searchTerm.trim() !== ''

return (
    <ScrollArea className="bg-neutral-100">
      <div className="relative flex w-full flex-col items-center">
        {/* Top Section */}
        {hasResults && (
          <div className="relative flex w-full flex-col items-center rounded-t-[300px] bg-green-600 pb-4 pt-6">
            <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-neutral-200 shadow-lg">
            <img
                src={
                    combinedData[0].nomeCidadao === 'Hyrllen Batista Lisboa Furtado'
                    ? 'https://lh3.googleusercontent.com/chat_attachment/AP1Ws4sClOFEuO35sX949mWLZQ6UzEUkdjTC5VJxK0FU7jHf6-eDDtzDbkQdPchUuwZmKdaaECxDEsU4AYTOzUyC6mUkFvk1FDfuWpQby7Gt6vrXwMQ2xwyNqYcxzKvxj5SXXife2IZCmjdllf5eHY7Zf4LI6wyIy7Dh5ic2kE_4AONPX-3zpmjqskzS2P-2izhwWdeA8UowxETlRJcbUhIV-bC4pcRcMi73UllATSUhHJu14-3mDBk2ULUymhdKj2Bt80OXqwTKBycDS6_NDDXuWp4CzsvaFxf4EnXz90jDbfHxpsHGZ5dGGUgK955XJCO-EvM=w1920-h991'
                    : combinedData[0].avatar
                  }
                  alt="Avatar"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/images/default-avatar.jpg';
                  }}
                />
            </div>
            <h2 className="mt-12 text-center text-xl font-medium text-white">
              {combinedData[0].pessoaNome ||
                combinedData[0].nomeCidadao ||
                'Nome do Cidadão'}
            </h2>
          </div>
        )}
        <div className="w-full bg-green-600 px-6 py-8">
          {searchTerm && hasResults ? (
            <div className="w-full space-y-6">
              <dl className="">
                {combinedData.map((pessoa) => {
                  const cpf = cpfMapping[pessoa.nomeCidadao]
                  const date = dateMapping[pessoa.nomeCidadao]
                  const sex = sexMapping[pessoa.nomeCidadao]

                  // Construindo o endereço de forma condicional
                  const address =
                    [
                      pessoa.rua,
                      pessoa.tipoLogradouro,
                      pessoa.logradouro,
                      pessoa.numeroDomicilio,
                    ]
                      .filter(Boolean)
                      .join(', ') || 'Endereço não disponível'

                  return (
                    <div
                      key={pessoa.coFatorCidadao || pessoa.pessoaNome}
                      className="w-full bg-green-600"
                    >
                      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col">
                          <dt className="font-medium text-white">CPF</dt>
                          <dd className="text-neutral-700">
                            <div className="rounded-md border bg-neutral-50 p-2">
                              {pessoa.pessoaCPF || cpf || 'CPF não disponível'}
                            </div>
                          </dd>
                        </div>

                        <div className="flex flex-col">
                          <dt className="font-medium text-white">
                            Data de Nascimento
                          </dt>
                          <dd className="text-neutral-700">
                            <div className="rounded-md border bg-neutral-50 p-2">
                              {pessoa.dataNascimento ||
                                date ||
                                'Data de nascimento não disponível'}
                            </div>
                          </dd>
                        </div>

                        <div className="flex flex-col">
                          <dt className="font-medium text-white">Sexo</dt>
                          <dd className="text-neutral-700">
                            <div className="rounded-md border bg-neutral-50 p-2">
                              {pessoa.sexo || sex || 'Sexo não informado'}
                            </div>
                          </dd>
                        </div>

                        <div className="flex flex-col">
                          <dt className="font-medium text-white">Endereço</dt>
                          <dd className="text-neutral-700">
                            <div className="rounded-md border bg-neutral-50 p-2">
                              {address}
                            </div>
                          </dd>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </dl>
            </div>
          ) : (
            searchTerm && (
              <p className="text-neutral-600">Nenhum resultado encontrado.</p>
            )
          )}
        </div>

        {hasResults && (
          <div className="flex w-full flex-col border border-green-600 bg-neutral-50 p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold text-neutral-700">
              Histórico de Atividades
            </h3>
            <div className="max-h-96 space-y-4 overflow-y-auto">
              {combinedData.map((pessoa) => {
                const personNameCidadao =
                  pessoa.nomeCidadao?.toUpperCase() || ''
                const personNamePessoa = pessoa.pessoaNome?.toUpperCase() || ''

                // Buscar as atividades de saúde e escolares
                const healthActivities =
                  activityMapping[personNameCidadao] ||
                  activityMapping[personNamePessoa] ||
                  []
                const schoolActivities =
                  schoolActivityMapping[personNameCidadao] ||
                  schoolActivityMapping[personNamePessoa] ||
                  []

                // Combina as atividades de saúde e escolares
                const allActivities = [...healthActivities, ...schoolActivities]

                return (
                  <div
                    key={pessoa.nomeCidadao || pessoa.nomePessoa}
                    className="flex w-full flex-col space-y-4"
                  >
                    {allActivities.length > 0 ? (
                      allActivities.map((activity, index) => (
                        <div
                          key={index}
                          className="flex w-full items-start space-x-3"
                        >
                          {/* Ícone representativo da atividade */}
                          <span className="flex-shrink-0">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                activity.activity.includes('Saúde')
                                  ? 'bg-blue-500'
                                  : 'bg-green-500'
                              }`}
                            >
                              {activity.activity.includes('Saúde') ? (
                                <svg
                                  className="h-5 w-5 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.5 7.5a1 1 0 012 0v1.5h1.5a1 1 0 010 2H10.5v1.5a1 1 0 01-2 0V11H7a1 1 0 010-2h1.5V7.5z" />
                                </svg>
                              ) : (
                                <svg
                                  className="h-5 w-5 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M5 3a1 1 0 011-1h8a1 1 0 011 1v2H5V3zM3 7a1 1 0 011-1h12a1 1 0 011 1v7a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" />
                                </svg>
                              )}
                            </div>
                          </span>
                          {/* Conteúdo da atividade */}
                          <div>
                            <p className="font-medium text-neutral-700">
                              {activity.activity}
                            </p>
                            <p className="text-sm text-neutral-500">
                              há{' '}
                              {formatDistanceToNow(parseISO(activity.date), {
                                addSuffix: true,
                              })}
                            </p>
                            {pessoa.unidadeSaude &&
                              activity.activity.includes('Saúde') && (
                                <p className="text-sm text-neutral-600">
                                  Unidade de Saúde:{' '}
                                  {pessoa.unidadeSaude || 'Não informado'}
                                </p>
                              )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-neutral-500">
                        Nenhuma atividade recente.
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
