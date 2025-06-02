
import { useState } from "react";
import { Users, Mail, User, Calendar, MessageSquare, Camera, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Comunidade = () => {
  const ministerios = [
    {
      id: 1,
      nome: "Ministério de Louvor",
      icon: "🎵",
      lider: "Ana Silva",
      membros: 15,
      cronograma: "Domingos 18h",
      email: "louvor@remir.com",
      descricao: "Adoração e música para glorificar a Deus"
    },
    {
      id: 2,
      nome: "Ministério Infantil",
      icon: "👶",
      lider: "Carlos Santos",
      membros: 8,
      cronograma: "Domingos 19h",
      email: "infantil@remir.com",
      descricao: "Cuidado e ensino das crianças"
    },
    {
      id: 3,
      nome: "Ministério de Jovens",
      icon: "🏃",
      lider: "Pedro Costa",
      membros: 22,
      cronograma: "Sábados 19h",
      email: "jovens@remir.com",
      descricao: "Atividades e discipulado para jovens"
    },
    {
      id: 4,
      nome: "Ministério de Intercessão",
      icon: "🙏",
      lider: "Maria Oliveira",
      membros: 12,
      cronograma: "Terças 20h",
      email: "intercessao@remir.com",
      descricao: "Oração e intercessão pela igreja"
    }
  ];

  const comunicados = [
    {
      id: 1,
      titulo: "Retiro Espiritual 2024",
      data: "22 Nov 2024",
      conteudo: "Inscrições abertas para o retiro espiritual que acontecerá de 5 a 7 de dezembro...",
      urgente: true
    },
    {
      id: 2,
      titulo: "Nova Série de Estudos",
      data: "20 Nov 2024",
      conteudo: "Iniciamos uma nova série de estudos sobre os frutos do Espírito...",
      urgente: false
    }
  ];

  const fotos = [
    { id: 1, titulo: "Culto de Ação de Graças", data: "15 Nov 2024" },
    { id: 2, titulo: "Batismo na Praia", data: "10 Nov 2024" },
    { id: 3, titulo: "Encontro de Jovens", data: "5 Nov 2024" }
  ];

  const contatos = [
    {
      nome: "Pastor João Silva",
      cargo: "Pastor Principal",
      telefone: "(11) 99999-9999",
      email: "pastor@remir.com"
    },
    {
      nome: "Secretaria",
      cargo: "Atendimento Geral",
      telefone: "(11) 88888-8888",
      email: "secretaria@remir.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="px-4 lg:px-8 py-8">
        {/* Banner de Título */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Comunidade</h1>
              <p className="text-white/70">Unidos como uma grande família em Cristo</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="ministerios" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-xl border-white/20">
            <TabsTrigger value="ministerios" className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-white/70">
              Ministérios
            </TabsTrigger>
            <TabsTrigger value="comunicados" className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-white/70">
              Comunicados
            </TabsTrigger>
            <TabsTrigger value="galeria" className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-white/70">
              Galeria
            </TabsTrigger>
            <TabsTrigger value="contatos" className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-white/70">
              Contatos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ministerios" className="mt-8">
            <div className="grid gap-6">
              {ministerios.map((ministerio) => (
                <Card key={ministerio.id} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{ministerio.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{ministerio.nome}</h3>
                        <p className="text-white/70 mb-4">{ministerio.descricao}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2 text-white/80">
                            <User className="w-4 h-4" />
                            <span>Líder: {ministerio.lider}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-white/80">
                            <Users className="w-4 h-4" />
                            <span>{ministerio.membros} membros</span>
                          </div>
                          <div className="flex items-center space-x-2 text-white/80">
                            <Calendar className="w-4 h-4" />
                            <span>{ministerio.cronograma}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-green-300">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${ministerio.email}`} className="hover:underline">
                              {ministerio.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comunicados" className="mt-8">
            <div className="space-y-6">
              {comunicados.map((comunicado) => (
                <Card key={comunicado.id} className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-white">{comunicado.titulo}</h3>
                        {comunicado.urgente && (
                          <Badge className="bg-red-500 text-white">Urgente</Badge>
                        )}
                      </div>
                      <span className="text-sm text-white/60">{comunicado.data}</span>
                    </div>
                    <p className="text-white/80">{comunicado.conteudo}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="galeria" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fotos.map((foto) => (
                <Card key={foto.id} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="w-full h-48 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg mb-4 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-white/50" />
                    </div>
                    <h4 className="font-semibold text-white mb-1">{foto.titulo}</h4>
                    <p className="text-sm text-white/60">{foto.data}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contatos" className="mt-8">
            <div className="grid gap-6">
              {contatos.map((contato, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-1">{contato.nome}</h3>
                    <p className="text-green-300 mb-4">{contato.cargo}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 text-white/80">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${contato.telefone}`} className="hover:text-white">
                          {contato.telefone}
                        </a>
                      </div>
                      <div className="flex items-center space-x-3 text-white/80">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${contato.email}`} className="hover:text-white">
                          {contato.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Comunidade;
