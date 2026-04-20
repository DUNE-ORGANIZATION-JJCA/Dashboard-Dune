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
  Legend 
} from 'recharts';

interface SessionsChartProps {
  data: { fecha: string; count: number }[];
}

const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444'];

export function SessionsChart({ data }: SessionsChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    fecha: new Date(item.fecha).toLocaleDateString('es-ES', { weekday: 'short' })
  }));

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="fecha" 
            tick={{ fontSize: 12 }} 
            stroke="#6b7280"
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            stroke="#6b7280"
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Bar 
            dataKey="count" 
            fill="#f59e0b" 
            radius={[4, 4, 0, 0]} 
            name="Sesiones"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface PieChartProps {
  data: { name: string; value: number }[];
  colors?: string[];
}

export function DistributionChart({ data, colors = COLORS }: PieChartProps) {
  const formattedData = data.map(item => ({
    name: item.name,
    value: item.value
  }));

  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {formattedData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}