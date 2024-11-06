import React from "react"

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
  searchTerm
}: PersonCadunicoDataProps) {
  if (!pessoasCadunico || pessoasCadunico.length === 0) {
    return (
      <p className="text-neutral-600 italic">
        Nenhum dado do CADÚnico disponível.
      </p>
    )
  }

  const filteredData = pessoasCadunico.filter(
    (pessoa) =>
      pessoa.pessoaNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pessoa.pessoaCPF.includes(searchTerm)
  )

  return (
    <div className="w-full max-w-[90rem] mx-auto p-8 rounded-lg border border-neutral-200 bg-gray-50 shadow-lg min-w-[400px]">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 border-b border-neutral-300 pb-2">
        Dados do CadÚnico
      </h2>
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((pessoa: PessoaCadunico) => (
            <div
              key={pessoa.pessoaCPF}
              className="grid grid-cols-2 gap-6 mb-6 p-4 rounded-lg bg-white shadow-sm border border-neutral-200"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-neutral-800 font-semibold">Nome:</span>
                  <span className="text-neutral-600">
                    {pessoa.pessoaNome || "Nome não disponível"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-800 font-semibold">
                    Data de Nascimento:
                  </span>
                  <span className="text-neutral-600">
                    {pessoa.dataNascimento}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-800 font-semibold">Sexo:</span>
                  <span className="text-neutral-600">{pessoa.sexo}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-800 font-semibold">
                    Situação de Rua:
                  </span>
                  <span className="text-neutral-600">
                    {pessoa.situacaoRua === "0"
                      ? "Não está em situação de rua"
                      : "Está em situação de rua"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {pessoa.pessoaNIS && (
                  <div className="flex flex-col">
                    <span className="text-neutral-800 font-semibold">NIS:</span>
                    <span className="text-neutral-600">{pessoa.pessoaNIS}</span>
                  </div>
                )}
                {pessoa.mesesDesatualizacaoCadastro && (
                  <div className="flex flex-col">
                    <span className="text-neutral-800 font-semibold">
                      Meses de Desatualização do Cadastro:
                    </span>
                    <span className="text-neutral-600">
                      {pessoa.mesesDesatualizacaoCadastro}
                    </span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-neutral-800 font-semibold">CPF:</span>
                  <span className="text-neutral-600">
                    {pessoa.pessoaCPF || "CPF não disponível"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-neutral-500 italic">
            Nenhum resultado encontrado.
          </p>
        )}
      </div>
    </div>
  )
}
