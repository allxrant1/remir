import { useState } from "react";
import { Hand, Plus, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

const Oracao = () => {
  const [nome, setNome] = useState("");
  const [pedido, setPedido] = useState("");
  const { role } = useAuth();

  const pedidosComunidade = [
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
    // Aqui seria a lógica para enviar o pedido
    console.log("Pedido enviado:", { nome, pedido });
    setNome("");
    setPedido("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="px-4 lg:px-8 py-8">
        {/* Banner de Título */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Hand className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Oração</h1>
              <p className="text-white/70">Unidos em oração, fortalecidos na fé</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pedidos" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-xl border-white/20">
            <TabsTrigger value="pedidos" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-white/70">
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="testemunhos" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-white/70">
              Testemunhos
            </TabsTrigger>
            <TabsTrigger value="agenda" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-white/70">
              Agenda
            </TabsTrigger>
            {role === 'social_media' && (
              <TabsTrigger value="moderacao" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white text-white/70">
                Moderação
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="pedidos" className="mt-8">
            {/* Formulário de Novo Pedido */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Plus className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">Novo Pedido de Oração</h3>
                </div>

                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Seu nome (opcional)"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  />
                  
                  <textarea
                    placeholder="Compartilhe seu pedido de oração..."
                    value={pedido}
                    onChange={(e) => setPedido(e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder-white/60 focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
                  />

                  <Button 
                    onClick={handleSubmitPedido}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
                  >
                    Enviar Pedido
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Pedidos da Comunidade */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Pedidos da Comunidade</h3>
              <div className="space-y-4">
                {pedidosComunidade.map((item) => (
                  <Card key={item.id} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-white">{item.nome}</h4>
                        <span className="text-sm text-white/60">{item.data}</span>
                      </div>
                      <p className="text-white/80 mb-4">{item.pedido}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/60">{item.oracoes} pessoas oraram</span>
                        <Button variant="ghost" className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/20">
                          <Heart className="w-4 h-4 mr-2" />
                          Orar por este pedido
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="testemunhos" className="mt-8">
            <div className="space-y-4">
              {testemunhos.map((item) => (
                <Card key={item.id} className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-white">{item.nome}</h4>
                      <span className="text-sm text-white/60">{item.data}</span>
                    </div>
                    <p className="text-white/80">{item.testemunho}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="agenda" className="mt-8">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-4">Agenda de Oração</h3>
                <p className="text-white/70">Em breve você poderá acompanhar os horários de oração da igreja.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {role === 'social_media' && (
            <TabsContent value="moderacao" className="mt-8">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-white mb-4">Moderação</h3>
                  <p className="text-white/70">Área restrita para líderes e moderadores.</p>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Oracao;
