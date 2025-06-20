import React from 'react';
import { Event } from '@/services/eventService';
import { UserRole } from '@/types/user';
import EventCard from './EventCard';

interface Props {
  eventos: Event[];
  role: UserRole;
  viewMode: 'grid' | 'list';
  onViewDetails: (evento: Event) => void;
  onDelete: (evento: Event) => void;
  onManageEscala: (evento: Event) => void;
}

const EventList: React.FC<Props> = ({ eventos, role, viewMode, onViewDetails, onDelete, onManageEscala }) => {
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map((evento) => (
          <EventCard
            key={evento.id}
            evento={evento}
            role={role}
            variant="grid"
            onViewDetails={onViewDetails}
            onDelete={onDelete}
            onManageEscala={onManageEscala}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {eventos.map((evento) => (
        <EventCard
          key={evento.id}
          evento={evento}
          role={role}
          variant="list"
          onViewDetails={onViewDetails}
          onDelete={onDelete}
          onManageEscala={onManageEscala}
        />
      ))}
    </div>
  );
};

export default EventList; 