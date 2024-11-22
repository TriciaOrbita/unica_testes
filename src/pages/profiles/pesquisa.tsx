interface SearchInputProps {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  onSearch: (searchTerm: string) => void // Passando o valor diretamente
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  setSearchTerm,
  onSearch,
}) => {
  // Função de controle da mudança no campo de input e chamada da pesquisa
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value
    setSearchTerm(newSearchTerm) // Atualiza o estado do termo de pesquisa
    onSearch(newSearchTerm) // Executa a lógica de pesquisa
  }
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      className="rounded border border-gray-300 p-2"
      placeholder="Digite o CPF"
    />
  )
}
export default SearchInput
