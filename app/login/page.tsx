'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [repId, setRepId] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, just redirect to dashboard
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="bg-[#0F172A] p-3 rounded-2xl inline-block mb-4 shadow-xl">
          <TrendingUp className="text-white w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">PHX CRM</h1>
        <p className="text-slate-500 font-medium mt-1">Desempenho de Vendas Corporativas</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-1">Acesso ao Portal do Representante</h2>
          <p className="text-sm text-slate-500 mb-8">Insira suas credenciais para gerenciar sua região</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">ID do Representante</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <User size={18} />
                </div>
                <input 
                  type="text"
                  placeholder="REP-000000"
                  value={repId}
                  onChange={(e) => setRepId(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-slate-700">Senha</label>
                <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Esqueceu a senha?</button>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 px-1">
              <input 
                type="checkbox" 
                id="remember" 
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="text-sm text-slate-600 font-medium cursor-pointer">
                Lembrar deste dispositivo
              </label>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              Entrar
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-center">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <ShieldCheck size={14} />
            Conexão Segura e Criptografada
          </div>
        </div>
      </motion.div>

      <div className="mt-8 flex gap-6 text-xs font-semibold text-slate-400">
        <button className="hover:text-slate-600 transition-colors">Política de Privacidade</button>
        <button className="hover:text-slate-600 transition-colors">Termos de Serviço</button>
        <button className="hover:text-slate-600 transition-colors">Suporte</button>
      </div>
    </div>
  );
}
