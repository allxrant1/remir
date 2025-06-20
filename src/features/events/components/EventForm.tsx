import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateEventDTO } from '@/services/eventService';
import { Button } from '@/components/ui/button';

const EventSchema = z.object({
  titulo: z.string().min(3, 'Título muito curto'),
  tipo: z.enum(['Cultos', 'Ensino', 'Oração', 'Eventos']),
  data: z.string().min(1, 'Data obrigatória'),
  hora: z.string().min(1, 'Hora obrigatória'),
  local: z.string().min(1, 'Local obrigatório'),
  descricao: z.string().min(5, 'Descrição muito curta'),
});

export type EventFormValues = z.infer<typeof EventSchema>;

interface Props {
  onSubmit: (data: CreateEventDTO, ministries: string[]) => Promise<void>;
  onCancel: () => void;
  ministries: { id: string; name: string }[];
}

const EventForm: React.FC<Props> = ({ onSubmit, onCancel, ministries }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(EventSchema),
  });

  const [selectedMinistries, setSelectedMinistries] = useState<string[]>([]);

  const submitHandler = async (values: EventFormValues) => {
    await onSubmit(values, selectedMinistries);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">Nome do Evento</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
            {...register('titulo')}
          />
          {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Tipo</label>
          <select
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
            {...register('tipo')}
          >
            <option value="">Selecione</option>
            <option value="Cultos">Cultos</option>
            <option value="Ensino">Ensino</option>
            <option value="Oração">Oração</option>
            <option value="Eventos">Eventos</option>
          </select>
          {errors.tipo && <p className="text-red-500 text-sm mt-1">{errors.tipo.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Data</label>
          <input type="date" className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white" {...register('data')} />
          {errors.data && <p className="text-red-500 text-sm mt-1">{errors.data.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Hora</label>
          <input type="time" className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white" {...register('hora')} />
          {errors.hora && <p className="text-red-500 text-sm mt-1">{errors.hora.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Local</label>
          <input type="text" className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white" {...register('local')} />
          {errors.local && <p className="text-red-500 text-sm mt-1">{errors.local.message}</p>}
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1">Descrição</label>
          <textarea rows={4} className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white" {...register('descricao')} />
          {errors.descricao && <p className="text-red-500 text-sm mt-1">{errors.descricao.message}</p>}
        </div>
        <div className="col-span-2 mt-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">Ministérios participantes</label>
          <select
            multiple
            value={selectedMinistries}
            onChange={e => setSelectedMinistries(Array.from(e.target.selectedOptions, o => o.value))}
            className="w-full border rounded p-2 bg-gray-700 text-white"
          >
            {ministries.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
          {selectedMinistries.length === 0 && (
            <p className="text-red-500 text-sm mt-1">Selecione pelo menos um ministério.</p>
          )}
        </div>
      </div>
      <div className="mt-8 flex justify-end space-x-3">
        <Button type="button" variant="ghost" onClick={onCancel} className="border border-white/20 text-gray-200 hover:bg-white/10">Cancelar</Button>
        <Button type="submit" disabled={isSubmitting}>Salvar Evento</Button>
      </div>
    </form>
  );
};

export default EventForm; 