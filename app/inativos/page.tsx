'use client';

import * as React from 'react';
import { 
  TimerOff, 
  AlertCircle, 
  History, 
  Mail, 
  Phone, 
  Calendar, 
  ArrowRight,
  Filter,
  Download,
  Search,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const inactiveClients = [
  { id: 1, name: 'TechSolutions Group', cnpj: '04.122.948/0001-90', days: 172, lastValue: 'R$ 12.400,00', risk: 'Crítico', reason: 'Preço Concorrente' },
  { id: 2, name: 'Nova Varejo S.A.', cnpj: '12.553.111/0001-22', days: 98, lastValue: 'R$ 45.900,00', risk: 'Médio', reason: 'Mudança de Gestão' },
  { id: 3, name: 'Logística Express', cnpj: '11.222.333/0001-44', days: 155, lastValue: 'R$ 8.200,00', risk: 'Crítico', reason: 'Falta de Estoque' },
  { id: 4, name: 'Metalúrgica Central', cnpj: '99.888.777/0001-66', days: 112, lastValue: 'R$ 15.600,00', risk: 'Médio', reason: 'Sazonalidade' },
  { id: 5, name: 'Distribuidora Norte', cnpj: '22.333.444/0001-55', days: 140, lastValue: 'R$ 22.100,00', risk: 'Crítico', reason: 'Inadimplência' },
  { id: 6, name: 'Comércio Sul Ltda', cnpj: '44.555.666/0001-77', days: 125, lastValue: 'R$ 31.400,00', risk: 'Médio', reason: 'Logística' },
];

export default function InativosPage() {
  return (
    <div className="max-w-[1400px] w-full mx-auto px-6 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Monitoramento de Inativos</h1>
          <p className="text-sm text-slate-500">Gestão de clientes em dormência e estratégias de recuperação</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">
            <Download size={18} />
            Relatório de Perdas
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold hover:bg-rose-700 shadow-lg shadow-rose-600/20">
            <Mail size={18} />
            Campanha de Reativação
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Inativos" value="42" change="+3" trend="up" color="rose" />
        <StatCard title="Ticket Médio Perdido" value="R$ 18.450,00" change="-5.2%" trend="down" color="amber" />
        <StatCard title="Taxa de Recuperação" value="12.4%" change="+2.1%" trend="up" color="emerald" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por cliente ou CNPJ..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600">
              <Filter size={16} />
              Filtrar por Risco
            </button>
            <select className="bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 px-3 py-2">
              <option>91-180 Dias</option>
              <option>181-360 Dias</option>
              <option>+360 Dias</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cliente / CNPJ</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Dias Inativo</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Nível de Risco</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Motivo Provável</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Último Pedido</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inactiveClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{client.name}</p>
                      <p className="text-xs text-slate-400 font-mono">{client.cnpj}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className={cn(
                        "text-sm font-bold",
                        client.days > 150 ? "text-rose-600" : "text-amber-600"
                      )}>
                        {client.days} Dias
                      </span>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            client.days > 150 ? "bg-rose-500" : "bg-amber-500"
                          )}
                          style={{ width: `${Math.min((client.days / 180) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      "text-[10px] font-bold uppercase px-2 py-1 rounded-full border",
                      client.risk === 'Crítico' 
                        ? "bg-rose-50 text-rose-700 border-rose-100" 
                        : "bg-amber-50 text-amber-700 border-amber-100"
                    )}>
                      {client.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <AlertCircle size={14} className="text-slate-400" />
                      {client.reason}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-bold text-slate-800">{client.lastValue}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">YoY -15%</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">
                        Reativar
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, trend, color }: any) {
  const colorClasses: any = {
    rose: "text-rose-600 bg-rose-50",
    amber: "text-amber-600 bg-amber-50",
    emerald: "text-emerald-600 bg-emerald-50",
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <div className="flex items-end justify-between mt-2">
        <p className="text-2xl font-extrabold text-slate-900">{value}</p>
        <div className={cn(
          "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded",
          colorClasses[color]
        )}>
          {change}
        </div>
      </div>
    </div>
  );
}
