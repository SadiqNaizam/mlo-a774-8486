import React from 'react';
import { motion } from 'framer-motion';
import {
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Define props for the generic animated chart component
interface AnimatedChartProps {
  chartType: 'bar' | 'pie';
  data: any[];
  config: ChartConfig;
  title: string;
  description: string;
  className?: string;
  // The key from the data array to be used for the main value.
  dataKey: string;
  // For bar charts: the key for the x-axis labels.
  categoryKey?: string;
  // For pie charts: the key for the segment names.
  nameKey?: string;
}

const PIE_COLORS = ['#0ea5e9', '#f97316', '#10b981', '#8b5cf6', '#eab308', '#ec4899'];

const AnimatedChart: React.FC<AnimatedChartProps> = ({
  chartType,
  data,
  config,
  title,
  description,
  className,
  dataKey,
  categoryKey,
  nameKey,
}) => {
  console.log('AnimatedChart loaded:', title);

  const renderBarChart = () => {
    if (!categoryKey) {
        console.error("Bar chart requires a 'categoryKey' prop.");
        return <div>Error: Bar chart is missing the 'categoryKey'.</div>;
    }
    return (
        <BarChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey={categoryKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey={dataKey}
              radius={8}
              // This prop animates the bars growing into place
              animationDuration={900}
            />
        </BarChart>
    );
  };

  const renderPieChart = () => {
    if (!nameKey) {
        console.error("Pie chart requires a 'nameKey' prop.");
        return <div>Error: Pie chart is missing the 'nameKey'.</div>;
    }
    return (
        <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              outerRadius={100}
              paddingAngle={2}
              // These props create the "fanning out" animation
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey={nameKey} />} />
        </PieChart>
    );
  };

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={config} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? renderBarChart() : renderPieChart()}
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnimatedChart;