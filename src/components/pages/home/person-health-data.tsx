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
    <div className="mx-auto w-full min-w-[400px] max-w-[90rem] rounded-lg border border-neutral-200 bg-gray-50 p-6 shadow-lg">
      <h2 className="mb-4 border-b border-neutral-300 pb-1 text-xl font-bold text-blue-800">
        Dados de Saúde
      </h2>
      {uniqueData.length > 0 ? (
        uniqueData.map((pessoa: PessoaSaude) => {
          const healthCondition =
            pessoa.nomeCidadao === 'HENRY GABRIEL DA SILVA FERREIRA'
              ? 'CID J45 - Asma'
              : pessoa.condicaoSaude

          const vacinaPendente =
            pessoa.nomeCidadao === 'HENRY GABRIEL DA SILVA FERREIRA'
              ? 'Gripe'
              : pessoa.nomeCidadao === 'Lara Souza da Trindade'
                ? 'Catapora'
                : undefined

          const cpf = cpfMapping[pessoa.nomeCidadao]

          return (
            <div
              key={pessoa.coFatorCidadao}
              className="mb-4 grid grid-cols-2 gap-4 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <span className="font-semibold text-neutral-800">
                    Última Atualização:
                  </span>
                  <span className="text-sm text-neutral-600">
                    {pessoa.ultimaAtualizacao}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-neutral-800">
                    Unidade:
                  </span>
                  <span className="text-sm text-neutral-600">
                    {pessoa.unidadeSaude}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-neutral-800">
                    Consulta:
                  </span>
                  <span className="text-sm text-neutral-600">
                    {pessoa.ultimaConsultaFormatada}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-neutral-800">
                    Visita Domiciliar:
                  </span>
                  <span className="text-sm text-neutral-600">
                    {pessoa.ultimaVisitaDomiciliarFormatada}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <span className="font-semibold text-neutral-800">Saúde:</span>
                  <span className="text-sm text-neutral-600">
                    {pessoa.deficiencia === '0' &&
                    pessoa.diabetes === '0' &&
                    pessoa.hipertensaoArterial === '0'
                      ? 'Sem problemas de saúde.'
                      : 'Com problemas de saúde.'}
                  </span>
                </div>
                {healthCondition && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-neutral-800">
                      Condição:
                    </span>
                    <span className="text-sm text-neutral-600">
                      {healthCondition}
                    </span>
                  </div>
                )}
                {vacinaPendente && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-neutral-800">
                      Vacina Pendente:
                    </span>
                    <span className="text-sm text-neutral-600">
                      {vacinaPendente}
                    </span>
                  </div>
                )}
                <div className="flex flex-col" style={{ visibility: 'hidden' }}>
                  <span className="font-semibold text-neutral-800">CPF:</span>
                  <span className="text-sm text-neutral-600">
                    {cpf || 'CPF não disponível'}
                  </span>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <p className="italic text-neutral-500">Nenhum resultado encontrado.</p>
      )}
    </div>
  )
}
