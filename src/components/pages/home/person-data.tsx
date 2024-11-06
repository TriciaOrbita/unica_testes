import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { PessoaSaude } from "@/service/queries/getPessoasSaude"

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
      { activity: "Vacinação Realizada", date: "2024-11-01" },
      { activity: "Consulta Médica Agendada", date: "2024-11-02" },
      { activity: "Exame de Rotina Realizado", date: "2024-11-03" }
    ],
    "Hyrllen Batista Lisboa Furtado": [
      { activity: "Vacinação Realizada", date: "2024-10-20" },
      { activity: "Consulta Médica Não Compareceu", date: "2024-10-25" },
      { activity: "Exame de Rotina Realizado", date: "2024-09-15" }
    ],
    "LARA SOUZA DA TRINDADE": [
      { activity: "Vacinação Realizada", date: "2024-08-10" },
      { activity: "Consulta Médica Agendada", date: "2024-09-12" },
      { activity: "Exame de Rotina Realizado", date: "2024-09-05" }
    ],
    "DAVID DO SOCORRO QUEIROZ DE OLIVEIRA": [
      { activity: "Vacinação Não Realizada", date: "2024-06-15" },
      { activity: "Consulta Médica Agendada", date: "2024-07-02" },
      { activity: "Exame de Rotina Realizado", date: "2024-07-10" }
    ],
    "EMERSON ELVES MATOS ALBUQUERQUE": [
      { activity: "Vacinação Realizada", date: "2024-10-20" },
      { activity: "Consulta Médica Não Compareceu", date: "2024-11-01" },
      { activity: "Exame de Rotina Realizado", date: "2024-11-15" }
    ]
  }

const formatDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number)
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
    "pt-BR"
  )
  return formattedDate
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

  const getCardColor = (activity: string) => {
    if (activity.includes("Vacinação")) return "bg-blue-100 text-blue-800" // Azul claro
    if (activity.includes("Consulta")) return "bg-green-100 text-green-800" // Verde claro
    if (activity.includes("Exame")) return "bg-yellow-100 text-yellow-800" // Amarelo claro
    return "bg-gray-100 text-gray-800" // Cor padrão
  }

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
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 w-full">
                {combinedData.map((pessoa) => {
                  const cpf = cpfMapping[pessoa.nomeCidadao]
                  const date = dateMapping[pessoa.nomeCidadao]
                  const sex = sexMapping[pessoa.nomeCidadao]
                  // const activities = activityMapping[pessoa.nomeCidadao] || []

                  return (
                    <div
                      key={pessoa.coFatorCidadao || pessoa.pessoaNome}
                      className="w-full space-y-6 p-6 rounded-lg border border-neutral-200"
                    >
                      <div className="flex justify-between items-center text-lg">
                        <dt className="font-medium text-neutral-900">CPF</dt>
                        <dd className="text-neutral-700 text-center">
                          {pessoa.pessoaCPF || cpf}
                        </dd>
                      </div>

                      <div className="flex justify-between items-center text-lg">
                        <dt className="font-medium text-neutral-900">
                          Data de Nasc.
                        </dt>
                        <dd className="text-neutral-700 text-center">
                          {pessoa.dataNascimento || date}
                        </dd>
                      </div>

                      <div className="flex justify-between items-center text-lg">
                        <dt className="font-medium text-neutral-900">Sexo</dt>
                        <dd className="text-neutral-700 text-center">
                          {pessoa.sexo || sex}
                        </dd>
                      </div>

                      <div className="flex justify-between items-center text-lg">
                        <dt className="font-medium text-neutral-900">
                          Endereço
                        </dt>
                        <dd className="text-neutral-700 text-center">
                          {pessoa.rua
                            ? `${pessoa.rua}, ${pessoa.numeroLogradouro}, ${pessoa.local}`
                            : "Endereço não disponível"}
                        </dd>
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
          <div className="w-full p-6 mt-6 bg-neutral-50 border-t-2 border-neutral-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-neutral-700 mb-4">
              Histórico de Atividades
            </h3>
            {combinedData.map((pessoa) => {
              const activities = activityMapping[pessoa.nomeCidadao] || []
              return (
                <div
                  key={pessoa.coFatorCidadao || pessoa.pessoaNome}
                  className="space-y-4"
                >
                  {activities.map((activity, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-md ${getCardColor(activity.activity)}`}
                    >
                      <p className="font-medium">{activity.activity}</p>
                      <p className="text-sm">{formatDate(activity.date)}</p>
                      {pessoa.unidadeSaude && (
                        <p className="text-sm font-medium text-neutral-600">
                          Unidade de Saúde:{" "}
                          {pessoa.unidadeSaude || "Não foi informado"}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
