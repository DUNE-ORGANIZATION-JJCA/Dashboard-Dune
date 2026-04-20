// Tipos para las tablas de Supabase

export type PlataformaPreferida = 'PC' | 'Consola' | null;
export type Dispositivo = 'Mobile' | 'Desktop' | null;
export type TipoEvento = 'click_steam' | 'click_video' | 'click_menu' | null;
export type EstadoReproduccion = 'inicio' | '25%' | '50%' | '75%' | 'completado' | null;

export interface RegistrosBeta {
  id: string;
  email: string;
  nombre_usuario: string | null;
  fecha_registro: string;
  plataforma_preferida: PlataformaPreferida;
}

export interface SesionesWeb {
  id: string;
  visitor_id: string;
  url_entrada: string | null;
  duracion_segundos: number;
  dispositivo: Dispositivo;
  pais: string | null;
  fecha_inicio: string;
}

export interface EventosInteraccion {
  id: number;
  sesion_id: string | null;
  tipo_evento: TipoEvento;
  nombre_elemento: string | null;
  timestamp: string;
}

export interface MetricasVideo {
  id: string;
  video_id: string;
  estado_reproduccion: EstadoReproduccion;
  user_id: string | null;
  fecha_evento: string;
}

export interface EstadisticasJugadores {
  id: string;
  user_email: string | null;
  nivel_actual: number;
  horas_jugadas: number;
  ultima_conexion: string;
}

// Tipos para métricas agregadas del dashboard
export interface DashboardStats {
  totalRegistrosBeta: number;
  totalSesiones: number;
  totalClicks: number;
  reproduccionesVideo: number;
  playersUnicos: number;
}

export interface SesionConRegistros extends SesionesWeb {
  registros_beta?: RegistrosBeta;
}

export interface EventoConSesion extends EventosInteraccion {
  sesiones_web?: SesionesWeb;
}