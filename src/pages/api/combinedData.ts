import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import Papa from 'papaparse'

// Configuração para o tamanho do corpo da requisição
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '15mb', // Ajuste o tamanho conforme necessário
    },
  },
}

// Interfaces de tipos
interface DataItem {
  [key: string]: string | number | boolean | null // Define um tipo genérico para os itens dos dados CSV
}

interface PessoaEscola {
  cpf: string
  nome: string
  situacao: boolean
  dataNascimento: string
  avatar: string // setar com ''
  idadeMeses: number
  sexo: string
  nomeEscola: string
  curso: string
  etapa: string
  turno: string
  turma: string
  bolsaFamilia: string
  pcd: string
  tipoDeficiencia: string
  filiacao1: string
  filiacao2: string
  dataAtt: string
  localizacao: string
  bairro: string
  logradouro: string
  numero: string
  corRaca: string
  telefone: string
}

interface Pessoa {
  local: string
  tipoLogradouro: string
  tituloLogradouro: string
  nomeLogradouro: string
  avatar: string // setar com ''
  numeroLogradouro: string
  mesesDesatualizacaoCadastro: number
  estabelecimentoSaude: string
  centroAssistencia: string
  dddContato: string
  telefoneContatoFam: string
  pessoaNome: string
  pessoaCPF: string
  pessoaNIS: string
  sexo: string
  dataNascimento: string
  nomeMae: string
  nomePai: string
  ufNascimento: string
  municipioNascimento: string
  identidadePessoa: string
  tipoDeficiencia: string
  situacaoRua: boolean
}

interface PessoaSaude {
  coFatorCidadao: number
  nomeCidadao: string
  ultimaAtualizacao: string
  unidadeSaude: string
  tipoLogradouro: string | null
  avatar: string // setar com ''
  logradouro: string | null
  bairroDomicilio: string
  numeroDomicilio: string
  ultimaConsulta: string | null
  hipertensaoArterial: boolean
  diabetes: boolean
  gestante: boolean
  deficiencia: boolean
  ultimaConsultaFormatada: string | null
  ultimaVisitaDomiciliarFormatada: string
  rn: number
}

const MAX_RECORDS = 1000 // Define um limite máximo de registros a retornar

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    console.log('Iniciando carregamento dos arquivos CSV...')

    // Função para ler e analisar arquivos CSV
    const parseCSVFile = async (fileName: string) => {
      const filePath = path.resolve('./public', fileName)
      if (!fs.existsSync(filePath)) {
        throw new Error(`Arquivo CSV não encontrado em ${filePath}`)
      }

      const fileContent = fs.readFileSync(filePath, 'utf8')
      console.log(`Arquivo ${fileName} carregado com sucesso.`)

      return new Promise<DataItem[]>((resolve, reject) => {
        Papa.parse(fileContent, {
          header: true,
          delimiter: ';', // Certifique-se de que esse é o delimitador correto
          complete: (results) => {
            resolve(results.data as DataItem[])
          },
          error: (error: Error) => {
            reject(new Error(`Erro ao parsear CSV: ${error.message}`))
          },
        })
      })
    }

    // Ler os dados das planilhas
    const csvData = await parseCSVFile('dados.csv')
    const dadosEscolares = await parseCSVFile('dados_escolares.csv')
    const dadosSaude = await parseCSVFile('dados_saude.csv')

    console.log('Tamanho dos dados do CSV:', csvData.length)
    console.log('Tamanho dos dados escolares:', dadosEscolares.length)
    console.log('Tamanho dos dados de saúde:', dadosSaude.length)

    // Funções de mapeamento
    const mapToPessoaEscola = (item: DataItem): PessoaEscola => ({
      cpf: item.CPF as string,
      nome: item['ALUNO(A)'] as string,
      situacao: item['SITUAÇÃO'] === '1',
      dataNascimento: item['DATA DE NASC.'] as string,
      avatar: '',
      idadeMeses: Number(item['IDADE / MÊS']),
      sexo: item.SEXO as string,
      nomeEscola: item['NOME ESCOLA'] as string,
      curso: item.CURSO as string,
      etapa: item.ETAPA as string,
      turno: item.TURNO as string,
      turma: item.TURMA as string,
      bolsaFamilia: item['BOLSA FAMÍLIA'] as string,
      pcd: item.PcD as string,
      tipoDeficiencia: item['Tipo da Deficiência'] as string,
      filiacao1: item['FILIAÇÃO 1'] as string,
      filiacao2: item['FILIAÇÃO 2'] as string,
      dataAtt: item['DATA SITUAÇÃO'] as string,
      localizacao: item['LOCALIZAÇÃO'] as string,
      bairro: item.BAIRRO as string,
      logradouro: item.LOGRADOURO as string,
      numero: item.NUMERO as string,
      corRaca: item['COR/RAÇA'] as string,
      telefone: item['TELEFONE  DDD + NUMERO (91) 9 9999-9999'] as string,
    })

    const mapToPessoa = (item: DataItem): Pessoa => ({
      local: item.nom_localidade_fam as string,
      tipoLogradouro: item.nom_tip_logradouro_fam as string,
      tituloLogradouro: item.nom_titulo_logradouro_fam as string,
      nomeLogradouro: item.nom_logradouro_fam as string,
      avatar: '',
      numeroLogradouro: item.num_logradouro_fam as string,
      mesesDesatualizacaoCadastro: item.qtde_meses_desat_cat as number,
      estabelecimentoSaude: item.nom_estab_assist_saude_fam as string,
      centroAssistencia: item.nom_centro_assist_fam as string,
      dddContato: item.num_ddd_contato_1_fam as string,
      telefoneContatoFam: item.num_tel_contato_1_fam as string,
      pessoaNome: item.nom_pessoa as string,
      pessoaCPF: item.num_cpf_pessoa as string,
      pessoaNIS: item.num_nis_pessoa_atual as string,
      sexo: item.cod_sexo_pessoa as string,
      dataNascimento: item.dta_nasc_pessoa as string,
      nomeMae: item.nom_completo_mae_pessoa as string,
      nomePai: item.nom_completo_pai_pessoa as string,
      ufNascimento: item.sig_uf_munic_nasc_pessoa as string,
      municipioNascimento: item.nom_ibge_munic_nasc_pessoa as string,
      identidadePessoa: item.num_identidade_pessoa as string,
      tipoDeficiencia: item.cod_deficiencia_memb as string,
      situacaoRua: item.marc_sit_rua === '1',
    })

    const mapToPessoaSaude = (item: DataItem): PessoaSaude => ({
      coFatorCidadao: item.co_fat_cidadao_pec as number,
      nomeCidadao: item.cidadao as string,
      ultimaAtualizacao: item.ultima_atualizacacao as string,
      unidadeSaude: item.no_unidade_saude as string,
      tipoLogradouro: item.no_tipo_logradouro_tb_cidadao as string | null,
      avatar: '',
      logradouro: item.ds_logradouro_tb_cidadao as string | null,
      bairroDomicilio: item.no_bairro_domicilio as string,
      numeroDomicilio: item.nu_numero_domicilio as string,
      ultimaConsulta: item.ultima_consulta as string | null,
      hipertensaoArterial: item.st_hipertensao === '1',
      diabetes: item.st_diabetes === '1',
      gestante: item.st_gestante === '1',
      deficiencia: item.st_deficiencia === '1',
      ultimaConsultaFormatada: item.ultima_consulta_formatada as string | null,
      ultimaVisitaDomiciliarFormatada:
        item.ultima_visita_domiciliar_formatada as string,
      rn: Number(item.rn),
    })

    // Mapeamento dos dados
    const limitedData = {
      pessoasEscola: csvData.slice(0, MAX_RECORDS).map(mapToPessoaEscola),
      pessoasCadastradas: dadosEscolares.slice(0, MAX_RECORDS).map(mapToPessoa),
      pessoasSaude: dadosSaude.slice(0, MAX_RECORDS).map(mapToPessoaSaude),
    }

    // Verifica se a quantidade de dados é menor que 1
    if (
      limitedData.pessoasEscola.length < 1 &&
      limitedData.pessoasCadastradas.length < 1 &&
      limitedData.pessoasSaude.length < 1
    ) {
      return res.status(404).json({ message: 'Nenhum dado encontrado.' })
    }

    // Retornar os dados combinados
    return res.status(200).json(limitedData)
  } catch (error: unknown) {
    // Tratar o erro como unknown
    console.error('Erro ao processar a requisição:', error)
    return res.status(500).json({
      message: 'Erro interno do servidor.',
      error: (error as Error).message,
    })
  }
}
