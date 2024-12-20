import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

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
    <div>
      {/* Título em verde com texto branco */}
      <h2 className="rounded-t-lg border-b border-neutral-300 bg-green-600 p-2 pb-1 text-center text-2xl font-bold text-white">
        Dados Escolares
      </h2>

      {/* Scrollable Area */}
      <ScrollArea className="overflow-auto">
        {' '}
        {/* Ajuste de altura para o ScrollArea */}
        {filteredData.length > 0 ? (
          filteredData.map((pessoa: PessoaEscola) => (
            <div
              key={pessoa.cpf}
              className="mb-4 grid grid-cols-1 gap-4 border border-neutral-200 bg-white p-4 text-sm shadow-sm sm:grid-cols-2"
            >
              {/* Primeira coluna de dados */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <span className="text-base font-medium text-neutral-800">
                    Última Atualização:
                  </span>
                  <div className="min-h-[30px] w-auto break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                    {pessoa.dataAtt || 'Data não disponível'}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-neutral-800">
                    Escola:
                  </span>
                  <div className="min-h-[30px] w-auto break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                    {pessoa.nomeEscola || 'Nome não disponível'}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-neutral-800">
                    Turma:
                  </span>
                  <div className="min-h-[30px] w-auto break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                    {pessoa.turma || 'Turma não disponível'}
                  </div>
                </div>
              </div>

              {/* Segunda coluna de dados */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <span className="text-base font-medium text-neutral-800">
                    Situação:
                  </span>
                  <div className="min-h-[30px] w-auto break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                    {pessoa.situacao || 'Situação não disponível'}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-neutral-800">
                    PCD:
                  </span>
                  <div className="min-h-[30px] w-auto break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                    {pessoa.pcd || 'Não disponível'}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-neutral-800">
                    Filição 1:
                  </span>
                  <div className="min-h-[30px] w-auto break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                    {pessoa.filiacao1 || 'Não disponível'}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-neutral-800">
                    Filição 2:
                  </span>
                  <div className="min-h-[30px] w-auto break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                    {pessoa.filiacao2 || 'Não disponível'}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="italic text-neutral-500">
            Nenhum resultado encontrado.
          </p>
        )}
      </ScrollArea>
    </div>
  )
}
