import { useQuery } from '@tanstack/react-query'

async function fetchPessoasEscolas() {
  try {
    const response = await fetch(
      'https://my-json-server.typicode.com/OrbitaTech/api-fake/pessoasEscolas',
    )

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
    return null
  }
}

export function usePessoasEscola() {
  return useQuery({
    queryKey: ['escola'],
    queryFn: async () => {
      const result = await fetchPessoasEscolas()
      return result
    },
  })
}
