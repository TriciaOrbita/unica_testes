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
    <div className="">
      {/* Título em verde com texto branco */}
      <h2 className="border-b border-neutral-300 pb-2 text-2xl font-bold text-center text-white bg-green-600 p-2 rounded-t-lg">
        Dados do CadÚnico
      </h2>
  
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((pessoa: PessoaCadunico) => (
            <div
              key={pessoa.pessoaCPF}
              className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border bg-white p-4 shadow-sm"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-neutral-800 text-base">
                    Nome:
                  </span>
                  <div className="border border-green-600 p-2 rounded-md bg-white text-neutral-600 break-words">
                    {pessoa.pessoaNome || 'Nome não disponível'}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-neutral-800 text-base">
                    Data de Nascimento:
                  </span>
                  <div className="border border-green-600 p-2 rounded-md bg-white text-neutral-600 break-words">
                    {pessoa.dataNascimento}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-neutral-800 text-base">
                    Sexo:
                  </span>
                  <div className="border border-green-600 p-2 rounded-md bg-white text-neutral-600 break-words">
                    {pessoa.sexo}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-neutral-800 text-base">
                    Situação de Rua:
                  </span>
                  <div className="border border-green-600 p-2 rounded-md bg-white text-neutral-600 break-words">
                    {pessoa.situacaoRua === '0'
                      ? 'Não está em situação de rua'
                      : 'Está em situação de rua'}
                  </div>
                </div>
              </div>
  
              <div className="flex flex-col gap-4">
                {pessoa.pessoaNIS && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-neutral-800 text-base">
                      NIS:
                    </span>
                    <div className="border border-green-600 p-2 rounded-md bg-white text-neutral-600 break-words">
                      {pessoa.pessoaNIS}
                    </div>
                  </div>
                )}
                {pessoa.mesesDesatualizacaoCadastro && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-neutral-800 text-base">
                      Meses de Desatualização do Cadastro:
                    </span>
                    <div className="border border-green-600 p-2 rounded-md bg-white text-neutral-600 break-words">
                      {pessoa.mesesDesatualizacaoCadastro}
                    </div>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-semibold text-neutral-800 text-base">
                    CPF:
                  </span>
                  <div className="border border-green-600 p-2 rounded-md bg-white text-neutral-600 break-words">
                    {pessoa.pessoaCPF || 'CPF não disponível'}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="italic text-neutral-500">Nenhum resultado encontrado.</p>
        )}
      </div>
    </div>
  )
}
