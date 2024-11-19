import React from 'react'

interface PessoaCadunico {
  pessoaNome: string
  pessoaCPF: string
  pessoaNIS?: string
  sexo: string
  dataNascimento: string
  ufNascimento: string
  municipioNascimento: string
  situacaoRua: string
  local: string
  rua: string
  numeroLogradouro: string
  mesesDesatualizacaoCadastro: string
}

interface PersonCadunicoDataProps {
  pessoasCadunico: PessoaCadunico[]
  searchTerm: string
}

export function PersonCadunicoData({
  pessoasCadunico,
  searchTerm,
}: PersonCadunicoDataProps) {
  if (!pessoasCadunico || pessoasCadunico.length === 0) {
    return (
      <p className="italic text-neutral-600">
        Nenhum dado do CADÚnico disponível.
      </p>
    )
  }

  const filteredData = pessoasCadunico.filter(
    (pessoa) =>
      pessoa.pessoaNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pessoa.pessoaCPF.includes(searchTerm),
  )

  return (
    <div className="mx-auto w-full min-w-[400px] max-w-[90rem] rounded-lg border border-neutral-200 bg-gray-50 p-6 shadow-lg">
      <h2 className="mb-4 border-b border-neutral-300 pb-1 text-xl font-bold text-blue-800">
        Dados do CadÚnico
      </h2>
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((pessoa: PessoaCadunico) => (
            <div
              key={pessoa.pessoaCPF}
              className="mb-4 grid grid-cols-2 gap-4 rounded-lg border border-neutral-200 bg-white p-3 text-sm shadow-sm"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <span className="font-medium text-neutral-800">Nome:</span>
                  <span className="text-neutral-600">
                    {pessoa.pessoaNome || 'Nome não disponível'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-neutral-800">
                    Data de Nascimento:
                  </span>
                  <span className="text-neutral-600">
                    {pessoa.dataNascimento}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-neutral-800">Sexo:</span>
                  <span className="text-neutral-600">{pessoa.sexo}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-neutral-800">
                    Situação de Rua:
                  </span>
                  <span className="text-neutral-600">
                    {pessoa.situacaoRua === '0'
                      ? 'Não está em situação de rua'
                      : 'Está em situação de rua'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {pessoa.pessoaNIS && (
                  <div className="flex flex-col">
                    <span className="font-medium text-neutral-800">NIS:</span>
                    <span className="text-neutral-600">{pessoa.pessoaNIS}</span>
                  </div>
                )}
                {pessoa.mesesDesatualizacaoCadastro && (
                  <div className="flex flex-col">
                    <span className="font-medium text-neutral-800">
                      Meses de Desatualização do Cadastro:
                    </span>
                    <span className="text-neutral-600">
                      {pessoa.mesesDesatualizacaoCadastro}
                    </span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-medium text-neutral-800">CPF:</span>
                  <span className="text-neutral-600">
                    {pessoa.pessoaCPF || 'CPF não disponível'}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="italic text-neutral-500">
            Nenhum resultado encontrado.
          </p>
        )}
      </div>
    </div>
  )
}
