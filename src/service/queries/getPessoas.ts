import { useQuery } from "@tanstack/react-query"

async function fetchPessoas() {
  try {
    const response = await fetch(
      "https://my-json-server.typicode.com/OrbitaTech/api-fake/pessoas"
    )

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Erro ao buscar dados:", error)
    return null
  }
}

export function usePessoas() {
  return useQuery({
    queryKey: ["pessoas"],
    queryFn: async () => {
      const result = await fetchPessoas()
      return result
    }
  })
}
