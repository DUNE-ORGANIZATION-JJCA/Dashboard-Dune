# Dashboard Dune - Arrakis Dominion

Dashboard de analytics para el juego Dune: Arrakis Dominion. Conecta con tu base de datos de Supabase y muestra métricas en tiempo real.

## 🚀 Quick Start

### 1. Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ve al **SQL Editor** y ejecuta el script en `supabase/schema.sql`
3. En **Settings → API**, copia:
   - **Project URL**
   - **anon public** key

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

### 3. Ejecutar localmente

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### 4. Desplegar en Vercel

```bash
# Opción 1: CLI de Vercel
npm i -g vercel
vercel

# Opción 2: GitHub
git add .
git commit -m "feat: dashboard setup"
git push origin main

# Luego conecta el repositorio en vercel.com
```

## 📊 Tablas del Dashboard

| Tabla | Descripción |
|-------|-------------|
| `registros_beta` | Usuarios interesados en la beta |
| `sesiones_web` | Visitas a la página web |
| `eventos_interaccion` | Clics (Steam, videos, menú) |
| `metricas_video` | Reproducciones de vídeos |
| `estadisticas_jugadores` | Stats de jugadores del juego |

## 🛠️ Tecnologías

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Base de datos + Auth)
- **Recharts** (Gráficos)

## 📁 Estructura

```
src/
├── app/              # Páginas Next.js
├── components/       # Componentes React
│   └── dashboard/    # Componentes del dashboard
├── lib/supabase/     # Cliente y queries de Supabase
└── types/            # Tipos TypeScript
```

## 📝 Licencia

MIT