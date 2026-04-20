-- =====================================================
-- ESQUEMA DE BASE DE DATOS PARA DUNE: ARRANKIS DOMINION
-- =====================================================

-- 1. Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. REGISTROS PARA LA BETA
-- Guarda la identidad de los interesados
CREATE TABLE registros_beta (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    nombre_usuario TEXT,
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    plataforma_preferida TEXT -- Ej: 'PC', 'Consola'
);

-- 3. SESIONES Y TIEMPO (Gente que visita la página)
-- Para medir el tráfico y la retención
CREATE TABLE sesiones_web (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visitor_id UUID NOT NULL, -- Identificador único del navegador
    url_entrada TEXT,
    duracion_segundos FLOAT DEFAULT 0,
    dispositivo TEXT, -- Ej: 'Mobile', 'Desktop'
    pais TEXT,
    fecha_inicio TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. EVENTOS DE CLIC (Steam y clics generales)
-- Para medir la interacción y el éxito de la redirección
CREATE TABLE eventos_interaccion (
    id BIGSERIAL PRIMARY KEY,
    sesion_id UUID REFERENCES sesiones_web(id), -- Conecta con la sesión actual
    tipo_evento TEXT NOT NULL, -- 'click_steam', 'click_video', 'click_menu'
    nombre_elemento TEXT, -- ID del botón o video
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ESTADÍSTICAS DE VIDEO
-- Para analizar el rendimiento del tráiler o gameplays
CREATE TABLE metricas_video (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    video_id TEXT NOT NULL,
    estado_reproduccion TEXT, -- 'inicio', '25%', '50%', '75%', 'completado'
    user_id UUID REFERENCES registros_beta(id) ON DELETE SET NULL, -- Opcional si está logueado
    fecha_evento TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. USUARIOS DEL JUEGO (Gente que ya juega)
-- Esta tabla se sincroniza cuando el .exe envía datos
CREATE TABLE estadisticas_jugadores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email TEXT REFERENCES registros_beta(email),
    nivel_actual INTEGER DEFAULT 1,
    horas_jugadas FLOAT DEFAULT 0,
    ultima_conexion TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES PARA MEJORAR RENDIMIENTO
-- =====================================================

-- Índices para búsquedas frecuentes
CREATE INDEX idx_registros_beta_email ON registros_beta(email);
CREATE INDEX idx_registros_beta_fecha ON registros_beta(fecha_registro DESC);

CREATE INDEX idx_sesiones_visitor ON sesiones_web(visitor_id);
CREATE INDEX idx_sesiones_fecha ON sesiones_web(fecha_inicio DESC);
CREATE INDEX idx_sesiones_dispositivo ON sesiones_web(dispositivo);

CREATE INDEX idx_eventos_sesion ON eventos_interaccion(sesion_id);
CREATE INDEX idx_eventos_tipo ON eventos_interaccion(tipo_evento);
CREATE INDEX idx_eventos_timestamp ON eventos_interaccion(timestamp DESC);

CREATE INDEX idx_metricas_video_id ON metricas_video(video_id);
CREATE INDEX idx_metricas_fecha ON metricas_video(fecha_evento DESC);

CREATE INDEX idx_jugadores_email ON estadisticas_jugadores(user_email);
CREATE INDEX idx_jugadores_ultima ON estadisticas_jugadores(ultima_conexion DESC);

-- =====================================================
-- POLÍTICAS RLS (Row Level Security)
-- =====================================================

-- Habilitar RLS
ALTER TABLE registros_beta ENABLE ROW LEVEL SECURITY;
ALTER TABLE sesiones_web ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos_interaccion ENABLE ROW LEVEL SECURITY;
ALTER TABLE metricas_video ENABLE ROW LEVEL SECURITY;
ALTER TABLE estadisticas_jugadores ENABLE ROW LEVEL SECURITY;

-- Política públicos: cualquiera puede leer (para el dashboard público)
--_policy público de lectura
CREATE POLICY "Permitir lectura pública" ON registros_beta FOR SELECT USING (true);
CREATE POLICY "Permitir lectura públicas" ON sesiones_web FOR SELECT USING (true);
CREATE POLICY "Permitir lectura eventos" ON eventos_interaccion FOR SELECT USING (true);
CREATE POLICY "Permitir lectura videos" ON metricas_video FOR SELECT USING (true);
CREATE POLICY "Permitir lectura jugadores" ON estadisticas_jugadores FOR SELECT USING (true);

-- Políticas de inserción (匿名 puede registrarse/enviar datos)
-- policy de inserción por defecto
CREATE POLICY "Permitir inserción anonima" ON registros_beta FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserción sesion" ON sesiones_web FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir insertion evento" ON eventos_interaccion FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir insertion video" ON metricas_video FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir insertion jugador" ON estadisticas_jugadores FOR INSERT WITH CHECK (true);

-- =====================================================
-- FUNCIONES ÚTILES
-- =====================================================

-- Función para obtener estadísticas rápidas
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS TABLE (
    total_registros BIGINT,
    total_sesiones BIGINT,
    total_clicks BIGINT,
    total_videos BIGINT,
    total_jugadores BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (SELECT COUNT(*) FROM registros_beta)::BIGINT,
        (SELECT COUNT(*) FROM sesiones_web)::BIGINT,
        (SELECT COUNT(*) FROM eventos_interaccion)::BIGINT,
        (SELECT COUNT(*) FROM metricas_video)::BIGINT,
        (SELECT COUNT(*) FROM estadisticas_jugadores)::BIGINT;
END;
$$ LANGUAGE plpgsql;

-- Función para limpiar sesiones antiguas (más de 90 días)
CREATE OR REPLACE FUNCTION cleanup_old_sesiones()
RETURNS void AS $$
BEGIN
    DELETE FROM sesiones_web 
    WHERE fecha_inicio < NOW() - INTERVAL '90 days';
    
    DELETE FROM eventos_interaccion 
    WHERE timestamp < NOW() - INTERVAL '90 days';
    
    DELETE FROM metricas_video 
    WHERE fecha_evento < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;