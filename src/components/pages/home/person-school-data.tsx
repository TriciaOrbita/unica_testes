import React from 'react';

interface PessoaEscola {
  cpf: string;
  nome: string;
  situacao: string;
  dataNascimento: string;
  idadeMeses: string;
  sexo: string;
  nomeEscola: string;
  turma: string;
  bolsaFamilia: string;
  pcd: string;
  filiacao1: string;
  filiacao2: string;
  dataAtt: string;
  localizacao: string;
  bairro: string;
  logradouro: string;
  numero: string;
}

interface PersonSchoolDataProps {
  pessoasEscola: PessoaEscola[]; // Expecting an array of PessoaEscola
  searchTerm: string; // Accept search term as a prop
}

export function PersonSchoolData({
  pessoasEscola,
  searchTerm,
}: PersonSchoolDataProps) {
  if (!pessoasEscola || pessoasEscola.length === 0) {
    return <p>Nenhum dado escolar disponível.</p>;
  }

  // Filter data based on the search term
  const filteredData = pessoasEscola.filter(
    (pessoa) =>
      pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pessoa.cpf.includes(searchTerm), // Also filter by CPF
  );

  return (
    <div className='w-full max-w-[90rem] mx-auto p-8 rounded-lg border border-neutral-300 bg-white shadow-lg min-w-[400px]'>
      <h2 className='text-xl font-semibold text-neutral-800 mb-4'>
        DADOS ESCOLARES
      </h2>
      {filteredData.length > 0 ? (
        filteredData.map((pessoa: PessoaEscola) => (
          <div
            key={pessoa.cpf}
            className='grid grid-cols-2 gap-6 mb-4 border-b border-neutral-200 pb-4'
          >
            <div className='flex flex-col'>
              <div className='mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm'>
                <p className='text-md font-medium text-neutral-800'>
                  Última Atualização:
                </p>
                <p className='text-md text-neutral-600'>
                  {pessoa.dataAtt || 'Data não disponível'}
                </p>
              </div>
              <div className='mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm'>
                <p className='text-md font-medium text-neutral-800'>
                  Nome da Escola:
                </p>
                <p className='text-md text-neutral-600'>
                  {pessoa.nomeEscola || 'Nome não disponível'}
                </p>
              </div>
              <div className='mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm'>
                <p className='text-md font-medium text-neutral-800'>Turma:</p>
                <p className='text-md text-neutral-600'>
                  {pessoa.turma || 'Turma não disponível'}
                </p>
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm'>
                <p className='text-md font-medium text-neutral-800'>
                  Situação:
                </p>
                <p className='text-md text-neutral-600'>
                  {pessoa.situacao || 'Situação não disponível'}
                </p>
              </div>
              <div className='mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm'>
                <p className='text-md font-medium text-neutral-800'>PCD:</p>
                <p className='text-md text-neutral-600'>
                  {pessoa.pcd || 'Não disponível'}
                </p>
              </div>
              <div className='mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm'>
                <p className='text-md font-medium text-neutral-800'>
                  Filiação 1:
                </p>
                <p className='text-md text-neutral-600'>
                  {pessoa.filiacao1 || 'Não disponível'}
                </p>
              </div>
              <div className='mb-2 p-4 border border-neutral-300 rounded-lg shadow-sm'>
                <p className='text-md font-medium text-neutral-800'>
                  Filiação 2:
                </p>
                <p className='text-md text-neutral-600'>
                  {pessoa.filiacao2 || 'Não disponível'}
                </p>
              </div>
              <div className='flex justify-between items-center'>
                <p className='text-xs' style={{ visibility: 'hidden' }}>
                  {pessoa.cpf}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhum resultado encontrado.</p> // Message if no results match
      )}
    </div>
  );
}
