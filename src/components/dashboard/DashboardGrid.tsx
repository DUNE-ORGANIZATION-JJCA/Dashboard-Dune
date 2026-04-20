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
    <div className="space-y-8">
      {/* Stats Cards - Primera fila heroica */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Registros Beta"
          value={stats.totalRegistrosBeta.toLocaleString('es-ES')}
          icon={Users}
          description="Usuarios interesados"
          color="amber"
        />
        <StatCard
          title="Sesiones"
          value={stats.totalSesiones.toLocaleString('es-ES')}
          icon={Activity}
          description="Visitas únicas"
          color="blue"
        />
        <StatCard
          title="Clics"
          value={stats.totalClicks.toLocaleString('es-ES')}
          icon={MousePointer}
          description="Interacciones"
          color="green"
        />
        <StatCard
          title="Videos"
          value={stats.reproduccionesVideo.toLocaleString('es-ES')}
          icon={Video}
          description="Reproducciones"
          color="purple"
        />
        <StatCard
          title="Jugadores"
          value={stats.playersUnicos.toLocaleString('es-ES')}
          icon={Gamepad2}
          description="Activos ahora"
          color="red"
        />
      </div>

      {/* Charts - Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sessions Chart - Grande */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Sesiones</h3>
              <p className="text-sm text-zinc-500">Últimos 7 días</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="text-sm text-zinc-500">En vivo</span>
            </div>
          </div>
          <SessionsChart data={sesionesPorDia} />
        </div>

        {/* Device Distribution */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Dispositivos</h3>
          <p className="text-amber-100 text-sm mb-4">Distribución por tipo</p>
          <div className="h-[220px]">
            <DistributionChart 
              data={distribucionDispositivos.map(d => ({ name: d.dispositivo, value: d.count }))}
              colors={['#ffffff', '#fcd34d', '#fef3c7']}
              title="Device"
            />
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex justify-between text-sm">
              <span className="text-amber-100">Desktop</span>
              <span className="font-bold">
                {distribucionDispositivos.find(d => d.dispositivo === 'Desktop')?.count || 0}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-amber-100">Mobile</span>
              <span className="font-bold">
                {distribucionDispositivos.find(d => d.dispositivo === 'Mobile')?.count || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Second row - Distribution charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plataformas */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4">Plataformas Preferidas</h3>
          <DistributionChart 
            data={distribucionPlataformas.map(p => ({ name: p.plataforma, value: p.count }))}
            colors={['#3b82f6', '#8b5cf6', '#10b981']}
          />
        </div>

        {/* Tipos de Clics */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4">Tipos de Interacción</h3>
          <CategoryChart 
            data={clicksPorTipo.map(c => ({ name: c.tipo.replace('click_', '').toUpperCase(), value: c.count }))}
            colors={['#ef4444', '#3b82f6', '#10b981']}
          />
        </div>

        {/* Resumen rápido */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-4">Resumen</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-amber-400" />
                <span className="text-sm">Beta</span>
              </div>
              <span className="text-2xl font-bold">{stats.totalRegistrosBeta}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Visitas</span>
              </div>
              <span className="text-2xl font-bold">{stats.totalSesiones}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-5 h-5 text-green-400" />
                <span className="text-sm">Jugadores</span>
              </div>
              <span className="text-2xl font-bold">{stats.playersUnicos}</span>
            </div>
          </div>
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