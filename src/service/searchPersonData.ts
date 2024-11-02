// services/useSearchPerson.ts
import { usePessoas } from "./queries/getPessoas"
import { usePessoasEscola } from "./queries/getPessoasEscola"
import { usePessoasSaude } from "./queries/getPessoasSaude"

interface PersonData {
  name: string
  cpf: string
  birthDate: string
  age: number
  address: string
}

// Definindo uma interface para as pessoas nos dados
interface Pessoa {
  name: string
  cpf: string
  birthDate?: string // Pode não estar presente em todas as fontes
  age?: number // Pode não estar presente em todas as fontes
  address?: string // Pode não estar presente em todas as fontes
  local?: string // Para pessoas da escola
  rua?: string // Para pessoas da escola
  numeroLogradouro?: string // Para pessoas da escola
  bairroDomicilio?: string // Para pessoas da saúde
  logradouro?: string // Para pessoas da saúde
}

export const useSearchPerson = (searchTerm: string) => {
  const { data: pessoas = [] } = usePessoas()
  const { data: pessoasEscola = [] } = usePessoasEscola()
  const { data: pessoasSaude = [] } = usePessoasSaude()

  const personFromPessoas = pessoas.find(
    (p: Pessoa) => p.name.includes(searchTerm) || p.cpf === searchTerm
  )
  const personFromEscola = pessoasEscola.find(
    (p: Pessoa) => p.name.includes(searchTerm) || p.cpf === searchTerm
  )
  const personFromSaude = pessoasSaude.find(
    (p: Pessoa) => p.name.includes(searchTerm) || p.cpf === searchTerm
  )

  // Combinação dos dados, priorizando o dado disponível
  const personData: PersonData | null = {
    name:
      personFromPessoas?.name ||
      personFromEscola?.name ||
      personFromSaude?.name ||
      "",
    cpf:
      personFromPessoas?.cpf ||
      personFromEscola?.cpf ||
      personFromSaude?.cpf ||
      "",
    birthDate:
      personFromPessoas?.birthDate ||
      personFromEscola?.birthDate ||
      personFromSaude?.birthDate ||
      "",
    age:
      personFromPessoas?.age ||
      personFromEscola?.age ||
      personFromSaude?.age ||
      0,
    address:
      personFromPessoas?.address ||
      (personFromEscola
        ? `${personFromEscola.local}, ${personFromEscola.rua} ${personFromEscola.numeroLogradouro}`
        : "") ||
      (personFromSaude
        ? `${personFromSaude.bairroDomicilio}, ${personFromSaude.logradouro}`
        : "")
  }

  // Se não encontrou dados relevantes, retorna null
  return personData.name ? personData : null
}
