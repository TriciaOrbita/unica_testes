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
      <p className="text-neutral-600 italic">Nenhum dado escolar disponível.</p>
    )
  }

  const filteredData = pessoasEscola.filter(
    (pessoa) =>
      pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pessoa.cpf.includes(searchTerm)
  )

  return (
    <div className="w-full max-w-[90rem] mx-auto p-6 rounded-lg border border-neutral-200 bg-gray-50 shadow-lg min-w-[400px]">
      <h2 className="text-xl font-bold text-blue-800 mb-4 border-b border-neutral-300 pb-1">
        Dados Escolares
      </h2>
      {filteredData.length > 0 ? (
        filteredData.map((pessoa: PessoaEscola) => (
          <div
            key={pessoa.cpf}
            className="grid grid-cols-2 gap-4 mb-4 p-3 rounded-lg bg-white shadow-sm border border-neutral-200 text-sm"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="text-neutral-800 font-medium">
                  Última Atualização:
                </span>
                <span className="text-neutral-600">
                  {pessoa.dataAtt || "Data não disponível"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-800 font-medium">Escola:</span>
                <span className="text-neutral-600">
                  {pessoa.nomeEscola || "Nome não disponível"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-800 font-medium">Turma:</span>
                <span className="text-neutral-600">
                  {pessoa.turma || "Turma não disponível"}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="text-neutral-800 font-medium">Situação:</span>
                <span className="text-neutral-600">
                  {pessoa.situacao || "Situação não disponível"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-800 font-medium">PCD:</span>
                <span className="text-neutral-600">
                  {pessoa.pcd || "Não disponível"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-800 font-medium">
                  Filiação 1:
                </span>
                <span className="text-neutral-600">
                  {pessoa.filiacao1 || "Não disponível"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-800 font-medium">
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
        <p className="text-neutral-500 italic">Nenhum resultado encontrado.</p>
      )}
    </div>
  )
}
