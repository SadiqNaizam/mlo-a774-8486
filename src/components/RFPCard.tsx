import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export type RFPStatus = 'Draft' | 'In Progress' | 'Submitted' | 'Won' | 'Lost' | 'Archived';

interface RFPCardProps {
  id: string;
  title: string;
  clientName: string;
  dueDate: string; // Expecting a formatted date string like "2024-08-15"
  status: RFPStatus;
}

// Helper to map status to Badge variant
const getStatusVariant = (status: RFPStatus): React.ComponentProps<typeof Badge>['variant'] => {
  switch (status) {
    case 'Lost':
    case 'Archived':
      return 'destructive';
    case 'In Progress':
      return 'secondary';
    case 'Submitted':
      return 'default';
    case 'Draft':
      return 'outline';
    case 'Won':
      return 'default'; // We'll add a custom class for 'Won'
    default:
      return 'outline';
  }
};

const RFPCard: React.FC<RFPCardProps> = ({ id, title, clientName, dueDate, status }) => {
  console.log(`RFPCard loaded for: ${title}`);

  return (
    <Link to="/r-f-p-detail" state={{ rfpId: id }} className="block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
      <Card className="hover:shadow-md hover:border-primary/50 transition-all duration-200 cursor-pointer bg-card">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base font-semibold leading-tight pr-2">
              {title}
            </CardTitle>
            <Badge 
              variant={getStatusVariant(status)}
              className={cn(
                "whitespace-nowrap shrink-0", 
                status === 'Won' && 'bg-green-600/20 text-green-700 border-green-600/30 hover:bg-green-600/30 dark:text-green-300'
              )}
            >
              {status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{clientName}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
              <span>Due: {dueDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RFPCard;