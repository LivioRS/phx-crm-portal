'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  TimerOff,
  Settings,
  LogOut,
  ChevronRight,
  Filter,
  Target,
  History
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getUser, logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const sidebarLinks = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Meus Clientes', href: '/clientes', icon: Users },
  { name: 'Analise de Vendas', href: '/vendas', icon: TrendingUp },
  { name: 'Inativos', href: '/inativos', icon: TimerOff },
  { name: 'Funil de Recuperacao', href: '/funil', icon: Filter },
  { name: 'Metas e Objetivos', href: '/metas', icon: Target },
  { name: 'Linha do Tempo', href: '/timeline', icon: History },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const session = getUser();

  function handleLogout() {
    logout();
    router.push('/login');
  }

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-slate-900 border-r border-slate-700/50">
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">PHX</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">PHX Instrumentos</p>
            <p className="text-xs text-slate-400">Portal do Representante</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'w-[calc(100%-1rem)] flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon size={18} />
              <span>{link.name}</span>
              {isActive && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          );
        })}

        <Link
          href="/configuracoes"
          className={cn(
            'w-[calc(100%-1rem)] flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
            pathname === '/configuracoes'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          )}
        >
          <Settings size={18} />
          <span>Configuracoes</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-[calc(100%-1rem)] flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </nav>

      <div className="p-4 mt-auto space-y-4">
        {session && (
          <div className="px-4 py-3 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Representante</p>
            <p className="text-xs font-bold text-white truncate">{session.name}</p>
          </div>
        )}

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Status</p>
          <div className="flex items-center justify-center gap-2 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Banco de Dados Ativo
          </div>
        </div>
      </div>
    </aside>
  );
};
