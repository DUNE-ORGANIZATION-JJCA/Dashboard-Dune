import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { getDashboardStats, getSesionesPorDia, getDistribucionDispositivos, getDistribucionPlataformas, getClicksPorTipo, getRegistrosBetaRecientes, getSesionesRecientes, getEventosRecientes, getEstadisticasJugadores } from '@/lib/supabase/queries';

// Función para cargar los datos en el servidor
async function getData() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return {
      stats: { totalRegistrosBeta: 0, totalSesiones: 0, totalClicks: 0, reproduccionesVideo: 0, playersUnicos: 0 },
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
      stats: { totalRegistrosBeta: 0, totalSesiones: 0, totalClicks: 0, reproduccionesVideo: 0, playersUnicos: 0 },
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
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Header */}
      <header className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
                <span className="text-white font-bold text-2xl">D</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-50 dark:to-zinc-400 bg-clip-text text-transparent">
                  Dashboard Dune
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                  Arrakis Dominion • Analytics
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                <span className={`w-2 h-2 rounded-full ${data.isConfigured ? 'bg-green-500 shadow-lg shadow-green-500/50 animate-pulse' : 'bg-yellow-500'}`}></span>
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  {data.isConfigured ? 'Connected' : 'Setup Required'}
                </span>
              </div>
              <a 
                href="https://supabase.com/dashboard"
                target="_blank"
                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!data.isConfigured ? (
          <div className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-800/50 rounded-3xl p-8 text-center shadow-xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-amber-500 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-200 mb-2">
              Configuration Required
            </h2>
            <p className="text-amber-700 dark:text-amber-300 mb-6 max-w-md mx-auto">
              To connect to your Supabase database, you need to configure the environment variables.
            </p>
            <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 text-left max-w-lg mx-auto shadow-inner">
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-2 bg-zinc-100 dark:bg-zinc-700 p-3 rounded-xl">
                NEXT_PUBLIC_SUPABASE_URL=your_url
              </p>
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-700 p-3 rounded-xl">
                NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
              </p>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4">
              Create a <code className="bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded-lg font-mono">.env.local</code> file in the project root.
            </p>
          </div>
        ) : (
          <>
            {/* Welcome Message */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                Overview
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                Tu análisis en tiempo real de Arrakis Dominion
              </p>
            </div>
            <DashboardGrid {...data} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/50 dark:border-zinc-800/50 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-500">
              Dashboard de Arrakis Dominion
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400">Powered by</span>
              <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Next.js + Supabase</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}