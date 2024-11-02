import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';

// Definindo a interface para as props do componente
interface SearchPersonProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchPerson: React.FC<SearchPersonProps> = ({ searchTerm, setSearchTerm }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Atualiza o termo de busca
  };

  return (
    <div className="pb-4 flex gap-2 items-center border-b border-neutral-300">
      <div className="relative rounded-md shadow-sm flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="h-5 w-5 text-neutral-500"
          />
        </div>
        <input
          id="search"
          name="search"
          type="search"
          value={searchTerm} // Ligando o valor do input ao searchTerm
          onChange={handleInputChange} // Chamando a função ao mudar
          placeholder="Pesquisar por nome ou CPF"
          className="block w-full rounded-md border-0 py-2.5 pl-10 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-base"
        />
      </div>
    </div>
  );
};

export default SearchPerson;
