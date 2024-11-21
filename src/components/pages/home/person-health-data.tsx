import React from 'react'

type PessoaSaude = {
  nomeCidadao: string
  coFatorCidadao: string
  ultimaAtualizacao: string
  unidadeSaude: string
  ultimaConsultaFormatada: string
  ultimaVisitaDomiciliarFormatada: string
  deficiencia: string
  diabetes: string
  hipertensaoArterial: string
  condicaoSaude: string
}

interface PersonHealthDataProps {
  pessoasSaude: PessoaSaude[]
  searchTerm: string
}

const cpfMapping: { [key: string]: string } = {
  'Lara Souza da Trindade': '09579794286',
  'HENRY GABRIEL DA SILVA FERREIRA': '10028205294',
  'Hyrllen Batista Lisboa Furtado': '01809843227',
}

export function PersonHealthData({
  pessoasSaude,
  searchTerm,
}: PersonHealthDataProps) {
  if (!pessoasSaude || pessoasSaude.length === 0) {
    return <p className="italic text-neutral-600">Nenhum dado disponível.</p>
  }

  const filteredData = pessoasSaude.filter((pessoa) => {
    const cpf = cpfMapping[pessoa.nomeCidadao]
    return (
      pessoa.nomeCidadao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cpf && cpf.includes(searchTerm))
    )
  })

  const uniqueData: PessoaSaude[] = Array.from(
    new Map(
      filteredData.map((pessoa) => [pessoa.coFatorCidadao, pessoa]),
    ).values(),
  )

  return (
    <div className="">
      {/* Título em verde com texto branco */}
      <h2 className="border-b border-neutral-300 pb-2 text-2xl font-bold text-center text-white bg-green-600 p-2 rounded-t-lg">
        Dados de Saúde
      </h2>
  
      {uniqueData.length > 0 ? (
        uniqueData.map((pessoa: PessoaSaude) => {
          const healthCondition =
            pessoa.nomeCidadao === 'HENRY GABRIEL DA SILVA FERREIRA'
              ? 'CID J45 - Asma'
              : pessoa.condicaoSaude;
  
          const vacinaPendente =
            pessoa.nomeCidadao === 'HENRY GABRIEL DA SILVA FERREIRA'
              ? 'Gripe'
              : pessoa.nomeCidadao === 'Lara Souza da Trindade'
              ? 'Catapora'
              : undefined;
  
          const cpf = cpfMapping[pessoa.nomeCidadao];
  
          return (
            <div
              key={pessoa.coFatorCidadao}
              className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border bg-white p-4 shadow-sm"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-neutral-800 text-base">
                    Última Atualização:
                  </span>
                  <div className="border border-green-600 p-2 rounded-md bg-white text-neutral-600 break-words">
                    {pessoa.ultimaAtualizacao}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-neutral-800 text-base">
                    Unidade:
                  </span>
                  <div className="border border-green-600 p-2 rounded-md bg-white text-neutral-600 break-words">
                    {pessoa.unidadeSaude}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-neutral-800 text-base">
                    Consulta:
                  </span>
                  <div className="border border-green-600 p-2 rounded-md bg-white text-neutral-600 break-words">
                    {pessoa.ultimaConsultaFormatada}
                  </div>
                </div>
              </div>
  
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-neutral-800 text-base">
                    Saúde:
                  </span>
                  <div className="border border-green-600 p-2 rounded-md bg-white text-neutral-600 break-words">
                    {pessoa.deficiencia === '0' &&
                    pessoa.diabetes === '0' &&
                    pessoa.hipertensaoArterial === '0'
                      ? 'Sem problemas de saúde.'
                      : 'Com problemas de saúde.'}
                  </div>
                </div>
  
                {vacinaPendente && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-neutral-800 text-base">
                      Vacina Pendente:
                    </span>
                    <div className="border border-green-600 p-2 rounded-md bg-white text-neutral-600 break-words">
                      {vacinaPendente}
                    </div>
                  </div>
                )}

                  <div className="flex flex-col">
                    <span className="font-semibold text-neutral-800 text-base">
                      Visita Domiciliar:
                    </span>
                    <div className="border border-green-600 p-2 rounded-md bg-white text-neutral-600 break-words">
                      {pessoa.ultimaVisitaDomiciliarFormatada}
                    </div>
                  </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="italic text-neutral-500">Nenhum resultado encontrado.</p>
      )}
    </div>
  )
}
