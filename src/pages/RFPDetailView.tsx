import React from 'react';
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Trash2, History } from 'lucide-react';

// Mock data to simulate a real RFP
const rfpData = {
  title: "AlphaCorp Integration Platform",
  client: "AlphaCorp",
  status: "In Progress",
  value: 250000,
  dueDate: "2024-12-15",
  submittedBy: "Jane Doe",
  description: "A comprehensive RFP for developing and implementing a new enterprise integration platform for AlphaCorp. The solution should be scalable, secure, and support both cloud and on-premise endpoints.",
  notes: "Initial discovery call completed. Client is particularly interested in our real-time data processing capabilities. Follow-up meeting scheduled for next week to demo the prototype.",
};

const documents = [
  { id: 1, name: "RFP_Official_Document.pdf", type: "PDF", size: "2.5 MB", uploaded: "2024-10-15" },
  { id: 2, name: "Technical_Specifications_v1.docx", type: "Word", size: "1.2 MB", uploaded: "2024-10-16" },
  { id: 3, name: "Pricing_Proposal_Draft.xlsx", type: "Excel", size: "750 KB", uploaded: "2024-10-20" },
];

const activityLog = [
  { id: 1, user: "John Smith", action: "created the RFP.", timestamp: "2024-10-15 09:30 AM" },
  { id: 2, user: "Jane Doe", action: "updated status to 'In Progress'.", timestamp: "2024-10-16 02:00 PM" },
  { id: 3, user: "Jane Doe", action: "added a note.", timestamp: "2024-10-22 11:15 AM" },
  { id: 4, user: "Admin", action: "assigned RFP to the Sales Engineering team.", timestamp: "2024-10-23 04:45 PM" },
];

const RFPDetailView = () => {
  console.log('RFP Detail View Page loaded');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 flex-1">
        <Header />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold tracking-tight">{rfpData.title}</h1>
            <Badge variant={rfpData.status === 'In Progress' ? 'secondary' : 'default'}>
              {rfpData.status}
            </Badge>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="activity">Activity History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>RFP Information</CardTitle>
                  <CardDescription>View and edit the core details of this RFP. Click save when you're done.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">RFP Title</Label>
                      <Input id="title" defaultValue={rfpData.title} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client">Client</Label>
                      <Input id="client" defaultValue={rfpData.client} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select defaultValue={rfpData.status.toLowerCase().replace(' ', '-')}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="submitted">Submitted</SelectItem>
                          <SelectItem value="won">Won</SelectItem>
                          <SelectItem value="lost">Lost</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="value">Value ($)</Label>
                       <Input id="value" type="number" defaultValue={rfpData.value} />
                    </div>
                     <div className="space-y-2">
                       <Label htmlFor="due-date">Due Date</Label>
                       <Input id="due-date" type="date" defaultValue={rfpData.dueDate} />
                    </div>
                     <div className="space-y-2">
                       <Label htmlFor="submitted-by">Submitted By</Label>
                       <Input id="submitted-by" defaultValue={rfpData.submittedBy} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" rows={4} defaultValue={rfpData.description} />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="notes">Internal Notes</Label>
                    <Textarea id="notes" rows={4} placeholder="Add internal notes here..." defaultValue={rfpData.notes} />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Associated Documents</CardTitle>
                    <CardDescription>Manage all documents related to this RFP.</CardDescription>
                  </div>
                   <Button>Upload Document</Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Filename</TableHead>
                        <TableHead className="hidden md:table-cell">Size</TableHead>
                        <TableHead className="hidden sm:table-cell">Uploaded Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span>{doc.name}</span>
                            </div>
                           </TableCell>
                          <TableCell className="hidden md:table-cell">{doc.size}</TableCell>
                          <TableCell className="hidden sm:table-cell">{doc.uploaded}</TableCell>
                          <TableCell className="text-right">
                             <Button variant="ghost" size="icon">
                               <Download className="h-4 w-4" />
                             </Button>
                             <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                               <Trash2 className="h-4 w-4" />
                             </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Activity History</CardTitle>
                  <CardDescription>A log of all significant events related to this RFP.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {activityLog.map((log) => (
                      <li key={log.id} className="flex items-start gap-4">
                        <div className="bg-primary-foreground rounded-full p-2 border">
                           <History className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm">
                            <span className="font-semibold">{log.user}</span> {log.action}
                          </p>
                          <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
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

export default RFPDetailView;