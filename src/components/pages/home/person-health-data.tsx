import React from "react"
import { PessoaSaude } from "@/service/queries/getPessoasSaude"

interface PersonHealthDataProps {
  pessoasSaude: PessoaSaude[]
  searchTerm: string
}

const cpfMapping: { [key: string]: string } = {
  "Lara Souza da Trindade": "09579794286",
  "HENRY GABRIEL DA SILVA FERREIRA": "10028205294",
  "Hyrllen Batista Lisboa Furtado": "01809843227"
}

export function PersonHealthData({
  pessoasSaude,
  searchTerm
}: PersonHealthDataProps) {
  if (!pessoasSaude || pessoasSaude.length === 0) {
    return (
      <p className="text-neutral-600 italic">
        Nenhum dado de saúde disponível.
      </p>
    )
  }

  const filteredData = pessoasSaude.filter((pessoa) => {
    const cpf = cpfMapping[pessoa.nomeCidadao]
    return (
      pessoa.nomeCidadao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cpf && cpf.includes(searchTerm))
    )
  })

  const uniqueData: PessoaSaude[] = Array.from(
    new Map(
      filteredData.map((pessoa) => [pessoa.coFatorCidadao, pessoa])
    ).values()
  )

  return (
    <div className="w-full max-w-[90rem] mx-auto p-8 rounded-lg border border-neutral-200 bg-gray-50 shadow-lg min-w-[400px]">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 border-b border-neutral-300 pb-2">
        Dados de Saúde
      </h2>
      {uniqueData.length > 0 ? (
        uniqueData.map((pessoa: PessoaSaude) => {
          const healthCondition =
            pessoa.nomeCidadao === "HENRY GABRIEL DA SILVA FERREIRA"
              ? "CID J45 - Asma"
              : pessoa.condicaoSaude

          const vacinaPendente =
            pessoa.nomeCidadao === "HENRY GABRIEL DA SILVA FERREIRA"
              ? "Vacina contra a Gripe"
              : pessoa.nomeCidadao === "Lara Souza da Trindade"
                ? "Vacina contra a Catapora"
                : undefined

          const cpf = cpfMapping[pessoa.nomeCidadao]

          return (
            <div
              key={pessoa.coFatorCidadao}
              className="grid grid-cols-2 gap-6 mb-6 p-4 rounded-lg bg-white shadow-sm border border-neutral-200"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-neutral-800 font-semibold">
                    Última Atualização:
                  </span>
                  <span className="text-neutral-600">
                    {pessoa.ultimaAtualizacao}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-800 font-semibold">
                    Unidade de Saúde:
                  </span>
                  <span className="text-neutral-600">
                    {pessoa.unidadeSaude}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-800 font-semibold">
                    Última Consulta:
                  </span>
                  <span className="text-neutral-600">
                    {pessoa.ultimaConsultaFormatada}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-800 font-semibold">
                    Última Visita Domiciliar:
                  </span>
                  <span className="text-neutral-600">
                    {pessoa.ultimaVisitaDomiciliarFormatada}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-neutral-800 font-semibold">
                    Condição de Saúde:
                  </span>
                  <span className="text-neutral-600">
                    {pessoa.deficiencia === "0" &&
                    pessoa.diabetes === "0" &&
                    pessoa.hipertensaoArterial === "0"
                      ? "Não possui nenhum problema de saúde."
                      : "Possui alguns problemas de saúde."}
                  </span>
                </div>
                {healthCondition && (
                  <div className="flex flex-col">
                    <span className="text-neutral-800 font-semibold">
                      Condição de Saúde:
                    </span>
                    <span className="text-neutral-600">{healthCondition}</span>
                  </div>
                )}
                {vacinaPendente && (
                  <div className="flex flex-col">
                    <span className="text-neutral-800 font-semibold">
                      Vacina Pendente:
                    </span>
                    <span className="text-neutral-600">{vacinaPendente}</span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-neutral-800 font-semibold">CPF:</span>
                  <span className="text-neutral-600">
                    {cpf || "CPF não disponível"}
                  </span>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <p className="text-neutral-500 italic">Nenhum resultado encontrado.</p>
      )}
    </div>
  )
}
