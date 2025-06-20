import { useState } from "react";
import { Plus, UserPlus, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { eventService, Event, CreateEventDTO } from "@/services/eventService";
import { Loader2 } from "lucide-react";
import { useEventos } from "@/features/events/hooks/useEventos";
import EventList from "@/features/events/components/EventList";
import { useCreateEvento } from "@/features/events/hooks/useCreateEvento";
import { useDeleteEvento } from "@/features/events/hooks/useDeleteEvento";
import EventForm from "@/features/events/components/EventForm";
import { useEventParticipants, useAddParticipants, useRemoveParticipant } from '@/features/events/hooks/useParticipants';
import { useMinistryMembers } from '@/features/events/hooks/useMinistryMembers';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

// Interface para membros escalados
interface Escalado {
  id: string;
  nome: string;
  funcao: string;
  status: 'confirmado' | 'pendente' | 'recusado';
}

// Interface para membros disponíveis para convite
interface MembroDisponivel {
  id: string;
  nome: string;
  funcao: string;
  ministerio: string;
}

// Hook para verificar se o usuário é líder de um dos ministérios do evento
function useIsEventLeader(eventId: string | undefined, userId: string | undefined) {
  return useQuery({
    queryKey: ['is-event-leader', eventId, userId],
    queryFn: async () => {
      if (!eventId || !userId) return false;

      // 1. Obter os ministérios do evento
      const { data: eventMinistries, error: eventMinistriesError } = await supabase
        .from('event_ministries')
        .select('ministry_id')
        .eq('event_id', eventId);
      
      if (eventMinistriesError) {
        console.error('Erro ao buscar ministérios do evento:', eventMinistriesError);
        return false;
      }

      const ministryIds = (eventMinistries || []).map(em => em.ministry_id).filter(Boolean);
      if (ministryIds.length === 0) return false;

      // 2. Verificar se o usuário é líder de algum desses ministérios
      const { count, error: leadershipError } = await supabase
        .from('ministry_members')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('role', 'leader')
        .in('ministry_id', ministryIds);

      if (leadershipError) {
        console.error('Erro ao verificar liderança:', leadershipError);
        return false;
      }

      return (count || 0) > 0;
    },
    enabled: !!eventId && !!userId,
  });
}

// Modal simples para gestão de escala
function EscalaManageModal({ open, onClose, event }) {
  const { data: participants = [], isLoading } = useEventParticipants(event?.id || '');
  const addMutation = useAddParticipants();
  const removeMutation = useRemoveParticipant();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { toast } = useToast();
  const { user } = useAuth();
  const { data: isLeader, isLoading: isLoadingLeader } = useIsEventLeader(event?.id, user?.id);
  // Buscar todos os ministérios do evento
  const { data: eventMinistries = [], isLoading: loadingMinistries } = useQuery({
    queryKey: ['event-ministries', event?.id],
    queryFn: async () => {
      if (!event?.id) return [];
      const { data, error } = await supabase
        .from('event_ministries')
        .select('ministry_id')
        .eq('event_id', event.id);
      if (error) throw error;
      return data?.map((row: any) => row.ministry_id) || [];
    },
    enabled: !!event?.id,
  });
  // Buscar todos os membros desses ministérios
  const { data: members = [], isLoading: loadingMembers } = useQuery({
    queryKey: ['members-of-ministries', eventMinistries],
    queryFn: async () => {
      const validMinistries = (eventMinistries || []).filter(Boolean);
      if (!validMinistries.length) return [];

      // Etapa 1: Buscar apenas os IDs dos membros
      const { data: memberLinks, error: linkError } = await supabase
        .from('ministry_members')
        .select('user_id')
        .in('ministry_id', validMinistries)
        .eq('role', 'member');

      if (linkError) throw linkError;

      const memberIds = (memberLinks || []).map(link => link.user_id).filter(Boolean);
      if (memberIds.length === 0) return [];

      // Etapa 2: Com os IDs, buscar os perfis dos usuários
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, name')
        .in('id', memberIds);
      
      if (usersError) throw usersError;

      // Retorna a lista de usuários { id, name }
      return usersData || [];
    },
    enabled: !!eventMinistries && eventMinistries.length > 0,
  });
  if (!open || !event) return null;

  // Filtra membros disponíveis (não estão em participants)
  const available = Array.from(
    new Map(
      members
        .filter(m => !participants.some(p => p.user_id === m.id))
        .map(m => [m.id, m])
    ).values()
  );

  const handleConvite = async () => {
    try {
      await addMutation.mutateAsync({ eventId: event.id, participants: selectedUsers });
      toast({ title: 'Convites enviados', description: 'Os membros foram convidados com sucesso!' });
      setSelectedUsers([]);
    } catch (error) {
      toast({ title: 'Erro', description: 'Não foi possível enviar os convites.', variant: 'destructive' });
    }
  };

  const handleRemover = async (partId) => {
    try {
      await removeMutation.mutateAsync({ id: partId, eventId: event.id });
      toast({ title: 'Removido', description: 'Participante removido com sucesso.' });
    } catch (error) {
      toast({ title: 'Erro', description: 'Não foi possível remover o participante.', variant: 'destructive' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-xl mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Gerenciar Escala – {event.titulo}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white bg-transparent hover:bg-transparent">
            <X className="w-5 h-5" />
          </button>
        </div>
        {isLoading ? (
          <p className="text-gray-300">Carregando participantes...</p>
        ) : (
          <>
            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1">
              <h4 className="text-gray-100 font-semibold mb-2">Participantes</h4>
              {participants.length === 0 && <p className="text-gray-400 text-sm">Nenhum participante.</p>}
              {participants.map((p) => (
                <div key={p.id} className="flex justify-between items-center bg-white/5 border-white/10 rounded p-3">
                  <span className="text-gray-100 text-sm">{p.name || p.user_id} – {p.role}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80 capitalize">{p.status}</span>
                  {isLeader && (
                    <button
                      className="ml-3 text-red-400 hover:text-red-600"
                      title="Remover participante"
                      onClick={() => handleRemover(p.id)}
                      disabled={removeMutation.isPending}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div>
              {isLoadingLeader ? (
                <p className="text-gray-400 text-sm animate-pulse">Verificando permissões...</p>
              ) : isLeader ? (
                <>
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
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
                    disabled={selectedUsers.length === 0 || addMutation.isPending}
                    onClick={handleConvite}
                  >
                    {addMutation.isPending ? 'Enviando...' : 'Convidar selecionados'}
                  </button>
                </>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Hook para buscar todos os ministérios
function useAllMinistries() {
  return useQuery({
    queryKey: ['all-ministries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ministries')
        .select('id, name');
      if (error) throw error;
      return data || [];
    },
  });
}

const Programacao = () => {
  const { user, role } = useAuth();
  const { data: eventos = [], isLoading } = useEventos();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtros, setFiltros] = useState({
    tipo: '',
    data: '',
    pesquisa: '',
  });
  const [showModal, setShowModal] = useState(false);
  const { data: ministries = [] } = useAllMinistries();
  const [novoEvento, setNovoEvento] = useState<Partial<CreateEventDTO>>({});
  const { toast } = useToast();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [eventoToDelete, setEventoToDelete] = useState<Event | null>(null);
  const [confirmEventName, setConfirmEventName] = useState('');

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [eventoParaDetalhes, setEventoParaDetalhes] = useState<Event | null>(null);

  const { mutateAsync: createEvento } = useCreateEvento();
  const { mutateAsync: deleteEvento } = useDeleteEvento();

  const [modalEscalaOpen, setModalEscalaOpen] = useState(false);
  const [eventoParaGerenciar, setEventoParaGerenciar] = useState<Event | null>(null);

  const handleDeleteClick = (evento: Event) => {
    setEventoToDelete(evento);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (eventoToDelete && confirmEventName === eventoToDelete.titulo) {
      try {
        await deleteEvento(eventoToDelete.id);
        toast({
          title: "Sucesso",
          description: "Evento excluído com sucesso!",
        });
      } catch (error) {
        console.error('Erro ao excluir evento:', error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir o evento.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Erro",
        description: "Nome do evento não corresponde.",
        variant: "destructive",
      });
    }
    setShowConfirmModal(false);
    setEventoToDelete(null);
    setConfirmEventName('');
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setEventoToDelete(null);
    setConfirmEventName('');
  };

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const eventosFiltrados = eventos.filter(evento => {
    const matchTipo = !filtros.tipo || evento.tipo === filtros.tipo;
    const matchData = !filtros.data || evento.data === filtros.data;
    const matchPesquisa = !filtros.pesquisa || 
      evento.titulo.toLowerCase().includes(filtros.pesquisa.toLowerCase()) ||
      evento.descricao.toLowerCase().includes(filtros.pesquisa.toLowerCase());
    
    return matchTipo && matchData && matchPesquisa;
  });

  const handleCreateEvento = async (data: CreateEventDTO, selectedMinistries: string[]) => {
    try {
      // 1. Cria o evento
      const { data: event, error } = await supabase
        .from('events')
        .insert([{ ...data }])
        .select()
        .single();
      if (error) throw error;
      // 2. Cria os vínculos em event_ministries
      if (event && selectedMinistries.length > 0) {
        const inserts = selectedMinistries.map(ministryId => ({
          event_id: event.id,
          ministry_id: ministryId
        }));
        await supabase.from('event_ministries').insert(inserts);
      }
        setShowModal(false);
      toast({ title: 'Evento criado com sucesso!' });
      } catch (error) {
      toast({ title: 'Erro ao criar evento', description: String(error), variant: 'destructive' });
    }
  };

  const handleViewDetailsClick = (evento: Event) => {
    setEventoParaDetalhes(evento);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setEventoParaDetalhes(null);
  };

  // -------------------------------------------------------------------
  // Participantes do evento selecionado — necessário fora da renderização
  // para manter a ordem dos hooks consistente.
  // -------------------------------------------------------------------
  const { data: participantesEvento = [] } = useEventParticipants(eventoParaDetalhes?.id ?? "");
  const meuConvite = participantesEvento.find(p => p.user_id === user?.id);

  // Função para abrir modal de gestão de escala
  const handleAbrirGerenciarEscala = (evento: Event) => {
    setEventoParaGerenciar(evento);
    setModalEscalaOpen(true);
  };

  // Função para fechar modal de gestão de escala
  const handleFecharGerenciarEscala = () => {
    setModalEscalaOpen(false);
    setEventoParaGerenciar(null);
  };

  return (
    <div className="mx-auto w-full max-w-full sm:container px-4 py-8 lg:max-w-5xl xl:max-w-7xl">
      {/* Filtros */}
      <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-8 text-white">
        <h2 className="text-xl font-semibold mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tipo</label>
            <select 
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
              value={filtros.tipo}
              onChange={(e) => handleFiltroChange('tipo', e.target.value)}
            >
              <option value="">Todas as categorias</option>
              <option value="Cultos">Cultos</option>
              <option value="Ensino">Ensino</option>
              <option value="Oração">Oração</option>
              <option value="Eventos">Eventos</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Data</label>
            <input 
              type="date" 
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
              value={filtros.data}
              onChange={(e) => handleFiltroChange('data', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Pesquisar</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar eventos..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
                value={filtros.pesquisa}
                onChange={(e) => handleFiltroChange('pesquisa', e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Eventos */}
      <div className="bg-gray-800 rounded-xl shadow-md p-6 text-white">
        <div className="flex justify-between items-start mb-6 flex-wrap">
          <h2 className="text-xl font-semibold mb-2 md:mb-0">Eventos de Programação</h2>
          <div className="flex items-center flex-wrap gap-4">
            <span className="text-sm text-gray-300">Visualizar:</span>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-blue-500/20 text-blue-300' : 'bg-white/5 text-gray-300'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-r-lg ${viewMode === 'list' ? 'bg-blue-500/20 text-blue-300' : 'bg-white/5 text-gray-300'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {role === 'social_media' && (
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Novo Evento</span>
              </button>
            )}
          </div>
        </div>

        {/* Conteúdo da Lista de Eventos (Carregando ou Visualizações) */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : (
          <EventList
            eventos={eventosFiltrados}
            role={role}
            viewMode={viewMode}
            onViewDetails={handleViewDetailsClick}
            onDelete={handleDeleteClick}
            onManageEscala={handleAbrirGerenciarEscala}
          />
        )}

        {eventosFiltrados.length === 0 && !isLoading && (
          <div className="text-center py-10 text-gray-400">
            Nenhum evento encontrado para os filtros selecionados.
          </div>
        )}
      </div>

      {/* Modal de Adicionar Evento */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Adicionar Novo Evento</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
            </div>
            <div className="p-6">
              <EventForm onSubmit={handleCreateEvento} onCancel={() => setShowModal(false)} ministries={ministries} />
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Confirmar Exclusão</h2>
                <button 
                  onClick={handleCancelDelete}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              {eventoToDelete && (
                <>
                  <div className="mb-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-gray-300 mb-2">Você está prestes a excluir o evento:</p>
                    <p className="font-semibold text-lg text-white">{eventoToDelete.titulo}</p>
                    <p className="text-gray-300 mt-4">Esta ação não pode ser desfeita. Para confirmar, digite o nome do evento abaixo:</p>
                  </div>

                  <div className="mb-6">
                    <input 
                        type="text" 
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-700 text-white" 
                        placeholder="Digite o nome do evento" 
                        value={confirmEventName}
                        onChange={(e) => setConfirmEventName(e.target.value)}
                      />
                  </div>
                </>
              )}
              <div className="flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={handleCancelDelete}
                  className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 bg-gray-700 hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button 
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={confirmEventName !== eventoToDelete?.titulo}
                >
                  Excluir Evento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes do Evento */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Detalhes do Evento</h2>
                <button 
                  onClick={handleCloseDetailsModal}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              {eventoParaDetalhes && (
                <>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-white">{eventoParaDetalhes.titulo}</h3>
                    <p className="text-gray-300 mb-4">{eventoParaDetalhes.descricao}</p>
                  </div>
                  <div className="mb-6">
                    <strong className="text-sm font-medium text-gray-300 mb-2">Tipo:</strong>
                    <span className="text-sm text-gray-400 ml-2">{eventoParaDetalhes.tipo}</span>
                  </div>
                  <div className="mb-6">
                    <strong className="text-sm font-medium text-gray-300 mb-2">Data:</strong>
                    <span className="text-sm text-gray-400 ml-2">{new Date(eventoParaDetalhes.data).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="mb-6">
                    <strong className="text-sm font-medium text-gray-300 mb-2">Local:</strong>
                    <span className="text-sm text-gray-400 ml-2">{eventoParaDetalhes.local}</span>
                  </div>
                  <div className="mb-6">
                    <strong className="text-sm font-medium text-gray-300 mb-2">Hora:</strong>
                    <span className="text-sm text-gray-400 ml-2">{eventoParaDetalhes.hora}</span>
                  </div>
                  {meuConvite && meuConvite.status === 'pending' && (
                    <div className="mb-6 bg-blue-500/10 border border-blue-400/40 p-4 rounded-lg">
                      <p className="text-gray-100 mb-3">Você foi convidado para participar deste evento.</p>
                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() =>
                            updateStatus.mutate({
                              id: meuConvite.id,
                              status: 'confirmed',
                              eventId: eventoParaDetalhes!.id,
                            })
                          }
                        >
                          Confirmar
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            updateStatus.mutate({
                              id: meuConvite.id,
                              status: 'declined',
                              eventId: eventoParaDetalhes!.id,
                            })
                          }
                        >
                          Recusar
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de gestão de escala */}
      <EscalaManageModal open={modalEscalaOpen} onClose={handleFecharGerenciarEscala} event={eventoParaGerenciar} />
    </div>
  );
};

export default Programacao;
