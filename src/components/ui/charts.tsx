
import * as React from "react";
import {
  Bar,
  Line,
  Pie,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "./chart";

interface ChartProps {
  data: any;
  className?: string;
}

const customColors = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
];

export const BarChart = ({ data, className }: ChartProps) => {
  return (
    <ChartContainer className={className} config={{}}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data.labels.map((label: string, i: number) => ({
          name: label,
          value: data.datasets[0].data[i],
        }))}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar
            dataKey="value"
            name={data.datasets[0].label}
            fill={data.datasets[0].backgroundColor || customColors[0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export const LineChart = ({ data, className }: ChartProps) => {
  return (
    <ChartContainer className={className} config={{}}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data.labels.map((label: string, i: number) => ({
            name: label,
            value: data.datasets[0].data[i],
          }))}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            name={data.datasets[0].label}
            stroke={data.datasets[0].borderColor || customColors[0]}
            fill={data.datasets[0].backgroundColor || "transparent"}
            activeDot={{ r: 8 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export const PieChart = ({ data, className }: ChartProps) => {
  return (
    <ChartContainer className={className} config={{}}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Pie
            data={data.labels.map((label: string, i: number) => ({
              name: label,
              value: data.datasets[0].data[i],
            }))}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            name={data.datasets[0].label || "Data"}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.labels.map((_: any, index: number) => (
              <Cell 
                key={`cell-${index}`} 
                fill={data.datasets[0].backgroundColor?.[index] || customColors[index % customColors.length]} 
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
