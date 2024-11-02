import React from 'react';

type Person = {
  nome: string;
  cpf: string;
  nomeCidadao?: string; // Propriedade opcional
  coFatorCidadao?: string; // Propriedade opcional
  // adicione outras propriedades conforme necessário
};

type SearchPersonProps = {
  onSearch: (term: string) => void;
  filteredResults: Person[];
  onSelect: (pessoa: Person) => void; // Tipo atualizado
};

export const SearchPerson: React.FC<SearchPersonProps> = ({
  onSearch,
  filteredResults,
  onSelect,
}) => {
  return (
    <div>
      <input
        type='text'
        placeholder='Buscar pessoa...'
        onChange={(e) => onSearch(e.target.value)}
      />
      <ul>
        {filteredResults.map((pessoa, index) => (
          <li key={index} onClick={() => onSelect(pessoa)}>
            {pessoa.nome}
          </li> // Chamando onSelect aqui
        ))}
      </ul>
    </div>
  );
};
