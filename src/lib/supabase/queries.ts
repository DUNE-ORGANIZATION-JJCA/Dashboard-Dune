import { getSupabaseServerClient } from './server';
import type { 
  RegistrosBeta, 
  SesionesWeb, 
  EventosInteraccion, 
  MetricasVideo, 
  EstadisticasJugadores,
  DashboardStats 
} from '@/types/supabase';

// Obtener todas las estadísticas del dashboard
export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await getSupabaseServerClient();
  
  const [
    { count: totalRegistrosBeta },
    { count: totalSesiones },
    { count: totalClicks },
    { count: reproduccionesVideo },
    { count: playersUnicos }
  ] = await Promise.all([
    supabase.from('registros_beta').select('*', { count: 'exact', head: true }),
    supabase.from('sesiones_web').select('*', { count: 'exact', head: true }),
    supabase.from('eventos_interaccion').select('*', { count: 'exact', head: true }),
    supabase.from('metricas_video').select('*', { count: 'exact', head: true }),
    supabase.from('estadisticas_jugadores').select('*', { count: 'exact', head: true })
  ]);

  return {
    totalRegistrosBeta: totalRegistrosBeta ?? 0,
    totalSesiones: totalSesiones ?? 0,
    totalClicks: totalClicks ?? 0,
    reproduccionesVideo: reproduccionesVideo ?? 0,
    playersUnicos: playersUnicos ?? 0
  };
}

// Obtener registros beta recientes
export async function getRegistrosBetaRecientes(limit = 10): Promise<RegistrosBeta[]> {
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from('registros_beta')
    .select('*')
    .order('fecha_registro', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

// Obtener sesiones recientes
export async function getSesionesRecientes(limit = 10): Promise<SesionesWeb[]> {
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from('sesiones_web')
    .select('*')
    .order('fecha_inicio', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

// Obtener eventos de interacción recientes
export async function getEventosRecientes(limit = 20): Promise<EventosInteraccion[]> {
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from('eventos_interaccion')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

// Obtener métricas de video recientes
export async function getMetricasVideoRecientes(limit = 10): Promise<MetricasVideo[]> {
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from('metricas_video')
    .select('*')
    .order('fecha_evento', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

// Obtener estadísticas de jugadores
export async function getEstadisticasJugadores(limit = 10): Promise<EstadisticasJugadores[]> {
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from('estadisticas_jugadores')
    .select('*')
    .order('ultima_conexion', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

// Obtener datos para gráfico de sesiones por día (últimos 7 días)
export async function getSesionesPorDia(): Promise<{ fecha: string; count: number }[]> {
  const supabase = await getSupabaseServerClient();
  
  const { data, error } = await supabase
    .from('sesiones_web')
    .select('*')
    .gte('fecha_inicio', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

  if (error) throw error;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const grouped: Record<string, number> = {};
  (data as any[])?.forEach((sesion: any) => {
    const fecha = sesion.fecha_inicio.split('T')[0];
    grouped[fecha] = (grouped[fecha] || 0) + 1;
  });

  return Object.entries(grouped).map(([fecha, count]) => ({ fecha, count }));
}

// Obtener distribución de dispositivos
export async function getDistribucionDispositivos(): Promise<{ dispositivo: string; count: number }[]> {
  const supabase = await getSupabaseServerClient();
  
  const { data, error } = await supabase
    .from('sesiones_web')
    .select('dispositivo');

  if (error) throw error;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const grouped: Record<string, number> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (data as any[])?.forEach((sesion: any) => {
    const dispositivo = sesion.dispositivo || 'Desconocido';
    grouped[dispositivo] = (grouped[dispositivo] || 0) + 1;
  });

  return Object.entries(grouped).map(([dispositivo, count]) => ({ dispositivo, count }));
}

// Obtener distribución de plataformas preferidas
export async function getDistribucionPlataformas(): Promise<{ plataforma: string; count: number }[]> {
  const supabase = await getSupabaseServerClient();
  
  const { data, error } = await supabase
    .from('registros_beta')
    .select('plataforma_preferida');

  if (error) throw error;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const grouped: Record<string, number> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (data as any[])?.forEach((registro: any) => {
    const plataforma = registro.plataforma_preferida || 'No especificada';
    grouped[plataforma] = (grouped[plataforma] || 0) + 1;
  });

  return Object.entries(grouped).map(([plataforma, count]) => ({ plataforma, count }));
}

// Obtener clicks por tipo de evento
export async function getClicksPorTipo(): Promise<{ tipo: string; count: number }[]> {
  const supabase = await getSupabaseServerClient();
  
  const { data, error } = await supabase
    .from('eventos_interaccion')
    .select('tipo_evento');

  if (error) throw error;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const grouped: Record<string, number> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (data as any[])?.forEach((evento: any) => {
    const tipo = evento.tipo_evento || 'Otro';
    grouped[tipo] = (grouped[tipo] || 0) + 1;
  });

  return Object.entries(grouped).map(([tipo, count]) => ({ tipo, count }));
}