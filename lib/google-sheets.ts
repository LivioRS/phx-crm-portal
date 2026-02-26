import { parse } from 'papaparse';

// URLs que apontam para o nosso proxy server-side (Next.js API Route)
// Isso resolve problemas de CORS no ambiente de preview do AI Studio
export const PUBLIC_SHEET_URL = '/api/sheets?sheet=vendas';
export const CLIENTS_SHEET_URL = '/api/sheets?sheet=clientes';

/**
 * Utility to fetch data from a Google Sheet via our local API proxy.
 * @param url Full URL to the local API endpoint
 * @param ignorePrefix Prefix for columns that should be ignored
 */
export async function fetchSheetData<T = any>(
  url: string = PUBLIC_SHEET_URL,
  ignorePrefix: string = 'X_'
): Promise<T[] | null> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'text/csv',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();

    if (!csvText || csvText.includes('<!DOCTYPE html>')) {
      throw new Error('A resposta nao parece ser um CSV valido.');
    }

    return new Promise((resolve, reject) => {
      parse<T>(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => {
          // Se o cabecalho comecar com o prefixo de ignorar, retornamos vazio
          if (header.startsWith(ignorePrefix)) return '';
          return header;
        },
        complete: (results) => {
          // Filtra as colunas que foram marcadas como vazias (as "vermelho")
          const filteredData = results.data.map((row: any) => {
            const newRow: any = {};
            Object.keys(row).forEach((key) => {
              if (key !== '' && key !== 'undefined' && key !== 'null') {
                newRow[key] = row[key];
              }
            });
            return newRow;
          });
          resolve(filteredData as T[]);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  } catch (error: any) {
    console.error('Erro na integracao com Google Sheets:', error);
    return null;
  }
}
