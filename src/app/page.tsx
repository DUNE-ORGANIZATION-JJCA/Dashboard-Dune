import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { getDashboardStats, getSesionesPorDia, getDistribucionDispositivos, getDistribucionPlataformas, getClicksPorTipo, getRegistrosBetaRecientes, getSesionesRecientes, getEventosRecientes, getEstadisticasJugadores } from '@/lib/supabase/queries';
import { Database } from '@/lib/supabase/database.types';

// Función para cargar los datos en el servidor
async function getData() {
  // Verificar que las variables de entorno estén configuradas
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Devolver datos de ejemplo si no hay configuración
    return {
      stats: {
        totalRegistrosBeta: 0,
        totalSesiones: 0,
        totalClicks: 0,
        reproduccionesVideo: 0,
        playersUnicos: 0
      },
      sesionesPorDia: [],
      distribucionDispositivos: [],
      distribucionPlataformas: [],
      clicksPorTipo: [],
      registrosBeta: [],
      sesiones: [],
      eventos: [],
      jugadores: [],
      isConfigured: false
    };
  }

  try {
    const [stats, sesionesPorDia, distribucionDispositivos, distribucionPlataformas, clicksPorTipo, registrosBeta, sesiones, eventos, jugadores] = await Promise.all([
      getDashboardStats(),
      getSesionesPorDia(),
      getDistribucionDispositivos(),
      getDistribucionPlataformas(),
      getClicksPorTipo(),
      getRegistrosBetaRecientes(10),
      getSesionesRecientes(10),
      getEventosRecientes(10),
      getEstadisticasJugadores(10)
    ]);

    return {
      stats,
      sesionesPorDia,
      distribucionDispositivos,
      distribucionPlataformas,
      clicksPorTipo,
      registrosBeta,
      sesiones,
      eventos,
      jugadores,
      isConfigured: true
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      stats: {
        totalRegistrosBeta: 0,
        totalSesiones: 0,
        totalClicks: 0,
        reproduccionesVideo: 0,
        playersUnicos: 0
      },
      sesionesPorDia: [],
      distribucionDispositivos: [],
      distribucionPlataformas: [],
      clicksPorTipo: [],
      registrosBeta: [],
      sesiones: [],
      eventos: [],
      jugadores: [],
      isConfigured: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  Dashboard Dune
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Arrakis Dominion - Analytics
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${data.isConfigured ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
              <span className="text-sm text-zinc-500">
                {data.isConfigured ? 'Conectado' : 'Sin conexión'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!data.isConfigured ? (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-8 text-center">
            <h2 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Configuración Requerida
            </h2>
            <p className="text-amber-700 dark:text-amber-300 mb-4">
              Para conectar con tu base de datos de Supabase, necesitas configurar las variables de entorno.
            </p>
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 text-left max-w-md mx-auto">
              <p className="text-sm font-mono text-zinc-600 dark:text-zinc-400 mb-2">
                NEXT_PUBLIC_SUPABASE_URL=tu_url
              </p>
              <p className="text-sm font-mono text-zinc-600 dark:text-zinc-400">
                NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
              </p>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4">
              Crea un archivo <code className="bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded">.env.local</code> en la raíz del proyecto.
            </p>
          </div>
        ) : (
          <DashboardGrid {...data} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-zinc-500">
            Dashboard de Arrakis Dominion - Powered by Next.js & Supabase
          </p>
        </div>
      </footer>
    </div>
  );
}
