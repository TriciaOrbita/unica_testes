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
      <h2 className="rounded-t-lg border-b border-neutral-300 bg-green-600 p-2 pb-2 text-center text-2xl font-bold text-white">
        Dados de Saúde
      </h2>
      {uniqueData.length > 0 ? (
        uniqueData.map((pessoa: PessoaSaude) => {
          return (
            <div
              key={pessoa.coFatorCidadao}
              className="mb-4 grid grid-cols-1 gap-4 border bg-white p-4 shadow-sm sm:grid-cols-2"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-neutral-800">
                    Última Atualização:
                  </span>
                  <div className="break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                    {pessoa.ultimaAtualizacao}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-neutral-800">
                    Unidade:
                  </span>
                  <div className="break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                    {pessoa.unidadeSaude}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-neutral-800">
                    Consulta:
                  </span>
                  <div className="break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                    {pessoa.ultimaConsultaFormatada}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-neutral-800">
                    Saúde:
                  </span>
                  <div className="break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                    {pessoa.deficiencia === '0' &&
                    pessoa.diabetes === '0' &&
                    pessoa.hipertensaoArterial === '0'
                      ? 'Sem problemas de saúde.'
                      : 'Com problemas de saúde.'}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-neutral-800">
                    Visita Domiciliar:
                  </span>
                  <div className="break-words rounded-md border border-green-600 bg-white p-2 text-neutral-600">
                    {pessoa.ultimaVisitaDomiciliarFormatada}
                  </div>
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
