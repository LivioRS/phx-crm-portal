'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Search,
  User,
  ShieldCheck,
  Calendar,
  LogOut
} from 'lucide-react';

export function Header() {
  const pathname = usePathname();

  if (pathname === '/login') return null;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Analise de Desempenho do Representante
              </h1>
              <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                <ShieldCheck size={12} />
                Dados Seguros: Visualizacao Personalizada
              </div>
            </div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-0.5">
              Painel Comparativo de Desempenho Anual (YoY)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
            <Calendar size={14} className="text-slate-400" />
            <select className="bg-transparent border-none text-sm font-semibold text-slate-600 focus:outline-none">
              <option>Ultimos 12 Meses (YoY)</option>
              <option>Ano Fiscal Atual</option>
              <option>Ano Fiscal Anterior</option>
            </select>
          </div>

          <div className="h-8 w-px bg-slate-200"></div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-900">Ricardo Almeida</p>
              <p className="text-[10px] font-semibold text-blue-600 bg-blue-50 rounded px-1">
                Regiao: SP-Interior
              </p>
            </div>
            </p>
          </div>
          <div className="group relative">
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
              <User size={20} className="text-slate-400" />
            </div>
          </div>
          <button className="flex items-center gap-1.5 text-slate-400 hover:text-red-500 transition-colors">
            <LogOut size={18} />
            <span className="text-xs font-bold uppercase">Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
}
