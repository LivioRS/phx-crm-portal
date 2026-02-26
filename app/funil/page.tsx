'use client';

import * as React from 'react';
import { 
  Filter, 
  ArrowRight, 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Search,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

import { 
  DragDropContext, 
  Droppable, 
  Draggable,
  DropResult
} from '@hello-pangea/dnd';

const initialStages = [
  { 
    id: 'identificacao', 
    name: 'Identificação', 
    color: 'bg-slate-100 text-slate-700',
    clients: [
      { id: 'c1', name: 'TechSolutions Group', days: 172, value: 'R$ 12.4k' },
      { id: 'c2', name: 'Logística Express', days: 155, value: 'R$ 8.2k' }
    ]
  },
  { 
    id: 'contato', 
    name: 'Primeiro Contato', 
    color: 'bg-blue-50 text-blue-700',
    clients: [
      { id: 'c3', name: 'Nova Varejo S.A.', days: 98, value: 'R$ 45.9k' },
      { id: 'c4', name: 'Metalúrgica Central', days: 112, value: 'R$ 15.6k' }
    ]
  },
  { 
    id: 'proposta', 
    name: 'Proposta Enviada', 
    color: 'bg-amber-50 text-amber-700',
    clients: [
      { id: 'c5', name: 'Distribuidora Norte', days: 140, value: 'R$ 22.1k' }
    ]
  },
  { 
    id: 'negociacao', 
    name: 'Em Negociação', 
    color: 'bg-purple-50 text-purple-700',
    clients: [
      { id: 'c6', name: 'Comércio Sul Ltda', days: 125, value: 'R$ 31.4k' }
    ]
  },
  { 
    id: 'recuperado', 
    name: 'Recuperado', 
    color: 'bg-emerald-50 text-emerald-700',
    clients: [
      { id: 'c7', name: 'Weg Motores S.A.', days: 10, value: 'R$ 3.1M' }
    ]
  },
];

export default function FunilPage() {
  const [stages, setStages] = React.useState(initialStages);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) return;

    // Dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceStageIndex = stages.findIndex(s => s.id === source.droppableId);
    const destStageIndex = stages.findIndex(s => s.id === destination.droppableId);

    const newStages = [...stages];
    const sourceClients = [...newStages[sourceStageIndex].clients];
    const destClients = source.droppableId === destination.droppableId 
      ? sourceClients 
      : [...newStages[destStageIndex].clients];

    const [removed] = sourceClients.splice(source.index, 1);
    destClients.splice(destination.index, 0, removed);

    newStages[sourceStageIndex] = {
      ...newStages[sourceStageIndex],
      clients: sourceClients
    };

    if (source.droppableId !== destination.droppableId) {
      newStages[destStageIndex] = {
        ...newStages[destStageIndex],
        clients: destClients
      };
    }

    setStages(newStages);
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto px-6 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Funil de Recuperação</h1>
          <p className="text-sm text-slate-500">Acompanhe o progresso da reativação de clientes inativos</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20">
            <Plus size={18} />
            Nova Oportunidade
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-full">
          {stages.map((stage) => (
            <div key={stage.id} className="flex flex-col gap-4">
              <div className={cn(
                "p-3 rounded-xl border border-slate-200 flex items-center justify-between",
                stage.color
              )}>
                <span className="text-xs font-bold uppercase tracking-wider">{stage.name}</span>
                <span className="bg-white/50 px-2 py-0.5 rounded text-[10px] font-bold">{stage.clients.length}</span>
              </div>
              
              <Droppable droppableId={stage.id}>
                {(provided, snapshot) => (
                  <div 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={cn(
                      "flex-1 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 p-3 space-y-3 min-h-[500px] transition-colors",
                      snapshot.isDraggingOver && "bg-blue-50/50 border-blue-200"
                    )}
                  >
                    {stage.clients.map((client, i) => (
                      <Draggable key={client.id} draggableId={client.id} index={i}>
                        {(provided, snapshot) => (
                          <div 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={cn(
                              "bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 cursor-pointer transition-all group",
                              snapshot.isDragging && "shadow-xl ring-2 ring-blue-500/20 border-blue-500"
                            )}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{client.name}</h4>
                              <MoreVertical size={14} className="text-slate-400" />
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              <span>{client.days} Dias</span>
                              <span className="text-slate-900">{client.value}</span>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                              <div className="flex -space-x-1.5">
                                <div className="w-5 h-5 rounded-full bg-slate-100 border border-white"></div>
                                <div className="w-5 h-5 rounded-full bg-slate-200 border border-white"></div>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Phone size={12} className="text-slate-400 hover:text-blue-600" />
                                <Mail size={12} className="text-slate-400 hover:text-blue-600" />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    
                    <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                      <Plus size={16} />
                      <span className="text-xs font-bold uppercase">Adicionar</span>
                    </button>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
