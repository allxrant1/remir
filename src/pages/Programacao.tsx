import { useState } from "react";
import { Calendar, Plus, Clock, MapPin, Bell, Share2, Trash2, Star, X, CalendarDays, AlignLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { eventService, Event, CreateEventDTO } from "@/services/eventService";
import { Loader2 } from "lucide-react";
import { useEffect } from 'react';

// Função auxiliar para formatar a data de YYYY-MM-DD para DD de Mês
const formatEventDate = (dateString: string) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split('-');
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  const monthIndex = parseInt(month, 10) - 1;
  // Garante que day tem 2 dígitos
  const formattedDay = day.padStart(2, '0');
  return `${formattedDay} de ${monthNames[monthIndex]}`;
};

// Função auxiliar para obter a classe de cor de fundo com base no tipo do evento
const getBgColorClass = (tipo: string) => {
  switch(tipo) {
    case 'Cultos': return 'bg-blue-600'; // Exemplo de cor para Cultos
    case 'Ensino': return 'bg-green-600'; // Exemplo de cor para Ensino
    case 'Oração': return 'bg-purple-600'; // Exemplo de cor para Oração
    case 'Eventos': return 'bg-orange-600'; // Exemplo de cor para Eventos
    default: return 'bg-gray-600'; // Cor padrão para outros tipos
  }
};

const Programacao = () => {
  const { user, role } = useAuth();
  const [eventos, setEventos] = useState<Event[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtros, setFiltros] = useState({
    tipo: '',
    data: '',
    pesquisa: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [novoEvento, setNovoEvento] = useState<Partial<CreateEventDTO>>({});
  const { toast } = useToast();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [eventoToDelete, setEventoToDelete] = useState<Event | null>(null);
  const [confirmEventName, setConfirmEventName] = useState('');
  const [loading, setLoading] = useState(true);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [eventoParaDetalhes, setEventoParaDetalhes] = useState<Event | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await eventService.getEvents();
      setEventos(data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os eventos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (evento: Event) => {
    setEventoToDelete(evento);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (eventoToDelete && confirmEventName === eventoToDelete.titulo) {
      try {
        await eventService.deleteEvent(eventoToDelete.id);
        fetchEvents(); // Recarrega a lista após exclusão bem-sucedida
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (novoEvento.titulo && novoEvento.tipo && novoEvento.data && novoEvento.hora && novoEvento.local) {
      const eventoCompleto: CreateEventDTO = {
        titulo: novoEvento.titulo,
        tipo: novoEvento.tipo,
        data: novoEvento.data,
        descricao: novoEvento.descricao || '',
        hora: novoEvento.hora,
        local: novoEvento.local,
      };
      try {
        await eventService.createEvent(eventoCompleto);
        fetchEvents(); // Recarrega a lista após criar o evento
        toast({
          title: "Sucesso",
          description: "Evento criado com sucesso!",
        });
        setShowModal(false);
        setNovoEvento({});
      } catch (error) {
        console.error('Erro ao criar evento:', error);
        toast({
          title: "Erro",
          description: "Não foi possível criar o evento.",
          variant: "destructive",
        });
      }
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

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
            <input 
              type="date" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filtros.data}
              onChange={(e) => handleFiltroChange('data', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pesquisar</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar eventos..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-start mb-6 flex-wrap">
          <h2 className="text-xl font-semibold mb-2 md:mb-0">Eventos de Programação</h2>
          <div className="flex items-center flex-wrap gap-4">
            <span className="text-sm text-gray-500">Visualizar:</span>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-500'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-r-lg ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-500'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {role === 'social_media' && (
              <button
                onClick={() => setShowModal(true)}
                className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Adicionar Novo Evento
              </button>
            )}
          </div>
        </div>

        {/* Conteúdo da Lista de Eventos (Carregando ou Visualizações) */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          // Visualizações Grid ou Lista quando não está carregando
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventosFiltrados.map(evento => (
                <div key={evento.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className={`h-40 ${getBgColorClass(evento.tipo)} relative`}>
                    <div className="absolute top-0 right-0 bg-white m-2 px-3 py-1 rounded-full text-xs font-semibold text-indigo-700">
                      {evento.tipo}
                    </div>
                    <div className="absolute bottom-0 left-0 bg-white m-2 px-3 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(evento.data).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2">{evento.titulo}</h3>
                    <p className="text-gray-600 text-sm mb-4">{evento.descricao}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {evento.local}
                    </div>
                    <div className="flex justify-between items-center">
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm" onClick={() => handleViewDetailsClick(evento)}>
                        Ver detalhes
                      </button>
                      {role === 'social_media' && (
                        <button
                          onClick={() => handleDeleteClick(evento)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm ml-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evento</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {eventosFiltrados.map(evento => (
                    <tr key={evento.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{evento.titulo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          {evento.tipo}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(evento.data).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{evento.local}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleViewDetailsClick(evento)}>Ver detalhes</button>
                        {role === 'social_media' && (
                          <button
                            onClick={() => handleDeleteClick(evento)}
                            className="text-red-600 hover:text-red-800 font-medium text-sm ml-2"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>

      {/* Modal de Novo Evento */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Adicionar Novo Evento</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Evento</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={novoEvento.titulo || ''}
                      onChange={(e) => setNovoEvento(prev => ({ ...prev, titulo: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={novoEvento.tipo || ''}
                      onChange={(e) => setNovoEvento(prev => ({ ...prev, tipo: e.target.value }))}
                      required
                    >
                      <option value="">Selecione uma categoria</option>
                      <option value="Cultos">Cultos</option>
                      <option value="Ensino">Ensino</option>
                      <option value="Oração">Oração</option>
                      <option value="Eventos">Eventos</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={novoEvento.data || ''}
                      onChange={(e) => setNovoEvento(prev => ({ ...prev, data: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={novoEvento.local || ''}
                      onChange={(e) => setNovoEvento(prev => ({ ...prev, local: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                    <input 
                      type="time" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={novoEvento.hora || ''}
                      onChange={(e) => setNovoEvento(prev => ({ ...prev, hora: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={novoEvento.descricao || ''}
                      onChange={(e) => setNovoEvento(prev => ({ ...prev, descricao: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Salvar Evento
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Confirmar Exclusão</h2>
                <button 
                  onClick={handleCancelDelete}
                  className="text-gray-400 hover:text-gray-600"
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
                    <p className="text-gray-700 mb-2">Você está prestes a excluir o evento:</p>
                    <p className="font-semibold text-lg text-gray-900">{eventoToDelete.titulo}</p>
                    <p className="text-gray-700 mt-4">Esta ação não pode ser desfeita. Para confirmar, digite o nome do evento abaixo:</p>
                  </div>

                  <div className="mb-6">
                    <input 
                        type="text" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" 
                        placeholder="Digite o nome do evento" 
                        value={confirmEventName}
                        onChange={(e) => setConfirmEventName(e.target.value)}
                      />
                      {/* Mensagem de erro (opcional, se quisermos adicionar validação em tempo real) */}
                      {/* <p className="text-red-500 text-sm mt-1 hidden">O nome digitado não corresponde ao nome do evento.</p> */}
                  </div>
                </>
              )}
              <div className="flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={handleCancelDelete}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
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
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Detalhes do Evento</h2>
                <button 
                  onClick={handleCloseDetailsModal}
                  className="text-gray-400 hover:text-gray-600"
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
                    <h3 className="text-lg font-semibold mb-2">{eventoParaDetalhes.titulo}</h3>
                    <p className="text-gray-700 mb-4">{eventoParaDetalhes.descricao}</p>
                  </div>
                  <div className="mb-6">
                    <strong className="text-sm font-medium text-gray-700 mb-2">Tipo:</strong>
                    <span className="text-sm text-gray-500">{eventoParaDetalhes.tipo}</span>
                  </div>
                  <div className="mb-6">
                    <strong className="text-sm font-medium text-gray-700 mb-2">Data:</strong>
                    <span className="text-sm text-gray-500">{new Date(eventoParaDetalhes.data).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="mb-6">
                    <strong className="text-sm font-medium text-gray-700 mb-2">Local:</strong>
                    <span className="text-sm text-gray-500">{eventoParaDetalhes.local}</span>
                  </div>
                  <div className="mb-6">
                    <strong className="text-sm font-medium text-gray-700 mb-2">Hora:</strong>
                    <span className="text-sm text-gray-500">{eventoParaDetalhes.hora}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Programacao;
