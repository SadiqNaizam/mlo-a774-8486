import React from 'react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';

// Custom UI Component
import AnimatedChart from '@/components/AnimatedChart';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartConfig } from '@/components/ui/chart';

// Icons
import { Download } from 'lucide-react';

// --- Placeholder Data and Configs ---

// 1. RFP Status (Pie Chart)
const rfpStatusData = [
  { status: 'Won', count: 42, fill: 'var(--color-won)' },
  { status: 'Lost', count: 18, fill: 'var(--color-lost)' },
  { status: 'In Progress', count: 25, fill: 'var(--color-inProgress)' },
  { status: 'Submitted', count: 35, fill: 'var(--color-submitted)' },
];
const rfpStatusConfig = {
  count: { label: 'Count' },
  won: { label: 'Won', color: 'hsl(var(--chart-1))' },
  lost: { label: 'Lost', color: 'hsl(var(--chart-2))' },
  inProgress: { label: 'In Progress', color: 'hsl(var(--chart-3))' },
  submitted: { label: 'Submitted', color: 'hsl(var(--chart-4))' },
} satisfies ChartConfig;

// 2. Win/Loss by Quarter (Bar Chart)
const winLossData = [
  { quarter: 'Q1', won: 15, lost: 5 },
  { quarter: 'Q2', won: 20, lost: 8 },
  { quarter: 'Q3', won: 18, lost: 10 },
  { quarter: 'Q4', won: 25, lost: 7 },
];
const winLossConfig = {
  won: { label: 'Won', color: 'hsl(var(--chart-1))' },
  lost: { label: 'Lost', color: 'hsl(var(--chart-2))' },
} satisfies ChartConfig;

// 3. Submissions by Team Member (Bar Chart)
const teamPerformanceData = [
  { member: 'Alex', submissions: 30 },
  { member: 'Sarah', submissions: 45 },
  { member: 'Michael', submissions: 28 },
  { member: 'Emily', submissions: 52 },
];
const teamPerformanceConfig = {
  submissions: { label: 'Submissions', color: 'hsl(var(--chart-3))' },
} satisfies ChartConfig;


const Analytics = () => {
  console.log('Analytics page loaded');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Insights into your team's RFP performance.
              </p>
            </div>
            <div className="flex items-center gap-4">
                <Select defaultValue="90">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="90">Last 90 days</SelectItem>
                        <SelectItem value="180">Last 6 months</SelectItem>
                        <SelectItem value="365">Last year</SelectItem>
                    </SelectContent>
                </Select>
                <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Performance Overview</TabsTrigger>
              <TabsTrigger value="productivity">Team Productivity</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <AnimatedChart
                        chartType="pie"
                        data={rfpStatusData}
                        config={rfpStatusConfig}
                        title="RFP Status Distribution"
                        description="A breakdown of all RFPs by their current status."
                        dataKey="count"
                        nameKey="status"
                        className="lg:col-span-1"
                    />
                    <AnimatedChart
                        chartType="bar"
                        data={winLossData}
                        config={winLossConfig}
                        title="Win/Loss Rate by Quarter"
                        description="Comparing wins and losses over the last four quarters."
                        dataKey="won"
                        categoryKey="quarter"
                        className="lg:col-span-2"
                    />
                </div>
            </TabsContent>
             <TabsContent value="productivity" className="mt-4">
                 <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                    <AnimatedChart
                        chartType="bar"
                        data={teamPerformanceData}
                        config={teamPerformanceConfig}
                        title="Submissions by Team Member"
                        description="Total RFP submissions per team member for the selected period."
                        dataKey="submissions"
                        categoryKey="member"
                    />
                    <Card>
                        {/* Placeholder for another chart */}
                         <div className="flex h-full flex-col items-center justify-center p-6">
                            <h3 className="text-lg font-semibold">Future Chart Area</h3>
                            <p className="text-sm text-muted-foreground">More productivity metrics will be displayed here.</p>
                        </div>
                    </Card>
                 </div>
            </TabsContent>
          </Tabs>

        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Analytics;