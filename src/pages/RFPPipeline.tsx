import React from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, PlusCircle } from 'lucide-react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';
import KanbanBoard from '@/components/KanbanBoard';

// shadcn/ui Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

// Mock data for the table view, reflecting the Kanban data for consistency
const rfpsData = [
  { id: 'rfp-1', title: 'Q3 Enterprise Software Overhaul', clientName: 'Innovate Corp', dueDate: '2024-09-15', status: 'New', assignee: 'Alex Green' },
  { id: 'rfp-2', title: 'Global Logistics Network RFP', clientName: 'Global-Trans', dueDate: '2024-09-20', status: 'New', assignee: 'Samantha Bee' },
  { id: 'rfp-3', title: 'AlphaCorp Integration Project', clientName: 'AlphaCorp', dueDate: '2024-08-30', status: 'In Progress', assignee: 'Marcus Chen' },
  { id: 'rfp-4', title: 'Data Center Security Proposal', clientName: 'SecureData Inc.', dueDate: '2024-08-10', status: 'Submitted', assignee: 'Alex Green' },
  { id: 'rfp-5', title: 'Legacy System Maintenance', clientName: 'Tech Solutions', dueDate: '2024-05-20', status: 'Archived', assignee: 'Unassigned' },
  { id: 'rfp-6', title: 'Cloud Migration Strategy', clientName: 'SkyHigh Inc.', dueDate: '2024-10-01', status: 'In Progress', assignee: 'Samantha Bee' },
];

type RFPStatus = 'New' | 'In Progress' | 'Submitted' | 'Archived' | 'Won' | 'Lost';

// Helper to map status to Badge variant
const getStatusVariant = (status: RFPStatus): React.ComponentProps<typeof Badge>['variant'] => {
  switch (status) {
    case 'Archived':
    case 'Lost':
      return 'destructive';
    case 'In Progress':
      return 'secondary';
    case 'Submitted':
    case 'Won':
      return 'default'; // 'Won' could be styled with custom green in a real app
    case 'New':
    default:
      return 'outline';
  }
};


const RFPPipeline = () => {
  console.log('RFP Pipeline Page loaded');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 flex flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center pt-4">
            <h1 className="text-lg font-semibold md:text-2xl">RFP Pipeline</h1>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add RFP
                </span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="kanban">
            <TabsList>
              <TabsTrigger value="kanban">Kanban</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>

            <TabsContent value="kanban" className="flex-1 -m-4">
              <KanbanBoard />
            </TabsContent>

            <TabsContent value="list">
              <Card>
                <CardHeader>
                  <CardTitle>All RFPs</CardTitle>
                  <CardDescription>
                    A sortable list of all active and archived proposals.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">Client</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Due Date</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rfpsData.map((rfp) => (
                        <TableRow key={rfp.id}>
                          <TableCell className="font-medium">{rfp.title}</TableCell>
                          <TableCell className="hidden md:table-cell">{rfp.clientName}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(rfp.status as RFPStatus)}>
                              {rfp.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{rfp.dueDate}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <Link to="/r-f-p-detail" state={{ rfpId: rfp.id }}>
                                   <DropdownMenuItem>View Details</DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Archive</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default RFPPipeline;