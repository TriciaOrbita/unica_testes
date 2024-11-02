import { useQuery } from "@tanstack/react-query";

async function fetchPessoasSaude() {
  try {
    const response = await fetch(
      "https://my-json-server.typicode.com/OrbitaTech/api-fake/pessoasSaude",
    );

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return null;
  }
}

export function usePessoasSaude() {
  return useQuery({
    queryKey: ["saude"],
    queryFn: async () => {
      const result = await fetchPessoasSaude();
      return result;
    },
  });
}
