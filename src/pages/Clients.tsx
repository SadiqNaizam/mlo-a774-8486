import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';
import { MoreHorizontal, PlusCircle, Pencil, Trash2 } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  avatarUrl: string;
  avatarFallback: string;
  rfpCount: number;
}

const sampleClients: Client[] = [
  { id: 'cli_1', name: 'Elena Rodriguez', company: 'Quantum Solutions', email: 'elena.r@quantum.dev', avatarUrl: 'https://i.pravatar.cc/150?u=elena', avatarFallback: 'ER', rfpCount: 5 },
  { id: 'cli_2', name: 'Marcus Chen', company: 'Apex Innovations', email: 'm.chen@apexinnovate.com', avatarUrl: 'https://i.pravatar.cc/150?u=marcus', avatarFallback: 'MC', rfpCount: 3 },
  { id: 'cli_3', name: 'Sophia Loren', company: 'Starlight Enterprises', email: 'sophia@starlight.io', avatarUrl: 'https://i.pravatar.cc/150?u=sophia', avatarFallback: 'SL', rfpCount: 8 },
  { id: 'cli_4', name: 'David Lee', company: 'Nexus Dynamics', email: 'david.lee@nexus.tech', avatarUrl: 'https://i.pravatar.cc/150?u=david', avatarFallback: 'DL', rfpCount: 2 },
  { id: 'cli_5', name: 'Isabella Garcia', company: 'Synergy Corp', email: 'isabella.g@synergy.org', avatarUrl: 'https://i.pravatar.cc/150?u=isabella', avatarFallback: 'IG', rfpCount: 12 },
];

const Clients: React.FC = () => {
  console.log('Clients page loaded');
  const [clients, setClients] = useState<Client[]>(sampleClients);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // In a real app, these would be form state and handlers
  const handleSaveClient = () => {
    // Logic to save new/edited client
    console.log("Saving client...");
    setIsDialogOpen(false); // Close dialog on save
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8 flex flex-col">
          <div className="flex items-center pt-4">
            <h1 className="text-lg font-semibold md:text-2xl">Clients</h1>
            <div className="ml-auto flex items-center gap-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Client
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Client</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new client. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" placeholder="e.g., Jane Doe" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="company" className="text-right">
                        Company
                      </Label>
                      <Input id="company" placeholder="e.g., Acme Inc." className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input id="email" type="email" placeholder="e.g., jane.doe@acme.com" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleSaveClient}>Save Client</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="mt-4 border shadow-sm rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Avatar</TableHead>
                  <TableHead>Contact Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-center">RFPs</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={client.avatarUrl} alt={client.name} />
                        <AvatarFallback>{client.avatarFallback}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.company}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell className="text-center">{client.rfpCount}</TableCell>
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
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Clients;