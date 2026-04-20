'use client';

import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  color?: 'amber' | 'blue' | 'green' | 'purple' | 'red';
}

const colorMap = {
  amber: 'from-amber-500 to-orange-500',
  blue: 'from-blue-500 to-cyan-500',
  green: 'from-emerald-500 to-teal-500',
  purple: 'from-violet-500 to-purple-500',
  red: 'from-rose-500 to-pink-500',
};

const bgColorMap = {
  amber: 'bg-amber-500',
  blue: 'bg-blue-500',
  green: 'bg-emerald-500',
  purple: 'bg-violet-500',
  red: 'bg-rose-500',
};

export function StatCard({ title, value, icon: Icon, description, color = 'amber' }: StatCardProps) {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-xl transition-all duration-300 group">
      {/* Gradient accent */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colorMap[color]}`} />
      
      <div className="flex items-center justify-between mt-2">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{title}</p>
          <p className="text-5xl font-bold mt-3 text-zinc-900 dark:text-zinc-50 tabular-nums">{value}</p>
          {description && (
            <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">{description}</p>
          )}
        </div>
        <div className={`w-16 h-16 rounded-2xl ${bgColorMap[color]} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
}