import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

const prisma = new PrismaClient();

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '10mb', // Ajuste o tamanho conforme necessário
      },
    },
  };

interface DataItem {
  [key: string]: string | number | null | boolean; // Ajuste conforme os tipos reais dos dados
}

const MAX_RECORDS = 1000; // Define um limite máximo de registros a retornar

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("Iniciando carregamento do CSV e conexão com o banco...");

    // Verificar conexão com o banco
    await prisma.$connect();
    console.log("Conexão com o banco estabelecida.");

    const filePath = path.resolve('./public', 'dados.csv');
    if (!fs.existsSync(filePath)) {
      throw new Error(`Arquivo CSV não encontrado em ${filePath}`);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    console.log("Arquivo CSV carregado com sucesso.");

    // Parse do arquivo CSV e retorno como promessa
    const csvData = await new Promise<DataItem[]>((resolve, reject) => {
      Papa.parse(fileContent, {
        header: true,
        delimiter: ';', // Certifique-se de que esse é o delimitador correto
        complete: (results) => {
          resolve(results.data as DataItem[]);
        },
        error: (error: Error) => {
          reject(new Error(`Erro ao parsear CSV: ${error.message}`));
        },
      });
    });

    const dbData = await prisma.tb_fat_cidadao_pec.findMany();
    console.log("Dados do banco carregados com sucesso.");
    console.log('Número de registros do banco:', dbData.length);
    console.log('Tamanho dos dados do CSV:', csvData.length);

    // Verificar validade dos dados
    const checkDataValidity = (data: DataItem[]) => {
      return data.every(item => {
        return Object.entries(item).every(([key, value]) => {
          if (typeof value === 'string' && value.length > 1000) {
            console.warn(`Campo ${key} tem comprimento excessivo: ${value.length}`);
            return false;
          }
          return true;
        });
      });
    };

    // Verifique todos os dados
    if (!checkDataValidity(csvData) || !checkDataValidity(dbData)) {
      throw new Error('Dados inválidos encontrados.');
    }

    // Combina dados
    const combinedData = [...csvData, ...dbData];

    // Limitar o número de registros a retornar
    const limitedData = combinedData.slice(0, MAX_RECORDS);
    
    // Verificar se o tamanho total é aceitável
    const combinedDataSize = JSON.stringify(limitedData).length;
    if (combinedDataSize > 50e6) { // Ajuste para 5MB, por exemplo
        throw new Error('O tamanho dos dados combinados é muito grande.');
      }
      

    res.status(200).json({ combinedData: limitedData }); // Resposta com dados limitados

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro na API:', error.message);
      console.error('Stack Trace:', error.stack); // Adiciona o stack trace para mais informações
    } else {
      console.error('Erro na API:', error);
    }
    res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
  } finally {
    await prisma.$disconnect();
  }
}
