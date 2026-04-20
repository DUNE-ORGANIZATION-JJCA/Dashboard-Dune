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

export function RegistrosBetaTable({ data }: { data: RegistrosBeta[] }) {
  const columns: Column<RegistrosBeta>[] = [
    {
      key: 'email',
      header: 'Email',
      render: (value) => (
        <span className="font-mono text-sm">{value}</span>
      )
    },
    { key: 'nombre_usuario', header: 'Usuario' },
    {
      key: 'plataforma_preferida',
      header: 'Plataforma',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'PC' 
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
            : 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
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
    { key: 'visitor_id', header: 'Visitor ID' },
    {
      key: 'dispositivo',
      header: 'Dispositivo',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Desktop'
            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
            : 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
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

  return <GenericTable data={data} columns={columns} title="Sesiones Recientes" />;
}

export function EventosTable({ data }: { data: EventosInteraccion[] }) {
  const columns: Column<EventosInteraccion>[] = [
    {
      key: 'tipo_evento',
      header: 'Tipo',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'click_steam'
            ? 'bg-blue-100 text-blue-700'
            : value === 'click_video'
            ? 'bg-red-100 text-red-700'
            : 'bg-gray-100 text-gray-700'
        }`}>
          {value || 'N/A'}
        </span>
      )
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

  return <GenericTable data={data} columns={columns} title="Eventos Recientes" />;
}

export function JugadoresTable({ data }: { data: EstadisticasJugadores[] }) {
  const columns: Column<EstadisticasJugadores>[] = [
    { key: 'user_email', header: 'Email' },
    {
      key: 'nivel_actual',
      header: 'Nivel',
      render: (value) => (
        <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">
          {value}
        </span>
      )
    },
    {
      key: 'horas_jugadas',
      header: 'Horas',
      render: (value) => `${value.toFixed(1)}h`
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

  return <GenericTable data={data} columns={columns} title="Estadísticas de Jugadores" />;
}

function GenericTable<T extends { id?: string | number }>({ data, columns, title }: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="text-zinc-500 text-center py-8">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-50 dark:bg-zinc-800/50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key as string}
                  className="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {data.map((row, index) => (
              <tr key={row.id || index} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
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