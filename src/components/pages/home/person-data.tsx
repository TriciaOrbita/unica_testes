import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { PessoaSaude } from "@/service/queries/getPessoasSaude"
import { formatDistanceToNow, parseISO } from "date-fns"

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
  "HENRY GABRIEL DA SILVA FERREIRA": "10028205294",
  "Hyrllen Batista Lisboa Furtado": "01809843227",
  "LARA SOUZA DA TRINDADE": "12345678901",
  "DAVID DO SOCORRO QUEIROZ DE OLIVEIRA": "10987654321"
}

const sexMapping: { [key: string]: string } = {
  "HENRY GABRIEL DA SILVA FERREIRA": "Masculino",
  "Hyrllen Batista Lisboa Furtado": "Feminino",
  "LARA SOUZA DA TRINDADE": "Feminino",
  "DAVID DO SOCORRO QUEIROZ DE OLIVEIRA": "Masculino"
}

const dateMapping: { [key: string]: string } = {
  "HENRY GABRIEL DA SILVA FERREIRA": "19/11/2021",
  "Hyrllen Batista Lisboa Furtado": "29/08/1999",
  "LARA SOUZA DA TRINDADE": "10/05/1995",
  "DAVID DO SOCORRO QUEIROZ DE OLIVEIRA": "15/12/1990"
}

const activityMapping: { [key: string]: { activity: string; date: string }[] } =
  {
    "HENRY GABRIEL DA SILVA FERREIRA": [
      {
        activity: "Henry Gabriel da Silva Ferreira foi vacinado.",
        date: "2024-11-01"
      },
      {
        activity:
          "Henry Gabriel da Silva Ferreira teve consulta médica agendada.",
        date: "2024-11-02"
      },
      {
        activity: "Henry Gabriel da Silva Ferreira realizou exame de rotina.",
        date: "2024-11-03"
      }
    ],
    "HYRLLEN BATISTA LISBOA FURTADO": [
      {
        activity: "Hyrllen Batista Lisboa Furtado foi vacinado.",
        date: "2024-10-20"
      },
      {
        activity:
          "Hyrllen Batista Lisboa Furtado não compareceu à consulta médica.",
        date: "2024-10-25"
      },
      {
        activity: "Hyrllen Batista Lisboa Furtado realizou exame de rotina.",
        date: "2024-09-15"
      }
    ],
    "LARA SOUZA DA TRINDADE": [
      { activity: "Lara Souza da Trindade foi vacinada.", date: "2024-08-10" },
      {
        activity: "Lara Souza da Trindade teve consulta médica agendada.",
        date: "2024-09-12"
      },
      {
        activity: "Lara Souza da Trindade realizou exame de rotina.",
        date: "2024-09-05"
      }
    ],
    "DAVID DO SOCORRO QUEIROZ DE OLIVEIRA": [
      {
        activity: "David do Socorro Queiroz de Oliveira não foi vacinado.",
        date: "2024-06-15"
      },
      {
        activity:
          "David do Socorro Queiroz de Oliveira teve consulta médica agendada.",
        date: "2024-07-02"
      },
      {
        activity:
          "David do Socorro Queiroz de Oliveira realizou exame de rotina.",
        date: "2024-07-10"
      }
    ],
    "EMERSON ELVES MATOS ALBUQUERQUE": [
      {
        activity: "Emerson Elves Matos Albuquerque foi vacinado.",
        date: "2024-10-20"
      },
      {
        activity:
          "Emerson Elves Matos Albuquerque não compareceu à consulta médica.",
        date: "2024-11-01"
      },
      {
        activity: "Emerson Elves Matos Albuquerque realizou exame de rotina.",
        date: "2024-11-15"
      }
    ]
  }

const schoolActivityMapping: {
  [key: string]: { activity: string; date: string }[]
} = {
  "HENRY GABRIEL DA SILVA FERREIRA": [
    {
      activity: "Henry Gabriel da Silva Ferreira entrou na escola.",
      date: "2024-03-01"
    },
    {
      activity: "Henry Gabriel da Silva Ferreira realizou prova de Matemática.",
      date: "2024-10-20"
    },
    {
      activity:
        "Henry Gabriel da Silva Ferreira apresentou o projeto de Ciências.",
      date: "2024-09-15"
    },
    {
      activity: "Henry Gabriel da Silva Ferreira saiu da escola.",
      date: "2024-12-15"
    }
  ],
  "LARA SOUZA DA TRINDADE": [
    {
      activity: "Lara Souza da Trindade entrou na escola.",
      date: "2024-01-05"
    },
    {
      activity: "Lara Souza da Trindade realizou prova de História.",
      date: "2024-08-12"
    },
    {
      activity:
        "Lara Souza da Trindade realizou atividade externa de aprendizado.",
      date: "2024-07-15"
    },
    {
      activity: "Lara Souza da Trindade apresentou em um evento da escola.",
      date: "2024-11-30"
    }
  ],
  "DAVID DO SOCORRO QUEIROZ DE OLIVEIRA": [
    {
      activity: "David do Socorro Queiroz de Oliveira entrou na escola.",
      date: "2024-04-01"
    },
    {
      activity:
        "David do Socorro Queiroz de Oliveira realizou prova de Física.",
      date: "2024-06-18"
    },
    {
      activity:
        "David do Socorro Queiroz de Oliveira apresentou o projeto de Robótica.",
      date: "2024-06-30"
    },
    {
      activity: "David do Socorro Queiroz de Oliveira saiu da escola.",
      date: "2024-12-05"
    }
  ]
}

export function PersonData({
  pessoasCadunico,
  pessoasSaude,
  searchTerm
}: PersonDataProps) {
  const filteredCadunicoData = pessoasCadunico.filter(
    (pessoa) =>
      pessoa.pessoaNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pessoa.pessoaCPF.includes(searchTerm)
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
  const hasResults = combinedData.length > 0 && searchTerm.trim() !== ""

  return (
    <ScrollArea className="h-full w-full rounded-lg border border-neutral-300 bg-white shadow-lg">
      <div className="relative flex flex-col items-center w-full">
        {hasResults && (
          <div className="flex flex-col items-center justify-center py-6 bg-neutral-100 w-full rounded-t-lg shadow-md">
            <Avatar className="w-40 h-40">
              <AvatarImage
                src={
                  combinedData[0].nomeCidadao ===
                  "Hyrllen Batista Lisboa Furtado"
                    ? "https://example.com/avatar-image.png"
                    : combinedData[0].avatar
                }
                alt="Avatar"
                onError={(e) => {
                  e.currentTarget.src = "/images/default-avatar.jpg"
                }}
              />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <h2 className="font-medium">
              {combinedData[0].pessoaNome ||
                combinedData[0].nomeCidadao ||
                "Nome do Cidadão"}
            </h2>
          </div>
        )}
        <div className="w-full px-6 py-8">
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
                      pessoa.numeroDomicilio
                    ]
                      .filter(Boolean)
                      .join(", ") || "Endereço não disponível"

                  return (
                    <div
                      key={pessoa.coFatorCidadao || pessoa.pessoaNome}
                      className="w-full p-2 bg-white"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        <div className="flex flex-col">
                          <dt className="font-medium text-neutral-900">CPF</dt>
                          <dd className="text-neutral-700">
                            {pessoa.pessoaCPF || cpf || "CPF não disponível"}
                          </dd>
                        </div>

                        <div className="flex flex-col">
                          <dt className="font-medium text-neutral-900">
                            Data de Nasc.
                          </dt>
                          <dd className="text-neutral-700">
                            {pessoa.dataNascimento ||
                              date ||
                              "Data de nascimento não disponível"}
                          </dd>
                        </div>

                        <div className="flex flex-col">
                          <dt className="font-medium text-neutral-900">Sexo</dt>
                          <dd className="text-neutral-700">
                            {pessoa.sexo || sex || "Sexo não informado"}
                          </dd>
                        </div>

                        <div className="flex flex-col">
                          <dt className="font-medium text-neutral-900">
                            Endereço
                          </dt>
                          <dd className="text-neutral-700">{address}</dd>
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
          <div className="w-full p-6 mt-6 bg-neutral-50 border-t-2 border-neutral-200 rounded-lg shadow-sm flex flex-col">
            <h3 className="text-xl font-semibold text-neutral-700 mb-4">
              Histórico de Atividades
            </h3>
            <div className="max-h-96 overflow-y-auto space-y-4">
              {combinedData.map((pessoa) => {
                const personNameCidadao =
                  pessoa.nomeCidadao?.toUpperCase() || ""
                const personNamePessoa = pessoa.pessoaNome?.toUpperCase() || ""

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
                    className="w-full flex flex-col space-y-4"
                  >
                    {allActivities.length > 0 ? (
                      allActivities.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 w-full"
                        >
                          {/* Ícone representativo da atividade */}
                          <span className="flex-shrink-0">
                            <div
                              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                activity.activity.includes("Saúde")
                                  ? "bg-blue-500"
                                  : "bg-green-500"
                              }`}
                            >
                              {activity.activity.includes("Saúde") ? (
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
                            <p className="text-neutral-700 font-medium">
                              {activity.activity}
                            </p>
                            <p className="text-neutral-500 text-sm">
                              há{" "}
                              {formatDistanceToNow(parseISO(activity.date), {
                                addSuffix: true
                              })}
                            </p>
                            {pessoa.unidadeSaude &&
                              activity.activity.includes("Saúde") && (
                                <p className="text-neutral-600 text-sm">
                                  Unidade de Saúde:{" "}
                                  {pessoa.unidadeSaude || "Não informado"}
                                </p>
                              )}
                            {/* Status atualizado da atividade */}
                            {activity.previousStatus && (
                              <div className="mt-1 text-sm text-neutral-600">
                                <span className="font-semibold">Antes:</span>{" "}
                                {activity.previousStatus}
                              </div>
                            )}
                            {activity.currentStatus && (
                              <div className="mt-1 text-sm text-neutral-600">
                                <span className="font-semibold">Agora:</span>{" "}
                                {activity.currentStatus}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-neutral-600 text-sm">
                        Nenhum histórico de atividades encontrado.
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
