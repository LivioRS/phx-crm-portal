import { NextRequest, NextResponse } from 'next/server';

const SHEETS_URLS: Record<string, string> = {
  vendas: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTwn5q3wBBHytHoYtlLUAq8A0MpoAnOV1Q4pgyP4j9WqaSWUg-KuUA7JW9scmvgc4jpUz-dtEJqTiBH/pub?gid=239981466&single=true&output=csv',
  clientes: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTwn5q3wBBHytHoYtlLUAq8A0MpoAnOV1Q4pgyP4j9WqaSWUg-KuUA7JW9scmvgc4jpUz-dtEJqTiBH/pub?gid=0&single=true&output=csv',
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sheet = searchParams.get('sheet');

  if (!sheet || !SHEETS_URLS[sheet]) {
    return NextResponse.json({ error: 'Parametro sheet invalido. Use: vendas ou clientes' }, { status: 400 });
  }

  try {
    const response = await fetch(SHEETS_URLS[sheet], {
      headers: { 'Accept': 'text/csv' },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Google Sheets respondeu com status: ${response.status}`);
    }

    const csvData = await response.text();
    return new NextResponse(csvData, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: `Erro no proxy de planilhas: ${message}` }, { status: 500 });
  }
}
