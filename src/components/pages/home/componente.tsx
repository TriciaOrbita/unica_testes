import React, { useState } from 'react';
import { PersonData } from './person-data'; // Ajuste o caminho se necessário
import SearchInput from './SearchInput'; // Ajuste o caminho se necessário

export function MainComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = () => {
    // Aqui você faria a chamada para buscar os dados baseado no searchTerm
    // Por exemplo, você pode usar uma função fetch ou uma chamada API para pegar os dados
    // setSearchResults(resultadoDaBusca);
  };

  const mapToPersonDataProps = (person) => ({
    name: person.nome || person.pessoaNome,
    cpf: person.cpf || person.pessoaCPF,
    birthDate: person.dataNascimento || person.dataNascimento,
    age: calculateAge(person.dataNascimento),
    address: `${person.logradouro || ''} ${person.numeroLogradouro || ''}`,
  });

  return (
    <div>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <button onClick={handleSearch}>Buscar</button>
      {searchResults && <PersonData {...mapToPersonDataProps(searchResults)} />}
    </div>
  );
}

function calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const ageDifMs = Date.now() - birth.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
