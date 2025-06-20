import { useState, useEffect } from "react";
import { Hand, Plus, Heart, ChevronRight, Sparkles, Send, Clock, Users, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

// Componente de partículas flutuantes
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

// Componente de navegação moderna
const ModernNavigation = ({ activeTab, setActiveTab, role }) => {
  const tabs = [
    { id: "pedidos", label: "Pedidos", icon: <MessageCircle className="w-4 h-4" /> },
    { id: "testemunhos", label: "Testemunhos", icon: <Sparkles className="w-4 h-4" /> },
    { id: "agenda", label: "Agenda", icon: <Clock className="w-4 h-4" /> },
  ];

  if (role === 'social_media') {
    tabs.push({ id: "moderacao", label: "Moderação", icon: <Users className="w-4 h-4" /> });
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center sm:justify-start">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
            activeTab === tab.id
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20"
              : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="mr-2">{tab.icon}</span>
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
};

// Componente de contador de orações
const PrayerCounter = ({ count }) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
          <span className="text-sm font-medium text-blue-400">{count}</span>
        </div>
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-500/5"
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <span className="ml-2 text-sm text-white/60">orações</span>
    </div>
  );
};

const Oracao = () => {
  const [activeTab, setActiveTab] = useState("pedidos");
  const [nome, setNome] = useState("");
  const [pedido, setPedido] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { role } = useAuth();

  const initialPedidos = [
    {
      id: 1,
      nome: "Maria",
      pedido: "Peço oração pela saúde da minha mãe que está internada...",
      oracoes: 12,
      data: "2 horas atrás"
    },
    {
      id: 2,
      nome: "João",
      pedido: "Agradeço por todas as bênçãos recebidas este mês e peço sabedoria para...",
      oracoes: 8,
      data: "5 horas atrás"
    },
    {
      id: 3,
      nome: "Ana",
      pedido: "Peço oração pelo meu trabalho e pelas decisões importantes que preciso tomar...",
      oracoes: 15,
      data: "1 dia atrás"
    }
  ];

  const [pedidosComunidade, setPedidosComunidade] = useState(initialPedidos);

  // ids orados armazenados em localStorage para persistir no navegador
  const [prayedIds, setPrayedIds] = useState<Set<number>>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("prayedIds") || "[]") as number[];
      return new Set(stored);
    } catch {
      return new Set<number>();
    }
  });

  // Pedidos aguardando moderação
  const [pendingPedidos, setPendingPedidos] = useState<typeof initialPedidos>([]);

  // Controle de exibição do painel de moderação
  const [showModerationPanel, setShowModerationPanel] = useState(false);

  const handlePray = (id: number) => {
    if (prayedIds.has(id)) return; // já orou

    setPedidosComunidade((prev) =>
      prev.map((p) => (p.id === id ? { ...p, oracoes: p.oracoes + 1 } : p))
    );

    const newSet = new Set(prayedIds);
    newSet.add(id);
    setPrayedIds(newSet);
    localStorage.setItem("prayedIds", JSON.stringify(Array.from(newSet)));
  };

  const testemunhos = [
    {
      id: 1,
      nome: "Carlos",
      testemunho: "Deus respondeu minha oração! Consegui o emprego que tanto sonhava...",
      data: "3 dias atrás"
    },
    {
      id: 2,
      nome: "Lucia",
      testemunho: "Quero compartilhar como Deus tem sido fiel em minha família...",
      data: "1 semana atrás"
    }
  ];

  const handleSubmitPedido = () => {
    if (!pedido.trim()) return;
    
    setIsSubmitting(true);
    
    const newPedido = {
      id: Date.now(),
      nome: nome || "Anônimo",
      pedido,
      oracoes: 0,
      data: "agora"
    };

    // Adiciona na fila de moderação
    setPendingPedidos((prev) => [newPedido, ...prev]);

    setNome("");
    setPedido("");
    setIsSubmitting(false);
    setShowConfirmation(true);

    setTimeout(() => setShowConfirmation(false), 3000);
  };

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
              <Hand className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Oração</h1>
              <p className="text-white/60 text-sm">Unidos em propósito, conectados em fé</p>
            </div>
          </div>
        </motion.div>

        {/* Navegação */}
        <ModernNavigation activeTab={activeTab} setActiveTab={setActiveTab} role={role} />

        {/* Conteúdo das abas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "pedidos" && (
              <div className="space-y-8">
                {/* Formulário de Novo Pedido */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <Card className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden relative">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <Plus className="w-4 h-4 text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium text-white">Novo Pedido de Oração</h3>
                      </div>

                      <div className="space-y-4">
                        <Input
                          type="text"
                          placeholder="Seu nome (opcional)"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          className="bg-white/5 border-white/10 text-white placeholder-white/40 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent h-12"
                        />
                        
                        <div className="relative">
                          <textarea
                            placeholder="Compartilhe seu pedido de oração..."
                            value={pedido}
                            onChange={(e) => setPedido(e.target.value)}
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none"
                          />
                          <div className="absolute bottom-3 right-3">
                            <Button 
                              onClick={handleSubmitPedido}
                              disabled={isSubmitting || !pedido.trim()}
                              className="rounded-full w-10 h-10 p-0 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/20"
                            >
                              {isSubmitting ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                  <div className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full" />
                                </motion.div>
                              ) : (
                                <Send className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Confirmação de envio */}
                      <AnimatePresence>
                        {showConfirmation && (
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-2 text-sm"
                            initial={{ y: 40 }}
                            animate={{ y: 0 }}
                            exit={{ y: 40 }}
                            transition={{ duration: 0.3 }}
                          >
                            Pedido enviado com sucesso! Obrigado por compartilhar.
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Lista de Pedidos da Comunidade */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-medium text-white">Pedidos da Comunidade</h3>
                    <div className="text-sm text-white/60 flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {pedidosComunidade.length} pedidos
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {pedidosComunidade.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                      >
                        <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/8 transition-all duration-300 overflow-hidden group">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="font-medium text-white">{item.nome}</h4>
                              <span className="text-xs text-white/40 flex items-center">
                                <Clock className="w-3 h-3 mr-1 inline" />
                                {item.data}
                              </span>
                            </div>
                            <p className="text-white/70 mb-4 text-sm leading-relaxed">{item.pedido}</p>
                            <div className="flex items-center justify-between">
                              <PrayerCounter count={item.oracoes} />
                              <Button
                                variant="ghost"
                                disabled={prayedIds.has(item.id)}
                                onClick={() => handlePray(item.id)}
                                className={`relative rounded-full group ${prayedIds.has(item.id) ? "text-blue-400" : "text-white/70 hover:text-white hover:bg-blue-500/20"}`}
                              >
                                <Heart className={`w-4 h-4 mr-2 transition-colors ${prayedIds.has(item.id) ? "fill-current" : "group-hover:text-blue-400"}`} />
                                <span className="text-sm">{prayedIds.has(item.id) ? "Orado" : "Orar"}</span>
                                {!prayedIds.has(item.id) && (
                                  <motion.div
                                    className="absolute inset-0 rounded-full bg-blue-500/5 opacity-0 group-hover:opacity-100"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                  />
                                )}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "testemunhos" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testemunhos.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-xl border-white/10 h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{item.nome}</h4>
                            <span className="text-xs text-white/40">{item.data}</span>
                          </div>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed">{item.testemunho}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "agenda" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">Agenda de Oração</h3>
                    <p className="text-white/60 max-w-md mx-auto">Em breve você poderá acompanhar os horários de oração da igreja e receber lembretes para momentos de conexão espiritual.</p>
                    <Button className="mt-6 bg-white/10 text-white hover:bg-white/15">
                      Receber notificações
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "moderacao" && role === 'social_media' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                {!showModerationPanel ? (
                  <Card className="bg-white/5 backdrop-blur-xl border-white/10 text-center">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-medium text-white mb-2">Área de Moderação</h3>
                      <p className="text-white/60 max-w-md mx-auto">Área restrita para líderes e moderadores. Aqui você poderá gerenciar pedidos de oração pendentes.</p>
                      <Button
                        onClick={() => setShowModerationPanel(true)}
                        className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                      >
                        Acessar painel de moderação
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-medium text-white">Pedidos pendentes</h3>
                      <Button variant="ghost" onClick={() => setShowModerationPanel(false)} className="text-white/70 hover:text-white">
                        Voltar
                      </Button>
                    </div>
                    {pendingPedidos.length === 0 && (
                      <p className="text-white/60">Nenhum pedido pendente.</p>
                    )}
                    {pendingPedidos.map((item) => (
                      <Card key={item.id} className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden">
                        <CardContent className="p-6">
                          <p className="text-white/70 mb-4 text-sm leading-relaxed">{item.pedido}</p>
                          <div className="flex items-center justify-end gap-3">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => {
                                // Aprovar: move para lista principal como mais recente
                                setPedidosComunidade((prev) => [{ ...item, data: "agora" }, ...prev]);
                                setPendingPedidos((prev) => prev.filter((p) => p.id !== item.id));
                              }}
                            >
                              Aprovar
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => setPendingPedidos((prev) => prev.filter((p) => p.id !== item.id))}
                            >
                              Reprovar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Oracao;
