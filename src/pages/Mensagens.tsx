
import { useState } from "react";
import { Heart, Search, Play, Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Mensagens = () => {
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");

  const filters = ["Todas", "Recentes", "Favoritas", "Série", "Temas"];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="px-4 lg:px-8 py-8">
        {/* Banner de Título */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Mensagens</h1>
              <p className="text-white/70">Ouça as palavras que transformam vidas</p>
            </div>
          </div>
        </div>

        {/* Barra de Pesquisa */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-white/60 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Buscar mensagens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-white/60 pl-10 rounded-full focus:ring-2 focus:ring-pink-400 focus:border-transparent h-11"
            />
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30"
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Lista de Mensagens */}
        <div className="grid gap-4">
          {mensagens.map((mensagem) => (
            <Card key={mensagem.id} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-[1.01] shadow-lg">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Thumbnail */}
                  <div className="w-full md:w-40 h-28 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center">
                    <Play className="w-6 h-6 text-white/70" />
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{mensagem.titulo}</h3>
                        <p className="text-pink-300 font-semibold text-sm">{mensagem.pastor}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`${
                          mensagem.favorito ? "text-yellow-400" : "text-white/50"
                        } hover:text-yellow-400 hover:bg-white/10`}
                      >
                        <Star className={`w-4 h-4 ${mensagem.favorito ? "fill-current" : ""}`} />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-3 text-xs text-white/70 mb-4">
                      <span>{mensagem.data}</span>
                      <span>•</span>
                      <span>{mensagem.duracao}</span>
                      <span>•</span>
                      <span>{mensagem.visualizacoes} visualizações</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button 
                        size="sm"
                        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Ouvir Agora
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-white/70 hover:text-white hover:bg-white/10 border-white/20 hover:border-white/30"
                      >
                        <Share2 className="w-4 h-4 mr-1" />
                        Compartilhar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mensagens;
