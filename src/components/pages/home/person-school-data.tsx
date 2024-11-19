import React from 'react'

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
  searchTerm,
}: PersonSchoolDataProps) {
  if (!pessoasEscola || pessoasEscola.length === 0) {
    return (
      <p className="italic text-neutral-600">Nenhum dado escolar disponível.</p>
    )
  }

  const filteredData = pessoasEscola.filter(
    (pessoa) =>
      pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pessoa.cpf.includes(searchTerm),
  )

  return (
    <div className="mx-auto w-full min-w-[400px] max-w-[90rem] rounded-lg border border-neutral-200 bg-gray-50 p-6 shadow-lg">
      <h2 className="mb-4 border-b border-neutral-300 pb-1 text-xl font-bold text-blue-800">
        Dados Escolares
      </h2>
      {filteredData.length > 0 ? (
        filteredData.map((pessoa: PessoaEscola) => (
          <div
            key={pessoa.cpf}
            className="mb-4 grid grid-cols-2 gap-4 rounded-lg border border-neutral-200 bg-white p-3 text-sm shadow-sm"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="font-medium text-neutral-800">
                  Última Atualização:
                </span>
                <span className="text-neutral-600">
                  {pessoa.dataAtt || 'Data não disponível'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-neutral-800">Escola:</span>
                <span className="text-neutral-600">
                  {pessoa.nomeEscola || 'Nome não disponível'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-neutral-800">Turma:</span>
                <span className="text-neutral-600">
                  {pessoa.turma || 'Turma não disponível'}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="font-medium text-neutral-800">Situação:</span>
                <span className="text-neutral-600">
                  {pessoa.situacao || 'Situação não disponível'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-neutral-800">PCD:</span>
                <span className="text-neutral-600">
                  {pessoa.pcd || 'Não disponível'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-neutral-800">
                  Filiação 1:
                </span>
                <span className="text-neutral-600">
                  {pessoa.filiacao1 || 'Não disponível'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-neutral-800">
                  Filiação 2:
                </span>
                <span className="text-neutral-600">
                  {pessoa.filiacao2 || 'Não disponível'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ visibility: 'hidden' }}>
                  {pessoa.cpf}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="italic text-neutral-500">Nenhum resultado encontrado.</p>
      )}
    </div>
  )
}
