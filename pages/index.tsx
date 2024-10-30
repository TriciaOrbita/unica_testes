import Head from 'next/head';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
// import Tags from '../components/Tags';

interface PersonData {
  ' p.nom_pessoa': string;
  ' p.num_cpf_pessoa': string;
  'p.condicao_saude': string;
  'p.data_nascimento': string;
  ' p.dta_nasc_pessoa': string;
  ' p.num_nis_pessoa_atual': string;
  'p.cns': string;
  ' p.nom_completo_mae_pessoa': string;
  ' p.nom_completo_pai_pessoa': string;
  ' p.sig_uf_munic_nasc_pessoa': string;
  ' p.nom_ibge_munic_nasc_pessoa': string;
  'p.nacionalidade': string;
  ' p.cod_sexo_pessoa': string;
  'p.endereco': string;
  ' p.marc_sit_rua': string;
  ' d.dat_atual_fam': string;
}

const calculateAge = (birthdate: string): number => {
  if (!birthdate) return 0;
  const [day, month, year] = birthdate.split('/').map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export default function Home() {
  const [personData, setPersonData] = useState<PersonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<PersonData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/dados.csv');
        if (!response.ok) throw new Error('Failed to fetch CSV file');
        
        const text = await response.text();
        Papa.parse(text, {
          header: true,
          delimiter: ';',
          complete: (results) => setPersonData(results.data as PersonData[]),
        });

        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchTerm(input);
    setShowSuggestions(input.length > 0); // Mostra sugestões apenas se houver texto digitado
  };

  const filteredData = searchTerm
    ? personData.filter((data) => {
        const cpf = (data[' p.num_cpf_pessoa'] || '').trim();
        const name = (data[' p.nom_pessoa'] || '').trim();
        return (
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cpf.includes(searchTerm)
        );
      }).slice(0, 5) // Limita a lista a no máximo 5 itens
    : [];

  const defaultData = {
    ' p.nom_pessoa': '-',
    ' p.num_cpf_pessoa': '-',
    'p.condicao_saude': '-',
    'p.data_nascimento': '-',
    ' p.dta_nasc_pessoa': '-',
    ' p.num_nis_pessoa_atual': '-',
    'p.cns': '-',
    ' p.nom_completo_mae_pessoa': '-',
    ' p.nom_completo_pai_pessoa': '-',
    ' p.sig_uf_munic_nasc_pessoa': '-',
    ' p.nom_ibge_munic_nasc_pessoa': '-',
    'p.nacionalidade': '-',
    ' p.cod_sexo_pessoa': '-',
    'p.endereco': '-',
    ' p.marc_sit_rua': '-',
    ' d.dat_atual_fam': '-',
  };

  const displayPerson = selectedPerson || defaultData;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Head>
        <title>Perfil CADUNICO</title>
      </Head>

      <aside className="bg-gray-100 p-4 w-1/3 h-screen overflow-y-auto">
        <div>
          <div className="flex items-center mb-6 mt-6 ml-4">
            <div className="w-24 h-24 bg-gray-300 rounded-full mr-6" />
            <div>
              <h2 className="text-2xl font-bold ml-2">{displayPerson[' p.nom_pessoa']}</h2>
              <p className="text-lg ml-2">Última atualização em {displayPerson[' d.dat_atual_fam']}</p>
            </div>
          </div>
          <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            {[
              { label: "Condição de Saúde", value: displayPerson['p.condicao_saude'] },
              { label: "CPF", value: displayPerson[' p.num_cpf_pessoa'] },
              { label: "Data de Nascimento", value: displayPerson[' p.dta_nasc_pessoa'] },
              { label: "Idade", value: displayPerson[' p.dta_nasc_pessoa'] ? `${calculateAge(displayPerson[' p.dta_nasc_pessoa'])} anos` : '-' },
              { label: "CadÚnico", value: displayPerson[' p.num_nis_pessoa_atual'] },
              { label: "CNS", value: displayPerson['p.cns'] },
              { label: "Nome da Mãe", value: displayPerson[' p.nom_completo_mae_pessoa'] },
              { label: "Nome do Pai", value: displayPerson[' p.nom_completo_pai_pessoa'] },
              { label: "Município de Nascimento", value: `${displayPerson[' p.nom_ibge_munic_nasc_pessoa']} - ${displayPerson[' p.sig_uf_munic_nasc_pessoa']}` },
              { label: "Nacionalidade", value: displayPerson['p.nacionalidade'] },
              { label: "Sexo", value: displayPerson[' p.cod_sexo_pessoa'] === '1' ? 'Masculino' : displayPerson[' p.cod_sexo_pessoa'] === '2' ? 'Feminino' : '-' },
              { label: "Endereço", value: displayPerson['p.endereco'] },
              { label: "Situação de Rua", value: displayPerson[' p.marc_sit_rua'] === '0' ? 'Não está em situação de rua' : displayPerson[' p.marc_sit_rua'] === '1' ? 'Está em situação de rua' : '-' }
            ].map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <p className="font-semibold">{item.label}:</p>
                  <p>{item.value}</p>
                </div>
                <hr className="border-gray-300 mt-2" />
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className="flex-1 p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Pesquisar por CPF ou Nome"
            value={searchTerm}
            onChange={handleSearch}
            onFocus={() => setShowSuggestions(searchTerm.length > 0)}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        {showSuggestions && (
          <div className="grid grid-cols-1 gap-4">
            {loading ? (
              <p className="text-center w-full">Carregando dados...</p>
            ) : filteredData.length > 0 ? (
              filteredData.map((person, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md p-4 rounded-lg cursor-pointer"
                  onClick={() => {
                    setSelectedPerson(person);
                    setShowSuggestions(false); // Fecha as sugestões ao selecionar uma pessoa
                    setSearchTerm(''); // Limpa o campo de busca após seleção
                  }}
                >
                  <h2 className="text-xl font-semibold">{person[' p.nom_pessoa']}</h2>
                  <p className="text-gray-500">CPF: {person[' p.num_cpf_pessoa']}</p>
                </div>
              ))
            ) : (
              <p className="text-center w-full">Nenhum dado encontrado.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
