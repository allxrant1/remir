
import { useState } from "react";
import { Calendar, Plus, Clock, MapPin, Bell, Share2, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Programacao = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filters = ["Todos", "Cultos", "Ensino", "Oração", "Eventos"];

  const eventos = [
    {
      id: 1,
      titulo: "Culto de Domingo",
      tipo: "culto",
      data: "24 de Novembro",
      hora: "19:00",
      local: "Templo Principal",
      descricao: "Venha participar do nosso culto dominical com muita adoração e palavra."
    },
    {
      id: 2,
      titulo: "Estudo Bíblico",
      tipo: "ensino",
      data: "26 de Novembro",
      hora: "20:00",
      local: "Sala de Estudos",
      descricao: "Aprofunde-se na palavra de Deus em nosso estudo semanal."
    },
    {
      id: 3,
      titulo: "Vigília de Oração",
      tipo: "oração",
      data: "30 de Novembro",
      hora: "22:00",
      local: "Templo Principal",
      descricao: "Uma noite especial de oração e busca pela presença de Deus."
    }
  ];

  const getTypeColor = (tipo: string) => {
    switch (tipo) {
      case "culto": return "bg-blue-500";
      case "ensino": return "bg-green-500";
      case "oração": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="px-4 lg:px-8 py-8">
        {/* Banner de Título */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Programação</h1>
              <p className="text-white/70">Acompanhe todos os eventos da igreja</p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Botão Adicionar */}
        <div className="mb-6">
          <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Evento
          </Button>
        </div>

        {/* Lista de Eventos */}
        <div className="grid gap-6">
          {eventos.map((evento) => (
            <Card key={evento.id} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{evento.titulo}</h3>
                    <Badge className={`${getTypeColor(evento.tipo)} text-white rounded-full px-3 py-1`}>
                      {evento.tipo}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                      <Bell className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-white/80">
                    <Calendar className="w-4 h-4" />
                    <span>{evento.data}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/80">
                    <Clock className="w-4 h-4" />
                    <span>{evento.hora}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/80">
                    <MapPin className="w-4 h-4" />
                    <span>{evento.local}</span>
                  </div>
                </div>

                <p className="text-white/70">{evento.descricao}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Seção Gerenciar Escala */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 backdrop-blur-xl border-white/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Gerenciar Escala de Serviço</h3>
              <p className="text-white/70 mb-4">Organize e acompanhe sua participação nos ministérios</p>
              <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white">
                Ver Minha Escala
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Programacao;
