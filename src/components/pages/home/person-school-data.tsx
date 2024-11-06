import React from "react"

interface PessoaEscola {
  cpf: string
  nome: string
  situacao: string
  dataNascimento: string
  idadeMeses: string
  sexo: string
  nomeEscola: string
  turma: string
  bolsaFamilia: string
  pcd: string
  filiacao1: string
  filiacao2: string
  dataAtt: string
  localizacao: string
  bairro: string
  logradouro: string
  numero: string
}

interface PersonSchoolDataProps {
  pessoasEscola: PessoaEscola[] // Expecting an array of PessoaEscola
  searchTerm: string // Accept search term as a prop
}

export function PersonSchoolData({
  pessoasEscola,
  searchTerm
}: PersonSchoolDataProps) {
  if (!pessoasEscola || pessoasEscola.length === 0) {
    return (
      <p className="text-neutral-600 italic">Nenhum dado escolar disponível.</p>
    )
  }

  // Filter data based on the search term
  const filteredData = pessoasEscola.filter(
    (pessoa) =>
      pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pessoa.cpf.includes(searchTerm) // Also filter by CPF
  )

  return (
    <div className="w-full max-w-[90rem] mx-auto p-8 rounded-lg border border-neutral-200 bg-gray-50 shadow-lg min-w-[400px]">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 border-b border-neutral-300 pb-2">
        Dados Escolares
      </h2>
      {filteredData.length > 0 ? (
        filteredData.map((pessoa: PessoaEscola) => (
          <div
            key={pessoa.cpf}
            className="grid grid-cols-2 gap-6 mb-6 p-4 rounded-lg bg-white shadow-sm border border-neutral-200"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="text-neutral-800 font-semibold">
                  Última Atualização:
                </span>
                <span className="text-neutral-600">
                  {pessoa.dataAtt || "Data não disponível"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-800 font-semibold">
                  Nome da Escola:
                </span>
                <span className="text-neutral-600">
                  {pessoa.nomeEscola || "Nome não disponível"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-800 font-semibold">Turma:</span>
                <span className="text-neutral-600">
                  {pessoa.turma || "Turma não disponível"}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="text-neutral-800 font-semibold">
                  Situação:
                </span>
                <span className="text-neutral-600">
                  {pessoa.situacao || "Situação não disponível"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-800 font-semibold">PCD:</span>
                <span className="text-neutral-600">
                  {pessoa.pcd || "Não disponível"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-800 font-semibold">
                  Filiação 1:
                </span>
                <span className="text-neutral-600">
                  {pessoa.filiacao1 || "Não disponível"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-800 font-semibold">
                  Filiação 2:
                </span>
                <span className="text-neutral-600">
                  {pessoa.filiacao2 || "Não disponível"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ visibility: "hidden" }}>
                  {pessoa.cpf}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-neutral-500 italic">Nenhum resultado encontrado.</p> // Message if no results match
      )}
    </div>
  )
}
