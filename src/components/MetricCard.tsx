import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { type LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  linkTo: string;
  description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, linkTo, description }) => {
  console.log('MetricCard loaded for:', title);

  return (
    <Link to={linkTo} className="block group">
      <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {description && (
            <p className="text-xs text-muted-foreground pt-1">
              {description}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default MetricCard;