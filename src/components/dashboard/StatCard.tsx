'use client';

import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: number; // percentage change
  color?: 'amber' | 'teal' | 'violet' | 'emerald' | 'slate';
}

// Paleta coherente - Tema Desértico de Dune
const colorMap = {
  amber: {
    gradient: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-500',
    light: 'bg-amber-50',
    text: 'text-amber-600'
  },
  teal: {
    gradient: 'from-teal-500 to-cyan-500',
    bg: 'bg-teal-500',
    light: 'bg-teal-50',
    text: 'text-teal-600'
  },
  violet: {
    gradient: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-500',
    light: 'bg-violet-50',
    text: 'text-violet-600'
  },
  emerald: {
    gradient: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-500',
    light: 'bg-emerald-50',
    text: 'text-emerald-600'
  },
  slate: {
    gradient: 'from-slate-500 to-zinc-500',
    bg: 'bg-slate-500',
    light: 'bg-slate-50',
    text: 'text-slate-600'
  }
};

export function StatCard({ title, value, icon: Icon, description, trend, color = 'amber' }: StatCardProps) {
  const colors = colorMap[color];
  const trendColor = trend && trend > 0 ? 'text-emerald-600' : trend && trend < 0 ? 'text-rose-600' : 'text-zinc-400';
  const trendBg = trend && trend > 0 ? 'bg-emerald-50' : trend && trend < 0 ? 'bg-rose-50' : 'bg-zinc-100';

  return (
    <div className="relative overflow-hidden bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 p-6 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 group">
      {/* Gradient accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient}`} />
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex-1">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{title}</p>
          <p className="text-4xl font-bold mt-2 text-zinc-900 dark:text-zinc-50 tabular-nums">{value}</p>
          
          {description && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{description}</p>
          )}
          
          {trend !== undefined && (
            <div className={`inline-flex items-center gap-1 mt-3 px-2 py-1 rounded-full text-xs font-semibold ${trendColor} ${trendBg}`}>
              {trend > 0 ? (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                </svg>
              ) : trend < 0 ? (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              ) : null}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        
        <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );
}