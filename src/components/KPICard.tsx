import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'; // Trend icons

interface KPICardProps {
  title: string;
  value: string | number;
  description?: string; // e.g., "+20.1% from last month" or "vs. previous period"
  icon?: React.ElementType;
  trend?: 'up' | 'down' | 'neutral';
  trendDescription?: string; // Specific text for the trend, overrides default icon text
  className?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendDescription,
  className,
}) => {
  console.log("Rendering KPICard component with title:", title);

  const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus;
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-muted-foreground';

  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground pt-1">{description}</p>
        )}
        {trend && (trendDescription || description) && ( // Show trend if trend is set and either trendDescription or general description exists
          <div className={cn("text-xs flex items-center mt-1", trendColor)}>
            <TrendIcon className="h-3 w-3 mr-1" />
            {trendDescription || (trend === 'up' ? 'Increased' : trend === 'down' ? 'Decreased' : 'Neutral')}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KPICard;