'use client';

import * as React from 'react';
import { 
  History, 
  ShoppingBag, 
  MessageSquare, 
  Mail, 
  Phone, 
  UserPlus, 
  AlertCircle,
  Calendar,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const timelineEvents = [
  { 
    id: 1, 
    type: 'order', 
    title: 'Novo Pedido Faturado', 
    description: 'TechSolutions Group realizou um pedido de R$ 45.000,00.', 
    time: 'Há 2 horas', 
    date: '15 Fev, 2024',
    icon: <ShoppingBag size={16} />,
    color: 'blue'
  },
  { 
    id: 2, 
    type: 'contact', 
    title: 'Visita Técnica Realizada', 
    description: 'Visita presencial na Weg Motores para apresentação do novo catálogo.', 
    time: 'Há 5 horas', 
    date: '15 Fev, 2024',
    icon: <UserPlus size={16} />,
    color: 'purple'
  },
  { 
    id: 3, 
    type: 'alert', 
    title: 'Alerta de Inatividade', 
    description: 'Nova Varejo S.A. atingiu 90 dias sem novos pedidos.', 
    time: 'Ontem', 
    date: '14 Fev, 2024',
    icon: <AlertCircle size={16} />,
    color: 'rose'
  },
  { 
    id: 4, 
    type: 'message', 
    title: 'E-mail de Prospecção Enviado', 
    description: 'Enviado proposta comercial para Logística Express.', 
    time: 'Há 2 dias', 
    date: '13 Fev, 2024',
    icon: <Mail size={16} />,
    color: 'amber'
  },
  { 
    id: 5, 
    type: 'order', 
    title: 'Pedido Entregue', 
    description: 'Extra Supermercados recebeu a carga do pedido #8842.', 
    time: 'Há 3 dias', 
    date: '12 Fev, 2024',
    icon: <ShoppingBag size={16} />,
    color: 'emerald'
  },
];

export default function TimelinePage() {
  return (
    <div className="max-w-[1400px] w-full mx-auto px-6 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Linha do Tempo</h1>
          <p className="text-sm text-slate-500">Histórico cronológico de todas as atividades na sua região</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar atividade..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <TimelineItem key={event.id} event={event} isLeft={index % 2 === 0} />
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button className="px-6 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            Carregar Atividades Anteriores
          </button>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ event, isLeft }: any) {
  const colorClasses: any = {
    blue: "bg-blue-600",
    purple: "bg-purple-600",
    rose: "bg-rose-600",
    amber: "bg-amber-600",
    emerald: "bg-emerald-600",
  };

  const borderClasses: any = {
    blue: "border-blue-100",
    purple: "border-purple-100",
    rose: "border-rose-100",
    amber: "border-amber-100",
    emerald: "border-emerald-100",
  };

  return (
    <div className={cn(
      "relative flex flex-col md:flex-row items-center gap-8",
      isLeft ? "md:flex-row-reverse" : ""
    )}>
      {/* Content Card */}
      <div className="w-full md:w-1/2 pl-12 md:pl-0">
        <motion.div 
          initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={cn(
            "bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all cursor-pointer group",
            borderClasses[event.color]
          )}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{event.date}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{event.time}</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{event.title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{event.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white"></div>
              <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
            </div>
            <button className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
              Detalhes
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Icon Circle */}
      <div className={cn(
        "absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-white z-10",
        colorClasses[event.color]
      )}>
        {event.icon}
      </div>

      {/* Empty Space for Desktop Grid */}
      <div className="hidden md:block w-1/2"></div>
    </div>
  );
}
