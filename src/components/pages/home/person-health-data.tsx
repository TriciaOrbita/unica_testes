import React from "react"
import { PessoaSaude } from "@/service/queries/getPessoasSaude"

interface PersonHealthDataProps {
  pessoasSaude: PessoaSaude[] // Array de dados de saúde de cada pessoa
  searchTerm: string // Termo de busca fornecido pelo usuário
}

// Mapeamento de nomes para CPF
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
    return <p>Nenhum dado de saúde disponível.</p>
  }

  // Filtra os dados com base no termo de busca
  const filteredData = pessoasSaude.filter((pessoa) => {
    const cpf = cpfMapping[pessoa.nomeCidadao]
    return (
      pessoa.nomeCidadao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cpf && cpf.includes(searchTerm))
    )
  })

  // Usa um Set para garantir que os dados exibidos são únicos, com base em coFatorCidadao
  const uniqueData: PessoaSaude[] = Array.from(
    new Map(
      filteredData.map((pessoa) => [pessoa.coFatorCidadao, pessoa])
    ).values()
  )

  return (
    <div className="w-full max-w-[90rem] mx-auto p-8 rounded-lg border border-neutral-300 bg-white shadow-lg min-w-[400px]">
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        DADOS DE SAÚDE
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
              className="grid grid-cols-2 gap-6 mb-4 border-b border-neutral-200 pb-4"
            >
              <div className="flex flex-col">
                <div className="mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm">
                  <p className="text-md font-medium text-neutral-800">
                    Última Atualização:
                  </p>
                  <p className="text-md text-neutral-600">
                    {pessoa.ultimaAtualizacao}
                  </p>
                </div>
                <div className="mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm">
                  <p className="text-md font-medium text-neutral-800">
                    Unidade de Saúde:
                  </p>
                  <p className="text-md text-neutral-600">
                    {pessoa.unidadeSaude}
                  </p>
                </div>
                <div className="mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm">
                  <p className="text-md font-medium text-neutral-800">
                    Última Consulta:
                  </p>
                  <p className="text-md text-neutral-600">
                    {pessoa.ultimaConsultaFormatada}
                  </p>
                </div>
                <div className="mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm">
                  <p className="text-md font-medium text-neutral-800">
                    Última Visita Domiciliar:
                  </p>
                  <p className="text-md text-neutral-600">
                    {pessoa.ultimaVisitaDomiciliarFormatada}
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm">
                  <p className="text-md font-medium text-neutral-800">
                    Condição de Saúde:
                  </p>
                  <p className="text-md text-neutral-600">
                    {pessoa.deficiencia === "0" &&
                    pessoa.diabetes === "0" &&
                    pessoa.hipertensaoArterial === "0"
                      ? "Não possui nenhum problema de saúde."
                      : "Possui alguns problemas de saúde."}
                  </p>
                </div>
                {healthCondition && (
                  <div className="mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm">
                    <p className="text-md font-medium text-neutral-800">
                      Condição de Saúde:
                    </p>
                    <p className="text-md text-neutral-600">
                      {healthCondition}
                    </p>
                  </div>
                )}
                {vacinaPendente && (
                  <div className="mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm">
                    <p className="text-md font-medium text-neutral-800">
                      Vacina Pendente:
                    </p>
                    <p className="text-md text-neutral-600">{vacinaPendente}</p>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <p className="text-xs" style={{ visibility: "hidden" }}>
                    Nome: {pessoa.nomeCidadao || "Nome não disponível"}
                  </p>
                  <p className="text-xs" style={{ visibility: "hidden" }}>
                    CPF: {cpf || "CPF não disponível"}
                  </p>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <p>Nenhum resultado encontrado.</p> // Mensagem caso não haja resultados correspondentes
      )}
    </div>
  )
}
