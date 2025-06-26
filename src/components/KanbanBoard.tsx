import React, { useState } from 'react';
import RFPCard from '@/components/RFPCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Define the structure for an RFP item
type RFP = {
  id: string;
  title: string;
  clientName: string;
  dueDate: string;
  status: 'New' | 'In Progress' | 'Submitted' | 'Archived';
};

// Define the structure for a Kanban column
type Column = {
  id: 'new' | 'inProgress' | 'submitted' | 'archived';
  title: string;
  rfps: RFP[];
};

// Initial mock data for the board
const initialColumns: Record<string, Column> = {
  'new': {
    id: 'new',
    title: 'New',
    rfps: [
      { id: 'rfp-1', title: 'Q3 Enterprise Software Overhaul', clientName: 'Innovate Corp', dueDate: '2024-09-15', status: 'New' },
      { id: 'rfp-2', title: 'Global Logistics Network RFP', clientName: 'Global-Trans', dueDate: '2024-09-20', status: 'New' },
    ],
  },
  'inProgress': {
    id: 'inProgress',
    title: 'In Progress',
    rfps: [
      { id: 'rfp-3', title: 'AlphaCorp Integration Project', clientName: 'AlphaCorp', dueDate: '2024-08-30', status: 'In Progress' },
    ],
  },
  'submitted': {
    id: 'submitted',
    title: 'Submitted',
    rfps: [
      { id: 'rfp-4', title: 'Data Center Security Proposal', clientName: 'SecureData Inc.', dueDate: '2024-08-10', status: 'Submitted' },
    ],
  },
  'archived': {
    id: 'archived',
    title: 'Archived',
    rfps: [
      { id: 'rfp-5', title: 'Legacy System Maintenance', clientName: 'Tech Solutions', dueDate: '2024-05-20', status: 'Archived' },
    ]
  }
};

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Record<string, Column>>(initialColumns);
  const [draggedItem, setDraggedItem] = useState<RFP | null>(null);
  const [sourceColumnId, setSourceColumnId] = useState<string | null>(null);

  console.log('KanbanBoard loaded');

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, rfp: RFP, colId: string) => {
    setDraggedItem(rfp);
    setSourceColumnId(colId);
    // Use dataTransfer to enable dragging in some browsers, although state is the primary mechanism here
    e.dataTransfer.setData('text/plain', rfp.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // This is necessary to allow a drop
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColId: string) => {
    e.preventDefault();
    if (!draggedItem || !sourceColumnId || targetColId === sourceColumnId) {
      return;
    }

    // Update the state
    setColumns(prevColumns => {
      const newColumns = { ...prevColumns };
      
      // Remove from source column
      const sourceCol = { ...newColumns[sourceColumnId] };
      sourceCol.rfps = sourceCol.rfps.filter(rfp => rfp.id !== draggedItem.id);
      newColumns[sourceColumnId] = sourceCol;
      
      // Add to target column and update status
      const targetCol = { ...newColumns[targetColId] };
      const updatedRfp = { ...draggedItem, status: targetCol.title as RFP['status'] };
      targetCol.rfps = [...targetCol.rfps, updatedRfp];
      newColumns[targetColId] = targetCol;

      return newColumns;
    });

    // Reset drag state
    setDraggedItem(null);
    setSourceColumnId(null);
  };
  
  return (
    <div className="flex gap-6 p-4 overflow-x-auto h-full bg-gray-50/50">
      {Object.values(columns).map((column) => (
        <div 
          key={column.id} 
          className="w-80 flex-shrink-0"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <Card className="flex flex-col h-full bg-white">
            <CardHeader className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-md font-semibold">{column.title}</CardTitle>
                <Badge variant="secondary" className="text-sm">{column.rfps.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-2 space-y-4 overflow-y-auto">
              {column.rfps.length > 0 ? (
                column.rfps.map((rfp) => (
                  <div
                    key={rfp.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, rfp, column.id)}
                    className={`cursor-move rounded-lg ${draggedItem?.id === rfp.id ? 'opacity-50' : ''}`}
                  >
                    <RFPCard
                      title={rfp.title}
                      clientName={rfp.clientName}
                      dueDate={rfp.dueDate}
                      status={rfp.status}
                    />
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-24 text-sm text-gray-500 rounded-lg border-2 border-dashed">
                  Drop RFPs here
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;