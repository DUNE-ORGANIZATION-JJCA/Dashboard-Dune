'use client';

import { 
  RegistrosBeta, 
  SesionesWeb, 
  EventosInteraccion, 
  MetricasVideo, 
  EstadisticasJugadores 
} from '@/types/supabase';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title: string;
}

// Paleta coherente - Tema Desértico de Dune
const COLORS = {
  amber: { bg: 'bg-amber-100', text: 'text-amber-700', darkBg: 'dark:bg-amber-900/50', darkText: 'dark:text-amber-300' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-700', darkBg: 'dark:bg-teal-900/50', darkText: 'dark:text-teal-300' },
  violet: { bg: 'bg-violet-100', text: 'text-violet-700', darkBg: 'dark:bg-violet-900/50', darkText: 'dark:text-violet-300' },
  green: { bg: 'bg-green-100', text: 'text-green-700', darkBg: 'dark:bg-green-900/50', darkText: 'dark:text-green-300' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-700', darkBg: 'dark:bg-orange-900/50', darkText: 'dark:text-orange-300' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-700', darkBg: 'dark:bg-slate-900/50', darkText: 'dark:text-slate-300' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-700', darkBg: 'dark:bg-blue-900/50', darkText: 'dark:text-blue-300' },
};

export function RegistrosBetaTable({ data }: { data: RegistrosBeta[] }) {
  const columns: Column<RegistrosBeta>[] = [
    {
      key: 'email',
      header: 'Email',
      render: (value) => (
        <span className="font-mono text-sm text-zinc-700 dark:text-zinc-300">{value}</span>
      )
    },
    { key: 'nombre_usuario', header: 'Usuario' },
    {
      key: 'plataforma_preferida',
      header: 'Plataforma',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'PC' 
            ? `${COLORS.blue.bg} ${COLORS.blue.text} ${COLORS.blue.darkBg} ${COLORS.blue.darkText}`
            : `${COLORS.violet.bg} ${COLORS.violet.text} ${COLORS.violet.darkBg} ${COLORS.violet.darkText}`
        }`}>
          {value || 'N/A'}
        </span>
      )
    },
    {
      key: 'fecha_registro',
      header: 'Fecha',
      render: (value) => new Date(value).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  ];

  return <GenericTable data={data} columns={columns} title="Registros Beta" />;
}

export function SesionesTable({ data }: { data: SesionesWeb[] }) {
  const columns: Column<SesionesWeb>[] = [
    { 
      key: 'visitor_id', 
      header: 'Visitor ID',
      render: (value) => (
        <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{value.slice(0, 8)}...</span>
      )
    },
    {
      key: 'dispositivo',
      header: 'Dispositivo',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Desktop'
            ? `${COLORS.green.bg} ${COLORS.green.text} ${COLORS.green.darkBg} ${COLORS.green.darkText}`
            : `${COLORS.orange.bg} ${COLORS.orange.text} ${COLORS.orange.darkBg} ${COLORS.orange.darkText}`
        }`}>
          {value || 'N/A'}
        </span>
      )
    },
    { key: 'pais', header: 'País' },
    {
      key: 'duracion_segundos',
      header: 'Duración',
      render: (value) => `${Math.round(value)}s`
    },
    {
      key: 'fecha_inicio',
      header: 'Fecha',
      render: (value) => new Date(value).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  ];

  return <GenericTable data={data} columns={columns} title="Sesiones" />;
}

export function EventosTable({ data }: { data: EventosInteraccion[] }) {
  const typeColors: Record<string, typeof COLORS.blue> = {
    click_steam: COLORS.blue,
    click_video: COLORS.orange,
    click_menu: COLORS.slate,
  };

  const columns: Column<EventosInteraccion>[] = [
    {
      key: 'tipo_evento',
      header: 'Tipo',
      render: (value) => {
        const colors = typeColors[value || ''] || COLORS.slate;
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}`}>
            {value || 'N/A'}
          </span>
        );
      }
    },
    { key: 'nombre_elemento', header: 'Elemento' },
    {
      key: 'timestamp',
      header: 'Hora',
      render: (value) => new Date(value).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
  ];

  return <GenericTable data={data} columns={columns} title="Eventos" />;
}

export function JugadoresTable({ data }: { data: EstadisticasJugadores[] }) {
  const columns: Column<EstadisticasJugadores>[] = [
    { 
      key: 'user_email', 
      header: 'Email',
      render: (value) => (
        <span className="font-mono text-sm text-zinc-700 dark:text-zinc-300">{value}</span>
      )
    },
    {
      key: 'nivel_actual',
      header: 'Nivel',
      render: (value) => (
        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center text-sm font-bold">
          {value}
        </span>
      )
    },
    {
      key: 'horas_jugadas',
      header: 'Horas',
      render: (value) => (
        <span className="text-zinc-700 dark:text-zinc-300">{value.toFixed(1)}h</span>
      )
    },
    {
      key: 'ultima_conexion',
      header: 'Última conexión',
      render: (value) => new Date(value).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  ];

  return <GenericTable data={data} columns={columns} title="Jugadores" />;
}

function GenericTable<T extends { id?: string | number }>({ data, columns, title }: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 p-8">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4">{title}</h3>
        <p className="text-zinc-400 text-center py-8">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden">
      <div className="p-4 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-800/30">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{title}</h3>
        <p className="text-xs text-zinc-500">{data.length} registros</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-100/50 dark:bg-zinc-800/50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key as string}
                  className="px-4 py-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
            {data.map((row, index) => (
              <tr key={row.id || index} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                {columns.map((col) => (
                  <td key={col.key as string} className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300">
                    {col.render 
                      ? col.render((row as any)[col.key as keyof T], row)
                      : (row as any)[col.key as keyof T] || '-'
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}