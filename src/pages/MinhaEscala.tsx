import { useState, useMemo } from "react";
import { CalendarCheck, Clock, MapPin, User, CheckCircle, XCircle, AlertCircle, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useMyParticipations } from '@/features/events/hooks/useMyParticipations';
import { useUpdateParticipantStatus } from '@/features/events/hooks/useParticipants';

// Componente de partículas flutuantes (reutilizado)
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-400/20"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            y: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
            ],
            opacity: [
              Math.random() * 0.3 + 0.2,
              Math.random() * 0.5 + 0.3,
              Math.random() * 0.3 + 0.2,
            ],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Interface para membros escalados (se precisar em futuras features)
// interface Escalado {
//   id: string;
//   nome: string;
//   funcao: string;
//   status: 'confirmado' | 'pendente' | 'recusado';
// }

// Interfaces para tipagem local
interface Event {
  id: string;
  titulo: string;
  tipo: string;
  data: string;
  hora: string;
  local: string;
  descricao: string;
}

interface ScaleEntry {
  id: string;
  eventId: string;
  userRole: string;
  participationStatus: 'escalado' | 'confirmado' | 'recusado' | 'pendente';
  roleInEvent: string;
}

const MinhaEscala = () => {
  const [filtroStatus, setFiltroStatus] = useState<string>('');
  const { data: participations = [], isLoading } = useMyParticipations();
  const updateStatus = useUpdateParticipantStatus();

  const escalasUsuario: (ScaleEntry & { event: Event })[] = useMemo(() => participations.map((p: any) => ({
    id: p.id,
    eventId: p.event_id,
    userRole: p.role,
    roleInEvent: p.role,
    participationStatus: p.status === 'pending' ? 'pendente' : p.status === 'confirmed' ? 'confirmado' : 'recusado',
    event: {
      id: p.events.id,
      titulo: p.events.titulo,
      tipo: p.events.tipo,
      data: p.events.data,
      hora: p.events.hora,
      local: p.events.local,
      descricao: p.events.descricao ?? '',
    },
  })), [participations]);

  // Função para obter a classe de cor de fundo com base no tipo do evento
  const getBgColorClass = (tipo: string) => {
    switch(tipo) {
      case 'Cultos': return 'bg-blue-700';
      case 'Ensino': return 'bg-emerald-600';
      case 'Oração': return 'bg-purple-700';
      case 'Eventos': return 'bg-fuchsia-600';
      default: return 'bg-gray-700';
    }
  };

  // Função para obter a classe de cor do badge de status
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'confirmado': return 'bg-green-600 text-white';
      case 'escalado': return 'bg-blue-600 text-white';
      case 'pendente': return 'bg-yellow-600 text-white';
      case 'recusado': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  // Função para obter o ícone do status
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'confirmado': return <CheckCircle className="w-4 h-4" />;
      case 'escalado': return <CalendarCheck className="w-4 h-4" />;
      case 'pendente': return <AlertCircle className="w-4 h-4" />;
      case 'recusado': return <XCircle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  // Função para obter o texto do status
  const getStatusText = (status: string) => {
    switch(status) {
      case 'confirmado': return 'Confirmado';
      case 'escalado': return 'Escalado';
      case 'pendente': return 'Pendente';
      case 'recusado': return 'Recusado';
      default: return status;
    }
  };

  // Função para confirmar participação
  const handleConfirmarParticipacao = (participationId: string) => {
    updateStatus.mutate({ id: participationId, status: 'confirmed' });
  };

  // Função para recusar participação
  const handleRecusarParticipacao = (participationId: string) => {
    updateStatus.mutate({ id: participationId, status: 'declined' });
  };

  // Filtrar escalas com base no status selecionado
  const escalasFiltradas = escalasUsuario.filter(escala => {
    if (!filtroStatus) return true;
    return escala.participationStatus === filtroStatus;
  });

  // Ordenar escalas por data do evento
  const escalasOrdenadas = escalasFiltradas.sort((a, b) => 
    new Date(a.event.data).getTime() - new Date(b.event.data).getTime()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#1E293B] relative overflow-hidden">
      {/* Partículas de fundo */}
      <FloatingParticles />

      {/* Conteúdo principal */}
      <div className="relative z-10 px-4 lg:px-8 py-8 max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <CalendarCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Minha Escala</h1>
              <p className="text-white/60 text-sm">Seus próximos compromissos e participações</p>
            </div>
          </div>
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>

        {/* Filtros */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-3">
            <Button
              variant={filtroStatus === '' ? 'default' : 'outline'}
              onClick={() => setFiltroStatus('')}
              className={`rounded-full ${
                filtroStatus === ''
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
              }`}
            >
              Todos
            </Button>
            <Button
              variant={filtroStatus === 'escalado' ? 'default' : 'outline'}
              onClick={() => setFiltroStatus('escalado')}
              className={`rounded-full ${
                filtroStatus === 'escalado'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
              }`}
            >
              Escalado
            </Button>
            <Button
              variant={filtroStatus === 'confirmado' ? 'default' : 'outline'}
              onClick={() => setFiltroStatus('confirmado')}
              className={`rounded-full ${
                filtroStatus === 'confirmado'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
              }`}
            >
              Confirmado
            </Button>
            <Button
              variant={filtroStatus === 'pendente' ? 'default' : 'outline'}
              onClick={() => setFiltroStatus('pendente')}
              className={`rounded-full ${
                filtroStatus === 'pendente'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
              }`}
            >
              Pendente
            </Button>
          </div>
        </motion.div>

        {/* Lista de Escalas */}
        {isLoading && (
          <p className="text-center text-white/60 mb-6 animate-pulse">Carregando...</p>
        )}
        <AnimatePresence>
          {escalasOrdenadas.length > 0 ? (
            <div className="grid gap-6">
              {escalasOrdenadas.map((escala, index) => (
                <motion.div
                  key={`${escala.id}-${escala.participationStatus}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/8 transition-all duration-300 hover:scale-[1.01] shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        {/* Informações do Evento */}
                        <div className="flex-1">
                          <div className="flex items-start space-x-4">
                            <div className={`w-16 h-16 rounded-xl ${getBgColorClass(escala.event.tipo)} flex items-center justify-center flex-shrink-0`}>
                              <Calendar className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-lg font-bold text-white truncate">{escala.event.titulo}</h3>
                                <Badge className={`${getBgColorClass(escala.event.tipo)} text-white px-2 py-1 text-xs`}>
                                  {escala.event.tipo}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-white/80 mb-3">
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4" />
                                  <span>{new Date(escala.event.data).toLocaleDateString('pt-BR')} às {escala.event.hora}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <MapPin className="w-4 h-4" />
                                  <span>{escala.event.local}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <User className="w-4 h-4" />
                                  <span>{escala.roleInEvent}</span>
                                </div>
                              </div>

                              <p className="text-white/70 text-sm mb-3">{escala.event.descricao}</p>

                              <div className="flex items-center space-x-2">
                                <span className="text-white/60 text-sm">Status:</span>
                                <Badge className={`${getStatusBadgeClass(escala.participationStatus)} px-2 py-1 text-xs flex items-center space-x-1`}>
                                  {getStatusIcon(escala.participationStatus)}
                                  <span className="capitalize">{getStatusText(escala.participationStatus)}</span>
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 lg:ml-6">
                          {(escala.participationStatus === 'pendente' || escala.participationStatus === 'escalado') && (
                            <>
                              <Button
                                onClick={() => handleConfirmarParticipacao(escala.id)}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                                size="sm"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Confirmar
                              </Button>
                              <Button
                                onClick={() => handleRecusarParticipacao(escala.id)}
                                variant="outline"
                                className="bg-white/5 text-white border-white/10 hover:bg-red-500/20 hover:border-red-500/30"
                                size="sm"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Recusar
                              </Button>
                            </>
                          )}
                          {escala.participationStatus === 'confirmado' && (
                            <Button
                              onClick={() => handleRecusarParticipacao(escala.id)}
                              variant="outline"
                              className="bg-white/5 text-white border-white/10 hover:bg-red-500/20 hover:border-red-500/30"
                              size="sm"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Cancelar
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 max-w-md mx-auto">
                <CardContent className="p-8">
                  <CalendarCheck className="w-16 h-16 text-white/40 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Nenhuma escala encontrada</h3>
                  <p className="text-white/60 text-sm">
                    {filtroStatus 
                      ? `Você não possui escalas com status "${filtroStatus}" no momento.`
                      : "Você não está escalado para nenhum evento no momento."
                    }
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MinhaEscala;
