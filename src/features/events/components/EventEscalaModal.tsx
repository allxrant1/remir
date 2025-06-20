import { Event } from '@/services/eventService';
import { useEventParticipants, useAddParticipants, useRemoveParticipant } from '@/features/events/hooks/useParticipants';
import { useMinistryMembers } from '@/features/events/hooks/useMinistryMembers';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Props {
  event: Event;
  open: boolean;
  onClose: () => void;
  isLeader: boolean;
}

export default function EventEscalaModal({ event, open, onClose, isLeader }: Props) {
  if (!open || !event) return null;

  const { toast } = useToast();
  const { user } = useAuth();
  const { data: participants = [], isLoading } = useEventParticipants(event.id);
  const { data: members = [] } = useMinistryMembers((event as any).ministry_id || '');
  const addMutation = useAddParticipants();
  const removeMutation = useRemoveParticipant();

  const [selectedUsers, setSelectedUsers] = useState<{ user_id: string }[]>([]);

  const available = Array.from(
    new Map(
      members
        .filter(m => m.id !== user?.id)
        .filter(m => !participants.some(p => p.user_id === m.id))
        .map(m => [m.id, m])
    ).values()
  );

  const handleAdd = async () => {
    if (selectedUsers.length === 0) return;
    await addMutation.mutateAsync({ eventId: event.id, participants: selectedUsers });
    setSelectedUsers([]);
    toast({ title: 'Convites enviados' });
  };

  const handleRemove = async (partId: string) => {
    await removeMutation.mutateAsync({ id: partId, eventId: event.id });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-800 rounded-xl p-6 w-full max-w-xl mx-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Users className="w-5 h-5" /> Escala – {event.titulo}
            </h3>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white bg-transparent hover:bg-transparent">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {isLoading ? (
            <p className="text-gray-300">Carregando...</p>
          ) : (
            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1">
              {participants.map((p) => {
                const mem = members.find(m => m.id === p.user_id);
                const display = mem?.name ?? p.user_id;
                return (
                  <Card key={p.id} className="bg-white/5 border-white/10">
                    <CardContent className="p-3 flex justify-between items-center">
                      <span className="text-gray-100 text-sm">{display} – {p.role}</span>
                      {isLeader && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(p.id)}
                          className="text-red-400 hover:bg-red-500/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
              {participants.length === 0 && <p className="text-gray-400 text-sm">Nenhum participante.</p>}
            </div>
          )}

          {isLeader && (
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose} className="text-gray-200 border-white/20 bg-transparent hover:bg-white/10">Fechar</Button>
              <Button onClick={handleAdd} disabled={addMutation.isPending || selectedUsers.length === 0}>Enviar Convites</Button>
            </div>
          )}

          {isLeader && (
            <div>
              <h4 className="text-gray-100 font-semibold mb-2">Convidar membros</h4>
              <div className="max-h-40 overflow-y-auto space-y-2 mb-4 pr-1">
                {available.map(mem => {
                  const checked = selectedUsers.some(s => s.user_id === mem.id);
                  return (
                    <label key={mem.id} className="flex items-center gap-2 text-gray-200 text-sm cursor-pointer hover:bg-white/5 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          setSelectedUsers(prev =>
                            checked
                              ? prev.filter(p => p.user_id !== mem.id)
                              : [...prev, { user_id: mem.id }]
                          );
                        }}
                      />
                      {mem.name || mem.id}
                    </label>
                  )
                })}
                {available.length === 0 && <p className="text-gray-400 text-sm">Todos os membros já convidados.</p>}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 