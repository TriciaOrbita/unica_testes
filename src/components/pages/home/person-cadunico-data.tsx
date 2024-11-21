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
      <h2 className="rounded-t-lg border-b border-neutral-300 bg-green-600 p-2 pb-2 text-center text-2xl font-bold text-white">
        Dados do CadÚnico
      </h2>
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((pessoa: PessoaCadunico) => (
            <div
              key={pessoa.pessoaCPF}
              className="gap-4 border bg-white p-4 shadow-sm sm:grid-cols-2"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-neutral-800">
                    Nome:
                  </span>
                  <div className="break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                    {pessoa.pessoaNome || 'Nome não disponível'}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-neutral-800">
                    Data de Nascimento:
                  </span>
                  <div className="break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                    {pessoa.dataNascimento}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-neutral-800">
                    Sexo:
                  </span>
                  <div className="break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                    {pessoa.sexo}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-neutral-800">
                    Situação de Rua:
                  </span>
                  <div className="break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                    {pessoa.situacaoRua === '0'
                      ? 'Não está em situação de rua'
                      : 'Está em situação de rua'}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {pessoa.pessoaNIS && (
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-neutral-800">
                      NIS:
                    </span>
                    <div className="break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                      {pessoa.pessoaNIS}
                    </div>
                  </div>
                )}
                {pessoa.mesesDesatualizacaoCadastro && (
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-neutral-800">
                      Meses de Desatualização do Cadastro:
                    </span>
                    <div className="break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                      {pessoa.mesesDesatualizacaoCadastro}
                    </div>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-neutral-800">
                    CPF:
                  </span>
                  <div className="break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                    {pessoa.pessoaCPF || 'CPF não disponível'}
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
      </div>
    </div>
  )
}
