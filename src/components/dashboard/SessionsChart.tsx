'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area 
} from 'recharts';

// Paleta de colores coherente - Tema Desértico de Dune
const COLORS = {
  primary: '#f59e0b',      // Ámbar/Dorado principal
  secondary: '#d97706',   // Ámbar oscuro
  accent: '#fbbf24',      // Ámbar claro
  teal: '#14b8a6',        // Turquesa
  violet: '#8b5cf6',      // Violeta
  emerald: '#10b981',    // Esmeralda
  slate: '#64748b',      // Gris azulado
  amber: {
    light: '#fef3c7',
    DEFAULT: '#f59e0b',
    dark: '#b45309'
  }
};

const CHART_COLORS = [COLORS.primary, COLORS.teal, COLORS.violet, COLORS.emerald, COLORS.slate];

interface SessionsChartProps {
  data: { fecha: string; count: number }[];
}

export function SessionsChart({ data }: SessionsChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    fecha: new Date(item.fecha).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })
  }));

  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="h-[320px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData} margin={{ top: 20, right: 30, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.4}/>
              <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis 
            dataKey="fecha" 
            tick={{ fontSize: 11, fill: '#6b7280' }} 
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 11, fill: '#6b7280' }} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              fontSize: '12px'
            }}
            formatter={(value) => [`${value}`, 'Sesiones']}
          />
          <Area 
            type="monotone"
            dataKey="count" 
            stroke={COLORS.primary} 
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorSessions)" 
            name="Sesiones"
            dot={{ fill: COLORS.primary, strokeWidth: 2, r: 5, stroke: 'white' }}
            activeDot={{ r: 7, strokeWidth: 0, fill: COLORS.primary }}
          />
        </AreaChart>
      </ResponsiveContainer>
      {total > 0 && (
        <div className="absolute top-0 right-0 text-right z-10 bg-white/90 dark:bg-zinc-900/90 px-4 py-2 rounded-xl">
          <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">{total}</p>
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total</p>
        </div>
      )}
    </div>
  );
}

interface PieChartProps {
  data: { name: string; value: number }[];
  colors?: string[];
  title?: string;
}

export function DistributionChart({ data, colors = CHART_COLORS, title }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const formattedData = data.map(item => ({
    name: item.name,
    value: item.value,
    percentage: total > 0 ? ((item.value / total) * 100).toFixed(1) : '0'
  }));

  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
            strokeWidth={0}
          >
            {formattedData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              fontSize: '12px'
            }}
            formatter={(value, name, props) => [
              `${value} (${(props?.payload?.percentage || '0')}%)`, 
              name
            ]}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => (
              <span className="text-zinc-700 dark:text-zinc-300 text-sm font-medium">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

interface BarHorizontalProps {
  data: { name: string; value: number }[];
  colors?: string[];
}

export function CategoryChart({ data, colors = CHART_COLORS }: BarHorizontalProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const dataWithPercentage = data.map(item => ({
    ...item,
    percentage: total > 0 ? ((item.value / total) * 100).toFixed(1) : '0'
  }));

  return (
    <div className="h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataWithPercentage} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
          <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <YAxis 
            type="category" 
            dataKey="name" 
            tick={{ fontSize: 11, fill: '#6b7280' }} 
            axisLine={false}
            tickLine={false}
            width={70}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              fontSize: '12px'
            }}
            formatter={(value, name, props) => [
              `${value} (${(props?.payload?.percentage || '0')}%)`, 
              'Total'
            ]}
          />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
            {dataWithPercentage.map((_, index) => (
              <Cell key={`bar-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}