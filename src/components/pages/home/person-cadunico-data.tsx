import React from "react";

interface PessoaCadunico {
  pessoaNome: string; // Nome da pessoa
  pessoaCPF: string; // CPF da pessoa
  pessoaNIS?: string; // Número do CadÚnico (opcional, se aplicável)
  sexo: string; // Sexo
  dataNascimento: string; // Data de nascimento
  ufNascimento: string; // UF de nascimento
  municipioNascimento: string; // Município de nascimento
  situacaoRua: string; // Situação da rua (presumivelmente 0 ou 1)
  local: string; // Local
  rua: string; // Rua
  numeroLogradouro: string; // Número do logradouro
  mesesDesatualizacaoCadastro: string; // Meses de desatualização do cadastro
}

interface PersonCadunicoDataProps {
  pessoasCadunico: PessoaCadunico[]; // Expecting an array of PessoaCadunico
  searchTerm: string; // Accept search term as a prop
}

export function PersonCadunicoData({
  pessoasCadunico,
  searchTerm,
}: PersonCadunicoDataProps) {
  if (!pessoasCadunico || pessoasCadunico.length === 0) {
    return <p>Nenhum dado do CADÚnico disponível.</p>;
  }

  // Filtra os dados com base no termo de busca
  const filteredData = pessoasCadunico.filter(
    (pessoa) =>
      pessoa.pessoaNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pessoa.pessoaCPF.includes(searchTerm), // Também filtra por CPF
  );

  return (
    <div className="w-full max-w-[90rem] mx-auto p-8 rounded-lg border border-neutral-300 bg-white shadow-lg min-w-[400px]">
      <h2 className="text-xl font-semibold text-neutral-800 mb-4">
        DADOS DO CADUNICO
      </h2>
      <div>
        <div className="p-4 border-b border-neutral-100">
          {filteredData.length > 0 ? (
            filteredData.map((pessoa: PessoaCadunico) => (
              <div
                key={pessoa.pessoaCPF}
                className="grid grid-cols-2 gap-6 mb-4 border-b border-neutral-200 pb-4"
              >
                <div className="flex flex-col">
                  <div className="mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm">
                    <p className="text-md font-medium text-neutral-800">
                      Nome:
                    </p>
                    <p className="text-md text-neutral-600">
                      {pessoa.pessoaNome || "Nome não disponível"}
                    </p>
                  </div>
                  <div className="mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm">
                    <p className="text-md font-medium text-neutral-800">
                      Data de Nascimento:
                    </p>
                    <p className="text-md text-neutral-600">
                      {pessoa.dataNascimento}
                    </p>
                  </div>
                  <div className="mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm">
                    <p className="text-md font-medium text-neutral-800">
                      Sexo:
                    </p>
                    <p className="text-md text-neutral-600">{pessoa.sexo}</p>
                  </div>
                  <div className="mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm">
                    <p className="text-md font-medium text-neutral-800">
                      Situação da Rua:
                    </p>
                    <p className="text-md text-neutral-600">
                      {pessoa.situacaoRua === "0"
                        ? "Não está em situação de rua"
                        : "Está em situação de rua"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  {pessoa.pessoaNIS && (
                    <div className="mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm">
                      <p className="text-md font-medium text-neutral-800">
                        NIS:
                      </p>
                      <p className="text-md text-neutral-600">
                        {pessoa.pessoaNIS}
                      </p>
                    </div>
                  )}
                  {pessoa.mesesDesatualizacaoCadastro && (
                    <div className="mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm">
                      <p className="text-md font-medium text-neutral-800">
                        Meses de Desatualização do Cadastro:
                      </p>
                      <p className="text-md text-neutral-600">
                        {pessoa.mesesDesatualizacaoCadastro}
                      </p>
                    </div>
                  )}
                  {/* Exibir CPF invisível */}
                  <div className="flex justify-between items-center">
                    <p className="text-xs" style={{ visibility: "hidden" }}>
                      CPF: {pessoa.pessoaCPF || "CPF não disponível"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum resultado encontrado.</p> // Mensagem se não houver resultados correspondentes
          )}
        </div>
      </div>
    </div>
  );
}
