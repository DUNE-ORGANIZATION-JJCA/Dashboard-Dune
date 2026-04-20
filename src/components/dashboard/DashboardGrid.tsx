'use client';

import { Users, MousePointer, Video, Gamepad2, Activity, Globe, Monitor, Smartphone, Zap } from 'lucide-react';
import { StatCard } from './StatCard';
import { SessionsChart, DistributionChart } from './SessionsChart';
import { RegistrosBetaTable, SesionesTable, EventosTable, JugadoresTable } from './DataTable';
import type { 
  DashboardStats, 
  RegistrosBeta, 
  SesionesWeb, 
  EventosInteraccion, 
  EstadisticasJugadores 
} from '@/types/supabase';

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
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Registros Beta"
          value={stats.totalRegistrosBeta}
          icon={Users}
          description="Usuarios interesados"
        />
        <StatCard
          title="Sesiones"
          value={stats.totalSesiones}
          icon={Activity}
          description="Visitas únicas"
        />
        <StatCard
          title="Clicks"
          value={stats.totalClicks}
          icon={MousePointer}
          description="Interacciones"
        />
        <StatCard
          title="Videos"
          value={stats.reproduccionesVideo}
          icon={Video}
          description="Reproducciones"
        />
        <StatCard
          title="Jugadores"
          value={stats.playersUnicos}
          icon={Gamepad2}
          description="Jugadores activos"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sessions Chart */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <h3 className="text-lg font-semibold mb-4">Sesiones (últimos 7 días)</h3>
          <SessionsChart data={sesionesPorDia} />
        </div>

        {/* Device Distribution */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <h3 className="text-lg font-semibold mb-4">Dispositivos</h3>
          <DistributionChart 
            data={distribucionDispositivos.map(d => ({ name: d.dispositivo, value: d.count }))}
            colors={['#10b981', '#f59e0b']}
          />
        </div>
      </div>

      {/* Platform & Clicks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <h3 className="text-lg font-semibold mb-4">Plataformas Preferidas</h3>
          <DistributionChart 
            data={distribucionPlataformas.map(p => ({ name: p.plataforma, value: p.count }))}
            colors={['#3b82f6', '#8b5cf6']}
          />
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <h3 className="text-lg font-semibold mb-4">Tipos de Clics</h3>
          <DistributionChart 
            data={clicksPorTipo.map(c => ({ name: c.tipo, value: c.count }))}
            colors={['#ef4444', '#3b82f6', '#10b981']}
          />
        </div>
      </div>

      {/* Data Tables */}
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