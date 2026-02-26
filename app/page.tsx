'use client';

import * as React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingBag, 
  ArrowUp, 
  ArrowDown,
  MoreHorizontal,
  FolderOpen,
  Factory,
  Store,
  ArrowUpRight,
  ListFilter
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  LineChart,
  Line,
  ComposedChart
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const chartData = [
  { name: 'Mar 23', atual: 210000, anterior: 190000, crescimento: 10.5 },
  { name: 'Abr 23', atual: 245000, anterior: 210000, crescimento: 16.7 },
  { name: 'Mai 23', atual: 190000, anterior: 180000, crescimento: 5.6 },
  { name: 'Jun 23', atual: 280000, anterior: 240000, crescimento: 16.7 },
  { name: 'Jul 23', atual: 310000, anterior: 260000, crescimento: 19.2 },
  { name: 'Ago 23', atual: 290000, anterior: 250000, crescimento: 16.0 },
  { name: 'Set 23', atual: 260000, anterior: 245000, crescimento: 6.1 },
  { name: 'Out 23', atual: 340000, anterior: 290000, crescimento: 17.2 },
  { name: 'Nov 23', atual: 320000, anterior: 285000, crescimento: 12.3 },
  { name: 'Dez 23', atual: 410000, anterior: 350000, crescimento: 17.1 },
  { name: 'Jan 24', atual: 280000, anterior: 260000, crescimento: 7.7 },
  { name: 'Fev 24', atual: 305000, anterior: 280000, crescimento: 8.9 },
];

const inactivityData = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  status: Math.random() > 0.7 ? 'critical' : Math.random() > 0.4 ? 'warning' : 'success',
  days: Math.floor(Math.random() * 180)
}));

export default function DashboardPage() {
  return (
    <div className="max-w-[1400px] w-full mx-auto px-6 py-8 space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Faturamento 12m" 
          value="R$ 2.845.400,00" 
          change="+12.4%" 
          trend="up" 
          subValue="vs R$ 2.531.000,00 Ano Ant."
          icon={<ShoppingBag className="text-blue-600" size={20} />}
          color="blue"
        />
        <KPICard 
          title="Crescimento YoY" 
          value="+14.2%" 
          change="3.2pp" 
          trend="up" 
          subValue="Meta: +11.0%"
          icon={<TrendingUp className="text-purple-600" size={20} />}
          color="purple"
        />
        <KPICard 
          title="Clientes Ativos" 
          value="124" 
          change="-2" 
          trend="down" 
          subValue="8 Novos neste período"
          icon={<Users className="text-amber-600" size={20} />}
          color="amber"
        />
        <KPICard 
          title="Ticket Médio" 
          value="R$ 22.946,77" 
          change="+8.5%" 
          trend="up" 
          subValue="vs R$ 21.148,00 Ano Ant."
          icon={<ShoppingBag className="text-emerald-600" size={20} />}
          color="emerald"
        />
      </div>

      {/* Main Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Comparativo de Vendas Mensais (Atual vs Anterior)</h2>
            <p className="text-sm text-slate-500">Evolução do faturamento nos últimos 12 meses comparado ao período anterior</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <span className="text-xs font-semibold text-slate-600 uppercase">Ano Atual</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-300"></span>
              <span className="text-xs font-semibold text-slate-600 uppercase">Ano Anterior</span>
            </div>
          </div>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 600 }}
                tickFormatter={(value) => `R$ ${value / 1000}k`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#F59E0B', fontSize: 10, fontWeight: 700 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', border: 'none', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar yAxisId="left" dataKey="atual" fill="#2563EB" radius={[6, 6, 0, 0]} barSize={30} />
              <Bar yAxisId="left" dataKey="anterior" fill="#CBD5E1" radius={[6, 6, 0, 0]} barSize={30} />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="crescimento" 
                stroke="#F59E0B" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#fff', stroke: '#F59E0B', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Inactivity Monitor */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Monitoramento de Inativos (91-180 dias)</h2>
                <p className="text-sm text-slate-500">Monitoramento de dormência: clientes sem compras no período crítico</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-slate-400">
                <span>Menos Inativo</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-emerald-100 rounded-sm"></div>
                  <div className="w-3 h-3 bg-amber-100 rounded-sm"></div>
                  <div className="w-3 h-3 bg-rose-200 rounded-sm"></div>
                  <div className="w-3 h-3 bg-rose-400 rounded-sm"></div>
                </div>
                <span>Crítico</span>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div className="grid grid-cols-20 gap-1.5">
                {inactivityData.map((tile) => (
                  <div 
                    key={tile.id}
                    className={cn(
                      "w-4 h-4 rounded-sm transition-all hover:ring-2 hover:ring-slate-300 cursor-pointer",
                      tile.status === 'critical' ? 'bg-rose-400' : 
                      tile.status === 'warning' ? 'bg-amber-100' : 
                      tile.status === 'success' ? 'bg-emerald-100' : 'bg-slate-100'
                    )}
                    title={`Cliente #${tile.id + 1000}: ${tile.days} dias inativo`}
                  />
                ))}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-slate-400 font-bold text-[11px] uppercase border-b border-slate-100">
                    <th className="pb-3 pl-2">Conta do Cliente</th>
                    <th className="pb-3 text-center">Última Compra</th>
                    <th className="pb-3 text-center">Dias Inativo</th>
                    <th className="pb-3 text-right">Valor Médio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <InactiveRow 
                    name="TechSolutions Group" 
                    cnpj="04.122.948/0001-90" 
                    date="14 Ago, 2023" 
                    days={172} 
                    value="R$ 12.400,00" 
                    status="critical"
                  />
                  <InactiveRow 
                    name="Nova Varejo S.A." 
                    cnpj="12.553.111/0001-22" 
                    date="28 Out, 2023" 
                    days={98} 
                    value="R$ 45.900,00" 
                    status="warning"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Client Groups */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-bold text-slate-800">Grupos de Clientes</h2>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">6 Bases de Dados</span>
          </div>
          
          <div className="space-y-4">
            <GroupCard 
              title="Principais Parceiros de Varejo" 
              count={4} 
              icon={<FolderOpen className="text-slate-400" size={18} />}
              clients={[
                { name: 'Extra Supermercados', cnpj: '00.111.222/0001-33' },
                { name: 'Carrefour Comércio', cnpj: '45.321.000/0005-11' }
              ]}
            />
            <GroupCard 
              title="Polos Industriais" 
              count={2} 
              icon={<Factory className="text-slate-400" size={18} />}
              clients={[
                { name: 'Weg Motores S.A.', cnpj: '84.450.000/0001-92' }
              ]}
            />
            <GroupCard 
              title="Agências Boutique" 
              count={1} 
              icon={<Store className="text-slate-400" size={18} />}
              clients={[
                { name: 'Creative Minds SP', cnpj: '33.111.000/0001-99' }
              ]}
              opacity={80}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, change, trend, subValue, icon, color }: any) {
  const colorClasses: any = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <span className={cn("p-2 rounded-lg", colorClasses[color])}>
          {icon}
        </span>
        <div className={cn(
          "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded",
          trend === 'up' ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
        )}>
          {trend === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {change}
        </div>
      </div>
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-extrabold text-slate-900 mt-1">{value}</p>
      <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold">{subValue}</p>
    </div>
  );
}

function InactiveRow({ name, cnpj, date, days, value, status }: any) {
  return (
    <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
      <td className="py-3 pl-2">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-2 h-2 rounded-full",
            status === 'critical' ? "bg-rose-400" : "bg-amber-200"
          )}></div>
          <div>
            <p className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{name}</p>
            <p className="text-xs text-slate-400">{cnpj}</p>
          </div>
        </div>
      </td>
      <td className="py-3 text-center text-slate-500">{date}</td>
      <td className="py-3 text-center">
        <span className={cn(
          "px-2 py-1 rounded font-bold text-xs",
          status === 'critical' ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
        )}>
          {days} Dias
        </span>
      </td>
      <td className="py-3 text-right font-semibold text-slate-700">{value}</td>
    </tr>
  );
}

function GroupCard({ title, count, icon, clients, opacity = 100 }: any) {
  return (
    <div className={cn(
      "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group/card hover:border-blue-300 transition-all cursor-pointer",
      opacity < 100 && "opacity-80"
    )}>
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center group-hover/card:bg-blue-50 transition-colors">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-bold text-slate-700 text-sm">{title}</span>
        </div>
        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">{count} CNPJs</span>
      </div>
      <div className="p-4 space-y-3">
        {clients.map((client: any, i: number) => (
          <div key={i} className="flex justify-between items-center group cursor-pointer hover:bg-slate-50 p-1 rounded">
            <div>
              <p className="text-xs font-bold text-slate-800">{client.name}</p>
              <p className="text-[10px] text-slate-400 font-mono">{client.cnpj}</p>
            </div>
            <ArrowUpRight className="text-slate-300 group-hover:text-blue-500 transition-colors" size={16} />
          </div>
        ))}
        <div className="mt-2 pt-2 border-t border-slate-100 flex justify-center">
          <button className="text-[10px] font-bold text-blue-600 uppercase flex items-center gap-1 hover:underline">
            <ListFilter size={12} />
            Ver Detalhes Completos
          </button>
        </div>
      </div>
    </div>
  );
}
