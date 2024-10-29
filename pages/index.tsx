import Head from 'next/head';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';

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

interface SchoolData {
  ID_INEP: string;
  CPF: string;
  'ALUNO(A)': string;
  SITUAÇÃO: string;
  'DATA DE NASC.': string;
  'IDADE / MÊS': string;
  SEXO: string;
  CURSO: string;
  ETAPA: string;
  'SUB ETAPA (MULTISSERIADO)': string;
  TURNO: string;
  TURMA: string;
  'NOME DA TURMA': string;
  'BOLSA FAMÍLIA': string;
  NNE: string;
  PcD: string;
  'Tipo da Deficiência': string;
  'NOME DO PROFISSIONAL AE / PA': string;
  'TIPO TRANSPORTE': string;
  Rodoviário: string;
  Aquaviário: string;
  Capacidade: string;
  'FILIAÇÃO 1': string;
  'FILIAÇÃO 2': string;
  TIPO: string;
  'DATA MATRICULA': string;
  'DATA SITUAÇÃO': string;
  'ENVIAR CENSO': string;
  LOCALIZAÇÃO: string;
  BAIRRO: string;
  LOGRADOURO: string;
  NUMERO: string;
  COMPLEMENTO: string;
  'COR/RAÇA': string;
  TELEFONE: string;
  OBSERVAÇÃO: string;
  'MATRÍCULA NOVA?': string;
  'NOME ESCOLA': string;
  'ETAPA GERAL': string;
}

// Function to calculate age
const calculateAge = (birthdate: string): number => {
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
  const [schoolData, setSchoolData] = useState<SchoolData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const MAX_RESULTS = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [personResponse, schoolResponse] = await Promise.all([
          fetch('/dados.csv'),
          fetch('/dados_escolares.csv')
        ]);

        if (!personResponse.ok || !schoolResponse.ok) throw new Error('Failed to fetch CSV files');

        const [personText, schoolText] = await Promise.all([
          personResponse.text(),
          schoolResponse.text()
        ]);

        Papa.parse(personText, {
          header: true,
          delimiter: ';',
          complete: (results) => setPersonData(results.data as PersonData[]),
        });

        Papa.parse(schoolText, {
          header: true,
          complete: (results) => setSchoolData(results.data as SchoolData[]),
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

  const getSchoolInfo = (personName: string) => {
    return schoolData.find(
      (school) => 
        school['FILIAÇÃO 1'] === personName || school['FILIAÇÃO 2'] === personName
    );
  };

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
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <p className="text-center w-full">Carregando dados...</p>
        ) : filteredData.length > 0 ? (
          filteredData.slice(0, MAX_RESULTS).map((person, index) => {
            const schoolInfo = getSchoolInfo(person[' p.nom_pessoa'] || '');
            return (
              <aside key={index} className="bg-white shadow-md p-6 rounded-lg">
                <div className="text-center">
                  <h2
                    className="mt-4 text-xl font-semibold"
                    onClick={() => toggleExpand(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    {person[' p.nom_pessoa']}
                  </h2>
                  <p className="text-gray-500">CPF: {person[' p.num_cpf_pessoa']}</p>
                  {expandedIndex === index && (
                    <div className="mt-4">
                      <p>Última atualização de cadastro em: {person[' d.dat_atual_fam']}</p>
                      <p>Condição de Saúde: {person['p.condicao_saude']}</p>
                      <p>Data de Nascimento: {person[' p.dta_nasc_pessoa']}</p>
                      <p>Idade: {calculateAge(person[' p.dta_nasc_pessoa'])} anos</p>
                      <p>NIS: {person[' p.num_nis_pessoa_atual']}</p>
                      <p>CNS: {person['p.cns']}</p>
                      <p>Nome da Mãe: {person[' p.nom_completo_mae_pessoa']}</p>
                      <p>Nome do Pai: {person[' p.nom_completo_pai_pessoa']}</p>
                      <p>Município de Nascimento: {person[' p.sig_uf_munic_nasc_pessoa']} - {person[' p.nom_ibge_munic_nasc_pessoa']}</p>
                      <p>Sexo: {person[' p.cod_sexo_pessoa'] === '1' ? 'Masculino' : 'Feminino'}</p>
                      <p>Endereço: {person['p.endereco']}</p>
                      <p>Situação de Rua: {person[' p.marc_sit_rua'] === '0' ? 'Não está em situação de rua' : 'Está em situação de rua'}</p>
                      {schoolInfo && (
                        <div className="mt-4">
                          <p><strong>Informações Escolares Familiares:</strong></p>
                          <p>Aluno: {schoolInfo['ALUNO(A)']}</p>
                          <p>Situação: {schoolInfo.SITUAÇÃO}</p>
                          <p>Curso: {schoolInfo.CURSO}</p>
                          <p>Etapa: {schoolInfo.ETAPA}</p>
                          <p>Turno: {schoolInfo.TURNO}</p>
                          <p>Turma: {schoolInfo.TURMA}</p>
                          <p>Nome da Escola: {schoolInfo['NOME ESCOLA']}</p>
                          {/* Add other school information fields as needed */}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </aside>
            );
          })
        ) : (
          <p className="text-center w-full">Nenhum dado encontrado.</p>
        )}
      </div>
    </div>
  );
}
