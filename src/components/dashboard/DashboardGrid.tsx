'use client';

import { Users, MousePointer, Video, Gamepad2, Activity, Globe, Monitor, Smartphone, Zap } from 'lucide-react';
import { StatCard } from './StatCard';
import { SessionsChart, DistributionChart, CategoryChart } from './SessionsChart';
import { RegistrosBetaTable, SesionesTable, EventosTable, JugadoresTable } from './DataTable';
import type { 
  DashboardStats, 
  RegistrosBeta, 
  SesionesWeb, 
  EventosInteraccion, 
  EstadisticasJugadores 
} from '@/types/supabase';

// Paleta coherente - Tema Desértico de Dune
const COLORS = {
  amber: '#f59e0b',
  teal: '#14b8a6',
  violet: '#8b5cf6',
  emerald: '#10b981',
  slate: '#64748b'
};

interface DashboardGridProps {
  stats: DashboardStats;
  sesionesPorDia: { fecha: string; count: number }[];
  distribucionDispositivos: { dispositivo: string; count: number }[];
  distribucionPlataformas: { plataforma: string; count: number }[];
  clicksPorTipo: { tipo: string; count: number }[];
  registrosBeta: RegistrosBeta[];
  sesiones: SesionesWeb[];
  eventos: EventosInteraccion[];
  jugadores: EstadisticasJugadores[];
}

// Calcular porcentaje
function calcPercentage(value: number, total: number): string {
  return total > 0 ? ((value / total) * 100).toFixed(1) : '0';
}

export function DashboardGrid({
  stats,
  sesionesPorDia,
  distribucionDispositivos,
  distribucionPlataformas,
  clicksPorTipo,
  registrosBeta,
  sesiones,
  eventos,
  jugadores
}: DashboardGridProps) {
  const totalSesiones = stats.totalSesiones;
  const totalClics = stats.totalClicks;
  const totalRegistros = stats.totalRegistrosBeta;
  const totalJugadores = stats.playersUnicos;

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Registros Beta"
          value={totalRegistros.toLocaleString('es-ES')}
          icon={Users}
          description={`${calcPercentage(totalRegistros, totalRegistros || 1)}% del total`}
          color="amber"
        />
        <StatCard
          title="Sesiones"
          value={totalSesiones.toLocaleString('es-ES')}
          icon={Activity}
          description={`${calcPercentage(totalSesiones, totalSesiones || 1)}% del total`}
          color="teal"
        />
        <StatCard
          title="Clics"
          value={totalClics.toLocaleString('es-ES')}
          icon={MousePointer}
          description={`${calcPercentage(totalClics, totalClics || 1)}% del total`}
          color="violet"
        />
        <StatCard
          title="Videos"
          value={stats.reproduccionesVideo.toLocaleString('es-ES')}
          icon={Video}
          description="Reproducciones"
          color="emerald"
        />
        <StatCard
          title="Jugadores"
          value={totalJugadores.toLocaleString('es-ES')}
          icon={Gamepad2}
          description="Usuarios activos"
          color="slate"
        />
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sessions Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 p-6 hover:shadow-2xl hover:shadow-amber-500/10 transition-shadow relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Sesiones</h3>
              <p className="text-sm text-zinc-500">Últimos 7 días</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="text-sm font-medium text-zinc-500">En vivo</span>
            </div>
          </div>
          <SessionsChart data={sesionesPorDia} />
        </div>

        {/* Device Distribution con gradient */}
        <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-1">Dispositivos</h3>
          <p className="text-amber-100 text-sm mb-4">Distribución por tipo</p>
          
          <div className="h-[180px]">
            <DistributionChart 
              data={distribucionDispositivos.map(d => ({ name: d.dispositivo, value: d.count }))}
              colors={['#ffffff', '#fef3c7', '#fcd34d']}
            />
          </div>
          
          <div className="space-y-3 mt-4 pt-4 border-t border-white/20">
            {distribucionDispositivos.map((d, i) => {
              const pct = calcPercentage(d.count, totalSesiones);
              return (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-white/80"></div>
                    <span className="text-amber-50 text-sm">{d.dispositivo || 'Unknown'}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg">{d.count}</span>
                    <span className="text-amber-100 text-sm ml-1">({pct}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Segunda fila */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plataformas */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 p-6 hover:shadow-2xl hover:shadow-amber-500/10 transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Plataformas</h3>
            <span className="text-xs font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-full">
              {distribucionPlataformas.reduce((s, p) => s + p.count, 0)} total
            </span>
          </div>
          <DistributionChart 
            data={distribucionPlataformas.map(p => ({ name: p.plataforma, value: p.count }))}
            colors={[COLORS.amber, COLORS.violet, COLORS.teal]}
          />
        </div>

        {/* Tipos de Clics */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 p-6 hover:shadow-2xl hover:shadow-amber-500/10 transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Interacciones</h3>
            <span className="text-xs font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-full">
              {clicksPorTipo.reduce((s, c) => s + c.count, 0)} total
            </span>
          </div>
          <CategoryChart 
            data={clicksPorTipo.map(c => ({ 
              name: c.tipo.replace('click_', '').toUpperCase(), 
              value: c.count 
            }))}
            colors={[COLORS.amber, COLORS.teal, COLORS.violet]}
          />
        </div>

        {/* Resumen */}
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-4">Resumen</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-sm">Beta</span>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold">{totalRegistros}</span>
                <span className="text-xs text-zinc-400 ml-1">(100%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-teal-400" />
                </div>
                <span className="text-sm">Visitas</span>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold">{totalSesiones}</span>
                <span className="text-xs text-zinc-400 ml-1">(100%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <MousePointer className="w-5 h-5 text-violet-400" />
                </div>
                <span className="text-sm">Clics</span>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold">{totalClics}</span>
                <span className="text-xs text-zinc-400 ml-1">(100%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tablas */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RegistrosBetaTable data={registrosBeta} />
        <SesionesTable data={sesiones} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <EventosTable data={eventos} />
        <JugadoresTable data={jugadores} />
      </div>
    </div>
  );
}