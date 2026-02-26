'use client';

import * as React from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const performanceData = [
  { month: 'Jan', vendas: 45000, meta: 40000 },
  { month: 'Fev', vendas: 52000, meta: 40000 },
  { month: 'Mar', vendas: 48000, meta: 45000 },
  { month: 'Abr', vendas: 61000, meta: 45000 },
  { month: 'Mai', vendas: 55000, meta: 50000 },
  { month: 'Jun', vendas: 67000, meta: 50000 },
  { month: 'Jul', vendas: 72000, meta: 55000 },
  { month: 'Ago', vendas: 68000, meta: 55000 },
  { month: 'Set', vendas: 75000, meta: 60000 },
  { month: 'Out', vendas: 82000, meta: 60000 },
  { month: 'Nov', vendas: 88000, meta: 65000 },
  { month: 'Dez', vendas: 95000, meta: 70000 },
];

const categoryData = [
  { name: 'Eletrônicos', value: 400, color: '#2563EB' },
  { name: 'Móveis', value: 300, color: '#7C3AED' },
  { name: 'Alimentos', value: 300, color: '#F59E0B' },
  { name: 'Vestuário', value: 200, color: '#10B981' },
];

export default function VendasPage() {
  return (
    <div className="max-w-[1400px] w-full mx-auto px-6 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Análise de Vendas</h1>
          <p className="text-sm text-slate-500">Relatórios detalhados de performance e conversão</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-sm font-semibold text-slate-600">Jan 2023 - Dez 2023</span>
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
            <Filter size={20} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20">
            <Download size={18} />
            Relatório PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Performance Chart */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-slate-800">Evolução de Vendas vs Meta</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                  <span className="text-xs font-semibold text-slate-600 uppercase">Vendas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                  <span className="text-xs font-semibold text-slate-600 uppercase">Meta</span>
                </div>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748B', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94A3B8', fontSize: 12 }}
                    tickFormatter={(value) => `R$ ${value / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', border: 'none', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="vendas" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorVendas)" />
                  <Area type="monotone" dataKey="meta" stroke="#E2E8F0" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Region Performance */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Performance por Sub-região</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { region: 'Norte', value: 45000 },
                  { region: 'Sul', value: 82000 },
                  { region: 'Leste', value: 61000 },
                  { region: 'Oeste', value: 55000 },
                  { region: 'Centro', value: 72000 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} tickFormatter={(value) => `R$ ${value / 1000}k`} />
                  <Tooltip cursor={{ fill: '#F8FAFC' }} />
                  <Bar dataKey="value" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Distribution Chart */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Distribuição por Categoria</h2>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{((item.value / 1200) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Produtos em Destaque</h2>
            <div className="space-y-4">
              {[
                { name: 'Kit Industrial Pro', sales: 124, growth: '+12%', trend: 'up' },
                { name: 'Sensor de Precisão X1', sales: 98, growth: '+8%', trend: 'up' },
                { name: 'Cabo Blindado 50m', sales: 85, growth: '-3%', trend: 'down' },
                { name: 'Módulo de Controle', sales: 72, growth: '+15%', trend: 'up' },
              ].map((product, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{product.name}</p>
                    <p className="text-xs text-slate-500">{product.sales} unidades vendidas</p>
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-xs font-bold",
                    product.trend === 'up' ? "text-emerald-600" : "text-rose-600"
                  )}>
                    {product.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {product.growth}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm font-bold text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50 transition-all">
              Ver Todos os Produtos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
