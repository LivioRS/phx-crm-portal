'use client';

import * as React from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Download, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const clients = [
  { id: 1, name: 'TechSolutions Group', cnpj: '04.122.948/0001-90', category: 'Indústria', status: 'Ativo', lastOrder: '14 Ago, 2023', totalSpent: 'R$ 1.240.000,00', city: 'São Paulo - SP' },
  { id: 2, name: 'Nova Varejo S.A.', cnpj: '12.553.111/0001-22', category: 'Varejo', status: 'Inativo', lastOrder: '28 Out, 2023', totalSpent: 'R$ 850.000,00', city: 'Campinas - SP' },
  { id: 3, name: 'Weg Motores S.A.', cnpj: '84.450.000/0001-92', category: 'Indústria', status: 'Ativo', lastOrder: '10 Fev, 2024', totalSpent: 'R$ 3.120.000,00', city: 'Jaraguá do Sul - SC' },
  { id: 4, name: 'Extra Supermercados', cnpj: '00.111.222/0001-33', category: 'Varejo', status: 'Ativo', lastOrder: '05 Fev, 2024', totalSpent: 'R$ 9.450.000,00', city: 'São Paulo - SP' },
  { id: 5, name: 'Carrefour Comércio', cnpj: '45.321.000/0005-11', category: 'Varejo', status: 'Ativo', lastOrder: '12 Jan, 2024', totalSpent: 'R$ 7.200.000,00', city: 'Osasco - SP' },
  { id: 6, name: 'Creative Minds SP', cnpj: '33.111.000/0001-99', category: 'Serviços', status: 'Ativo', lastOrder: '22 Dez, 2023', totalSpent: 'R$ 420.000,00', city: 'São Paulo - SP' },
  { id: 7, name: 'Logística Express', cnpj: '11.222.333/0001-44', category: 'Logística', status: 'Inativo', lastOrder: '15 Jul, 2023', totalSpent: 'R$ 1.100.000,00', city: 'Santos - SP' },
  { id: 8, name: 'Metalúrgica Central', cnpj: '99.888.777/0001-66', category: 'Indústria', status: 'Ativo', lastOrder: '01 Fev, 2024', totalSpent: 'R$ 2.450.000,00', city: 'Sorocaba - SP' },
];

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [segmentFilter, setSegmentFilter] = React.useState('Todos os Segmentos');
  const [statusFilter, setStatusFilter] = React.useState('Todos os Status');

  const filteredClients = React.useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.cnpj.includes(searchTerm) ||
        client.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSegment = segmentFilter === 'Todos os Segmentos' || client.category === segmentFilter;
      const matchesStatus = statusFilter === 'Todos os Status' || client.status === statusFilter;

      return matchesSearch && matchesSegment && matchesStatus;
    });
  }, [searchTerm, segmentFilter, statusFilter]);

  return (
    <div className="max-w-[1400px] w-full mx-auto px-6 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Base de Clientes</h1>
          <p className="text-sm text-slate-500">Gerencie e visualize todos os CNPJs sob sua responsabilidade</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Download size={18} />
            Exportar CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all">
            <Plus size={18} />
            Novo Cliente
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nome, CNPJ ou cidade..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={segmentFilter}
              onChange={(e) => setSegmentFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 px-3 py-2 focus:ring-0"
            >
              <option>Todos os Segmentos</option>
              <option>Indústria</option>
              <option>Varejo</option>
              <option>Serviços</option>
              <option>Logística</option>
            </select>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 px-3 py-2 focus:ring-0"
            >
              <option>Todos os Status</option>
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
            <div className="h-8 w-px bg-slate-200 mx-1"></div>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:border-blue-400 transition-all">
              <Filter size={16} />
              Filtros Avançados
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-slate-600">
                    Razão Social / CNPJ
                    <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Segmento</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Localização</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Faturamento Total</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{client.name}</p>
                      <p className="text-xs text-slate-400 font-mono">{client.cnpj}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                      {client.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <MapPin size={14} className="text-slate-400" />
                      {client.city}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-[10px] font-bold uppercase px-2 py-1 rounded-full border",
                      client.status === 'Ativo' 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                        : "bg-rose-50 text-rose-700 border-rose-100"
                    )}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-bold text-slate-800">{client.totalSpent}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Último: {client.lastOrder}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Mail size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Phone size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500">Exibindo 8 de 124 clientes</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-white disabled:opacity-50" disabled>
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg text-xs font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg text-xs font-bold text-slate-600">2</button>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg text-xs font-bold text-slate-600">3</button>
            </div>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-white">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
