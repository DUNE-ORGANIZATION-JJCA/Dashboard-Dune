// Tipos generados desde el esquema de Supabase
// Basado en las tablas definidas en el SQL original

import type { RegistrosBeta, SesionesWeb, EventosInteraccion, MetricasVideo, EstadisticasJugadores } from '@/types/supabase';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      registros_beta: {
        Row: RegistrosBeta;
        Insert: Omit<RegistrosBeta, 'id'>;
        Update: Partial<Omit<RegistrosBeta, 'id'>>;
      };
      sesiones_web: {
        Row: SesionesWeb;
        Insert: Omit<SesionesWeb, 'id'>;
        Update: Partial<Omit<SesionesWeb, 'id'>>;
      };
      eventos_interaccion: {
        Row: EventosInteraccion;
        Insert: Omit<EventosInteraccion, 'id'>;
        Update: Partial<Omit<EventosInteraccion, 'id'>>;
      };
      metricas_video: {
        Row: MetricasVideo;
        Insert: Omit<MetricasVideo, 'id'>;
        Update: Partial<Omit<MetricasVideo, 'id'>>;
      };
      estadisticas_jugadores: {
        Row: EstadisticasJugadores;
        Insert: Omit<EstadisticasJugadores, 'id'>;
        Update: Partial<Omit<EstadisticasJugadores, 'id'>>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      plataforma_preferida: 'PC' | 'Consola';
      dispositivo: 'Mobile' | 'Desktop';
      tipo_evento: 'click_steam' | 'click_video' | 'click_menu';
      estado_reproduccion: 'inicio' | '25%' | '50%' | '75%' | 'completado';
    };
  };
}