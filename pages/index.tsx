// pages/index.tsx
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface PersonData {
  ' p.nom_pessoa': string;
  ' p.num_cpf_pessoa': string; 
}

export default function Home() {
  const [personData, setPersonData] = useState<PersonData[]>([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const MAX_RESULTS = 20; 

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch('/dados.csv'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const text = await response.text();
        console.log("CSV Data:", text); 

        Papa.parse(text, {
          header: true,
          delimiter: ';',
          complete: (results) => {
            console.log("Parsed Results:", results.data); 
            setPersonData(results.data as PersonData[]);
            setLoading(false); 
          },
        });
      } catch (error) {
        console.error('Erro ao buscar o arquivo CSV:', error);
        setLoading(false); 
      }
    };

    fetchCSVData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = searchTerm
    ? personData.filter((data) => {
        const cpf = (data[' p.num_cpf_pessoa'] || '').trim();
        const name = (data[' p.nom_pessoa'] || '').trim();
        return (
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cpf.includes(searchTerm)
        );
      })
    : personData;

  console.log("Filtered Data:", filteredData); 
  console.log("Data Before Filtering:", personData);
  console.log("Search Term:", searchTerm);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Head>
        <title>Perfil CADUNICO</title>
      </Head>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Pesquisar por CPF ou Nome"
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded-lg p-2 w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-center w-full">Carregando dados...</p> 
        ) : filteredData.length > 0 ? (
          filteredData.slice(0, MAX_RESULTS).map((person, index) => (
            <aside key={index} className="bg-white shadow-md p-6 rounded-lg">
              <div className="text-center">
                <h2 className="mt-4 text-xl font-semibold" onClick={() => toggleExpand(index)} style={{ cursor: 'pointer' }}>
                  {person[' p.nom_pessoa']}
                </h2>
                <p className="text-gray-500">CPF: {person[' p.num_cpf_pessoa']}</p>
                {expandedIndex === index && (
                  <div className="mt-4">
                    <pre>{JSON.stringify(person, null, 2)}</pre>
                  </div>
                )}
              </div>
            </aside>
          ))
        ) : (
          <p className="text-center w-full">Nenhum dado encontrado.</p>
        )}
      </div>
    </div>
  );
}
