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
    <div className="w-full max-w-[90rem] mx-auto p-6 rounded-lg border border-neutral-200 bg-gray-50 shadow-lg min-w-[400px]">
      <h2 className="text-xl font-bold text-blue-800 mb-4 border-b border-neutral-300 pb-1">
        Dados do CadÚnico
      </h2>
      <div>
        {filteredData.length > 0 ? (
          filteredData.map((pessoa: PessoaCadunico) => (
            <div
              key={pessoa.pessoaCPF}
              className="grid grid-cols-2 gap-4 mb-4 p-3 rounded-lg bg-white shadow-sm border border-neutral-200 text-sm"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <span className="text-neutral-800 font-medium">Nome:</span>
                  <span className="text-neutral-600">
                    {pessoa.pessoaNome || "Nome não disponível"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-800 font-medium">
                    Data de Nascimento:
                  </span>
                  <span className="text-neutral-600">
                    {pessoa.dataNascimento}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-800 font-medium">Sexo:</span>
                  <span className="text-neutral-600">{pessoa.sexo}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-800 font-medium">
                    Situação de Rua:
                  </span>
                  <span className="text-neutral-600">
                    {pessoa.situacaoRua === "0"
                      ? "Não está em situação de rua"
                      : "Está em situação de rua"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {pessoa.pessoaNIS && (
                  <div className="flex flex-col">
                    <span className="text-neutral-800 font-medium">NIS:</span>
                    <span className="text-neutral-600">{pessoa.pessoaNIS}</span>
                  </div>
                )}
                {pessoa.mesesDesatualizacaoCadastro && (
                  <div className="flex flex-col">
                    <span className="text-neutral-800 font-medium">
                      Meses de Desatualização do Cadastro:
                    </span>
                    <span className="text-neutral-600">
                      {pessoa.mesesDesatualizacaoCadastro}
                    </span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-neutral-800 font-medium">CPF:</span>
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
