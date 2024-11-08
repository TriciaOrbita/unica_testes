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
  pessoasEscola: PessoaEscola[]
  searchTerm: string
}

export function PersonSchoolData({
  pessoasEscola,
  searchTerm
}: PersonSchoolDataProps) {
  if (!pessoasEscola || pessoasEscola.length === 0) {
    return (
      <p className="text-neutral-600 italic text-sm">Nenhum dado escolar disponível.</p>
    )
  }

  const filteredData = pessoasEscola.filter(
    (pessoa) =>
      pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pessoa.cpf.includes(searchTerm)
  )

  return (
    <div className="w-full max-w-[90rem] mx-auto p-4 rounded-lg border border-neutral-200 bg-gray-50 shadow-md min-w-[400px]">
      <h2 className="text-lg font-semibold text-blue-800 mb-4 border-b-2 border-neutral-300 pb-1">
        Dados Escolares
      </h2>
      {filteredData.length > 0 ? (
        filteredData.map((pessoa: PessoaEscola) => (
          <div
            key={pessoa.cpf}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 p-4 rounded-lg bg-white shadow-sm border border-neutral-200 transition-transform duration-200 transform hover:scale-102"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="text-neutral-700 text-sm font-medium">
                  Última Atualização:
                </span>
                <div className="border border-neutral-300 rounded-md p-2 text-neutral-600 text-sm">
                  {pessoa.dataAtt || "N/D"}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-700 text-sm font-medium">Escola:</span>
                <div className="border border-neutral-300 rounded-md p-2 text-neutral-600 text-sm">
                  {pessoa.nomeEscola || "N/D"}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-700 text-sm font-medium">Turma:</span>
                <div className="border border-neutral-300 rounded-md p-2 text-neutral-600 text-sm">
                  {pessoa.turma || "N/D"}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="text-neutral-700 text-sm font-medium">Situação:</span>
                <div className="border border-neutral-300 rounded-md p-2 text-neutral-600 text-sm">
                  {pessoa.situacao || "N/D"}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-700 text-sm font-medium">PCD:</span>
                <div className="border border-neutral-300 rounded-md p-2 text-neutral-600 text-sm">
                  {pessoa.pcd || "N/D"}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-700 text-sm font-medium">Filiação 1:</span>
                <div className="border border-neutral-300 rounded-md p-2 text-neutral-600 text-sm">
                  {pessoa.filiacao1 || "N/D"}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-700 text-sm font-medium">Filiação 2:</span>
                <div className="border border-neutral-300 rounded-md p-2 text-neutral-600 text-sm">
                  {pessoa.filiacao2 || "N/D"}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-neutral-500 text-sm italic">Nenhum resultado encontrado.</p>
      )}
    </div>
  )
}
