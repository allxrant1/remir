import { useState } from "react";
import { Search, Play, Share2, Star, MessageCircle, Sparkles, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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

// Componente de navegação/filtros
const MessageFilters = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { id: "Todas", label: "Todas", icon: <MessageCircle className="w-4 h-4" /> },
    { id: "Recentes", label: "Recentes", icon: <Clock className="w-4 h-4" /> },
    { id: "Favoritas", label: "Favoritas", icon: <Star className="w-4 h-4" /> },
    { id: "Série", label: "Série", icon: <Sparkles className="w-4 h-4" /> },
    { id: "Temas", label: "Temas", icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center sm:justify-start">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
            activeFilter === filter.id
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20"
              : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="mr-2">{filter.icon}</span>
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
};

const Mensagens = () => {
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");

  const mensagens = [
    {
      id: 1,
      titulo: "O Poder da Fé em Tempos Difíceis",
      pastor: "Pr. João Silva",
      data: "20 Nov 2024",
      duracao: "45 min",
      visualizacoes: "1.2k",
      favorito: true,
      thumbnail: "/placeholder.svg"
    },
    {
      id: 2,
      titulo: "Vivendo em Esperança",
      pastor: "Pra. Maria Santos",
      data: "17 Nov 2024",
      duracao: "38 min",
      visualizacoes: "890",
      favorito: false,
      thumbnail: "/placeholder.svg"
    },
    {
      id: 3,
      titulo: "A Graça Transformadora",
      pastor: "Pr. Pedro Costa",
      data: "13 Nov 2024",
      duracao: "42 min",
      visualizacoes: "2.1k",
      favorito: true,
      thumbnail: "/placeholder.svg"
    }
  ];

  const filteredMessages = mensagens.filter(msg => {
    const matchesFilter = activeFilter === "Todas" || 
                          (activeFilter === "Recentes" && msg.data.includes("Nov")) ||
                          (activeFilter === "Favoritas" && msg.favorito);
    const matchesSearch = msg.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          msg.pastor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Mensagens</h1>
              <p className="text-white/60 text-sm">Ouça as palavras que transformam vidas</p>
            </div>
          </div>
        </motion.div>

        {/* Barra de Pesquisa */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-white/60 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Buscar mensagens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder-white/40 pl-10 rounded-full focus:ring-2 focus:ring-blue-500/50 focus:border-transparent h-12"
            />
          </div>
        </motion.div>

        {/* Filtros */}
        <MessageFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        {/* Lista de Mensagens */}
        <div className="grid gap-4">
          <AnimatePresence>
            {filteredMessages.map((mensagem, index) => (
              <motion.div
                key={mensagem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/8 transition-all duration-300 hover:scale-[1.01] shadow-lg overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Thumbnail */}
                      <div className="w-full md:w-40 h-28 bg-gray-700 rounded-xl flex items-center justify-center relative overflow-hidden">
                        <img src={mensagem.thumbnail} alt="Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play className="w-8 h-8 text-white/80" />
                        </div>
                      </div>

                      {/* Conteúdo */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">{mensagem.titulo}</h3>
                            <p className="text-blue-300 font-semibold text-sm">{mensagem.pastor}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`text-white/50 hover:text-blue-400 hover:bg-white/10 ${
                              mensagem.favorito ? "text-blue-400" : ""
                            }`}
                          >
                            <Star className={`w-5 h-5 ${mensagem.favorito ? "fill-current" : ""}`} />
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-x-3 text-xs text-white/70 mb-4">
                          <span>{mensagem.data}</span>
                          <span>•</span>
                          <span>{mensagem.duracao}</span>
                          <span>•</span>
                          <span>{mensagem.visualizacoes} visualizações</span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Button 
                            size="sm"
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border-none"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Ouvir Agora
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-white/70 hover:text-white hover:bg-white/10 border-white/20 hover:border-white/30 bg-transparent"
                          >
                            <Share2 className="w-4 h-4 mr-1" />
                            Compartilhar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Mensagens;
