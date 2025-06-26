import React from 'react';
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';
import MetricCard from '@/components/MetricCard';
import AnimatedChart from '@/components/AnimatedChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { type ChartConfig } from "@/components/ui/chart";
import { FileText, Target, CalendarCheck, Clock, CheckCircle } from 'lucide-react';

// Placeholder data for charts
const barChartData = [
  { month: "January", submissions: 18 },
  { month: "February", submissions: 22 },
  { month: "March", submissions: 35 },
  { month: "April", submissions: 27 },
  { month: "May", submissions: 41 },
  { month: "June", submissions: 24 },
];

const barChartConfig = {
  submissions: {
    label: "Submissions",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const pieChartData = [
    { status: 'Won', count: 45, fill: '#10b981' },
    { status: 'In Progress', count: 25, fill: '#f97316' },
    { status: 'Submitted', count: 15, fill: '#0ea5e9' },
    { status: 'Lost', count: 10, fill: '#ef4444' },
    { status: 'On Hold', count: 5, fill: '#eab308' },
];

const pieChartConfig = {
    count: {
        label: "Count",
    },
    won: { label: "Won", color: "hsl(var(--chart-2))" },
    inProgress: { label: "In Progress", color: "hsl(var(--chart-3))" },
    submitted: { label: "Submitted", color: "hsl(var(--chart-1))" },
    lost: { label: "Lost", color: "hsl(var(--chart-5))" },
    onHold: { label: "On Hold", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

const Dashboard = () => {
  console.log('Dashboard page loaded');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 overflow-auto">
          <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h1>
            
            {/* Metric Cards Section */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <MetricCard
                title="Active RFPs"
                value="12"
                icon={FileText}
                linkTo="/r-f-p-pipeline"
                description="Currently in progress"
              />
              <MetricCard
                title="Success Rate"
                value="78%"
                icon={Target}
                linkTo="/analytics"
                description="+5% from last month"
              />
              <MetricCard
                title="Submitted This Month"
                value="24"
                icon={CheckCircle}
                linkTo="/analytics"
                description="On track to meet goal"
              />
              <MetricCard
                title="Upcoming Deadlines"
                value="3"
                icon={Clock}
                linkTo="/r-f-p-pipeline"
                description="Within the next 7 days"
              />
            </section>

            {/* Charts Section */}
            <section className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                <div className="lg:col-span-3">
                    <AnimatedChart
                        chartType="bar"
                        data={barChartData}
                        config={barChartConfig}
                        title="Monthly RFP Submissions"
                        description="Tracking submission volume over the last 6 months."
                        dataKey="submissions"
                        categoryKey="month"
                        className="h-full"
                    />
                </div>
                <div className="lg:col-span-2">
                    <AnimatedChart
                        chartType="pie"
                        data={pieChartData}
                        config={pieChartConfig}
                        title="RFP Status Distribution"
                        description="A breakdown of all proposals by their current status."
                        dataKey="count"
                        nameKey="status"
                        className="h-full"
                    />
                </div>
            </section>

          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;