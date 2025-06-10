import React from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Example Data Structure - adjust based on actual needs
interface ChartDataItem {
  name: string; // Typically X-axis label (e.g., date, category)
  value1?: number; // Y-axis value for first series
  value2?: number; // Y-axis value for second series
  // Add more values as needed
  [key: string]: string | number | undefined;
}

interface SeriesConfig {
    dataKey: string; // key in ChartDataItem
    stroke?: string; // color for line
    fill?: string; // color for bar
    name?: string; // name for legend
}

interface InteractiveDataChartProps {
  data: ChartDataItem[];
  series: SeriesConfig[]; // Configuration for lines/bars
  chartType?: 'line' | 'bar';
  title?: string;
  description?: string;
  xAxisDataKey?: string; // Default to 'name' if not provided
  className?: string;
  aspectRatio?: number; // e.g. 16/9 or 3/1
}

const InteractiveDataChart: React.FC<InteractiveDataChartProps> = ({
  data,
  series,
  chartType = 'line',
  title,
  description,
  xAxisDataKey = 'name',
  className,
  aspectRatio = 16/9,
}) => {
  console.log(`Rendering InteractiveDataChart component with title: ${title}, type: ${chartType}, data length: ${data.length}`);

  if (!data || data.length === 0) {
    return (
      <Card className={cn("flex items-center justify-center h-[300px]", className)}>
        <p className="text-muted-foreground">No data available for the chart.</p>
      </Card>
    );
  }

  const ChartComponent = chartType === 'line' ? LineChart : BarChart;

  return (
    <Card className={cn(className)}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" aspect={aspectRatio}>
          <ChartComponent data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}> {/* Adjusted left margin */}
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey={xAxisDataKey} tick={{ fontSize: 12 }} stroke="#888888" />
            <YAxis tick={{ fontSize: 12 }} stroke="#888888" />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
              cursor={{ fill: 'hsl(var(--muted))', fillOpacity: 0.3 }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            {series.map((s) => (
                chartType === 'line' ? (
                    <Line
                        key={s.dataKey}
                        type="monotone"
                        dataKey={s.dataKey}
                        stroke={s.stroke || '#8884d8'}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                        name={s.name || s.dataKey}
                    />
                ) : (
                    <Bar
                        key={s.dataKey}
                        dataKey={s.dataKey}
                        fill={s.fill || '#82ca9d'}
                        radius={[4, 4, 0, 0]} /* Rounded top corners */
                        name={s.name || s.dataKey}
                    />
                )
            ))}
          </ChartComponent>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default InteractiveDataChart;