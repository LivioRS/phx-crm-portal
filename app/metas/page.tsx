'use client';

import * as React from 'react';
import { 
  Target, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  ArrowUpRight,
  Calendar,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const goals = [
  { id: 1, title: 'Faturamento Mensal', current: 305000, target: 350000, color: 'blue', deadline: '28 Fev, 2024' },
  { id: 2, title: 'Novos Clientes (CNPJ)', current: 8, target: 12, color: 'purple', deadline: '28 Fev, 2024' },
  { id: 3, title: 'Recuperação de Inativos', current: 3, target: 5, color: 'emerald', deadline: '28 Fev, 2024' },
  { id: 4, title: 'Ticket Médio', current: 22946, target: 25000, color: 'amber', deadline: '28 Fev, 2024' },
];

export default function MetasPage() {
  return (
    <div className="max-w-[1400px] w-full mx-auto px-6 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Metas e Objetivos</h1>
          <p className="text-sm text-slate-500">Acompanhamento de performance individual e bonificações</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-sm font-semibold text-slate-600">Fevereiro 2024</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal) => (
              <GoalCard key={goal.id} {...goal} />
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Histórico de Conquistas</h2>
            <div className="space-y-4">
              {[
                { month: 'Janeiro 2024', status: 'Batida', bonus: 'R$ 2.450,00', perf: '105%' },
                { month: 'Dezembro 2023', status: 'Superada', bonus: 'R$ 5.100,00', perf: '122%' },
                { month: 'Novembro 2023', status: 'Batida', bonus: 'R$ 1.800,00', perf: '101%' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-200">
                      <Award className="text-amber-500" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{item.month}</p>
                      <p className="text-xs text-slate-500">Meta {item.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-600">+{item.perf}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bônus: {item.bonus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0F172A] p-6 rounded-xl text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="text-amber-400 fill-amber-400" size={20} />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Próximo Nível</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Representante Platinum</h3>
              <p className="text-sm text-slate-400 mb-6">Faltam apenas R$ 45.000,00 em vendas para atingir o próximo nível de comissionamento.</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-slate-500">Progresso</span>
                  <span className="text-amber-400">85%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-bold transition-all">
                Ver Benefícios do Nível
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-10">
              <Award size={160} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Dicas de Performance</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="text-blue-600" size={16} />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-800">Foco em Reativação:</span> Clientes inativos há mais de 120 dias têm 40% mais chance de churn definitivo.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="text-emerald-600" size={16} />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-800">Mix de Produtos:</span> Aumentar o mix em 2 itens por cliente eleva o ticket médio em 15%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoalCard({ title, current, target, color, deadline }: any) {
  const percent = Math.min((current / target) * 100, 100);
  
  const colors: any = {
    blue: "bg-blue-600",
    purple: "bg-purple-600",
    emerald: "bg-emerald-600",
    amber: "bg-amber-600",
  };

  const bgColors: any = {
    blue: "bg-blue-50",
    purple: "bg-purple-50",
    emerald: "bg-emerald-50",
    amber: "bg-amber-50",
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{title}</h3>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">
            {typeof current === 'number' && current > 1000 ? `R$ ${current.toLocaleString('pt-BR')}` : current}
          </p>
        </div>
        <div className={cn("p-2 rounded-lg", bgColors[color])}>
          <Target className={cn("w-5 h-5", colors[color].replace('bg-', 'text-'))} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-slate-400">Progresso</span>
          <span className="text-slate-900">{percent.toFixed(1)}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className={cn("h-full rounded-full transition-all duration-1000", colors[color])} style={{ width: `${percent}%` }}></div>
        </div>
        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2">
          <span>Meta: {typeof target === 'number' && target > 1000 ? `R$ ${target.toLocaleString('pt-BR')}` : target}</span>
          <div className="flex items-center gap-1">
            <Clock size={10} />
            {deadline}
          </div>
        </div>
      </div>
    </div>
  );
}
