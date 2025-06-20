import { useState, useRef } from "react";
import { Users, Mail, User, Calendar, MessageSquare, Camera, Phone, Plus, Heart, Check, Lightbulb, Image, BellRing, PhoneCall, Trash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "@/contexts/NotificationContext";

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

const Comunidade = () => {
  const { role } = useAuth();
  const { addNotification } = useNotification();

  const fileInputRef = useRef<HTMLInputElement>(null); // Ref para o input de arquivo

  const [activeFilter, setActiveFilter] = useState("ministerios");

  const [newComunicadoTitulo, setNewComunicadoTitulo] = useState("");
  const [newComunicadoConteudo, setNewComunicadoConteudo] = useState("");
  const [newComunicadoUrgente, setNewComunicadoUrgente] = useState(false);

  const [newFotoTitulo, setNewFotoTitulo] = useState("");
  const [newFotoFile, setNewFotoFile] = useState<File | null>(null);

  const initialComunicados = [
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

  const [comunicados, setComunicados] = useState(initialComunicados);

  const fotos = [
    { id: 1, titulo: "Culto de Ação de Graças", data: "15 Nov 2024", imageUrl: "https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=Culto" },
    { id: 2, titulo: "Batismo na Praia", data: "10 Nov 2024", imageUrl: "https://via.placeholder.com/300x200/50E3C2/FFFFFF?text=Batismo" },
    { id: 3, titulo: "Encontro de Jovens", data: "5 Nov 2024", imageUrl: "https://via.placeholder.com/300x200/F5A623/FFFFFF?text=Jovens" }
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

  const filters = [
    { id: "ministerios", label: "Ministérios", icon: <Users className="w-4 h-4" /> },
    { id: "comunicados", label: "Comunicados", icon: <BellRing className="w-4 h-4" /> },
    { id: "galeria", label: "Galeria", icon: <Camera className="w-4 h-4" /> },
    { id: "contatos", label: "Contatos", icon: <PhoneCall className="w-4 h-4" /> },
  ];

  const handleAddComunicado = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComunicadoTitulo.trim() || !newComunicadoConteudo.trim()) return;

    const novo = {
      id: Date.now(),
      titulo: newComunicadoTitulo,
      conteudo: newComunicadoConteudo,
      urgente: newComunicadoUrgente,
      data: "agora",
    };

    setComunicados((prev) => [novo, ...prev]);
    addNotification("Novo comunicado publicado");

    setNewComunicadoTitulo("");
    setNewComunicadoConteudo("");
    setNewComunicadoUrgente(false);
  };

  const handleAddFoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFotoFile || !newFotoTitulo.trim()) return;

    addNotification("Nova foto adicionada na galeria");
    setNewFotoTitulo("");
    setNewFotoFile(null);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click(); // Aciona o clique no input de arquivo oculto
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewFotoFile(e.target.files[0]);
    }
  };

  const ministerios = [
    {
      id: 1,
      nome: "Ministério de Louvor",
      icon: <Lightbulb className="w-6 h-6" />,
      lider: "Ana Silva",
      membros: 15,
      cronograma: "Domingos 18h",
      email: "louvor@remir.com",
      descricao: "Adoração e música para glorificar a Deus"
    },
    {
      id: 2,
      nome: "Ministério Infantil",
      icon: <Users className="w-6 h-6" />,
      lider: "Carlos Santos",
      membros: 8,
      cronograma: "Domingos 19h",
      email: "infantil@remir.com",
      descricao: "Cuidado e ensino das crianças"
    },
    {
      id: 3,
      nome: "Ministério de Jovens",
      icon: <User className="w-6 h-6" />,
      lider: "Pedro Costa",
      membros: 22,
      cronograma: "Sábados 19h",
      email: "jovens@remir.com",
      descricao: "Atividades e discipulado para jovens"
    },
    {
      id: 4,
      nome: "Ministério de Intercessão",
      icon: <Heart className="w-6 h-6" />,
      lider: "Maria Oliveira",
      membros: 12,
      cronograma: "Terças 20h",
      email: "intercessao@remir.com",
      descricao: "Oração e intercessão pela igreja"
    }
  ];

  const handleDeleteComunicado = (id: number) => {
    setComunicados((prev) => prev.filter((c) => c.id !== id));
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
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Comunidade</h1>
              <p className="text-white/60 text-sm">Unidos como uma grande família em Cristo</p>
            </div>
          </div>
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>

        {/* Filtros */}
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

        {/* Conteúdo Condicional */}
        {activeFilter === "ministerios" && (
          <div className="grid gap-4">
            {ministerios.map((ministerio, index) => (
              <motion.div
                key={ministerio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/8 transition-all duration-300 hover:scale-[1.01] shadow-lg">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="text-3xl text-blue-400">{ministerio.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">{ministerio.nome}</h3>
                        <p className="text-white/70 mb-3 text-sm">{ministerio.descricao}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm mb-4">
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
                          <div className="flex items-center space-x-2 text-white/80">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${ministerio.email}`} className="hover:underline">
                              {ministerio.email}
                            </a>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border-none"
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Entrar em Contato
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeFilter === "comunicados" && (
          <div className="space-y-6">
            {role === "social_media" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-xl border-white/10 rounded-xl p-6 shadow-lg"
              >
                <h2 className="text-xl font-bold text-white mb-4">Novo Comunicado</h2>
                <form onSubmit={handleAddComunicado} className="space-y-4">
                  <div>
                    <Label htmlFor="comunicadoTitulo" className="text-white/80">Título</Label>
                    <Input
                      id="comunicadoTitulo"
                      value={newComunicadoTitulo}
                      onChange={(e) => setNewComunicadoTitulo(e.target.value)}
                      placeholder="Título do comunicado"
                      className="bg-white/5 border-white/10 text-white placeholder-white/40 focus:ring-blue-500/50 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <Label htmlFor="comunicadoConteudo" className="text-white/80">Conteúdo</Label>
                    <Textarea
                      id="comunicadoConteudo"
                      value={newComunicadoConteudo}
                      onChange={(e) => setNewComunicadoConteudo(e.target.value)}
                      placeholder="Detalhes do comunicado"
                      className="bg-white/5 border-white/10 text-white placeholder-white/40 focus:ring-blue-500/50 focus:border-transparent min-h-[100px]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="urgente" className="text-white/80">Urgente</Label>
                    <Switch
                      id="urgente"
                      checked={newComunicadoUrgente}
                      onCheckedChange={setNewComunicadoUrgente}
                      className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-white/20"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border-none"
                  >
                    Adicionar Comunicado
                  </Button>
                </form>
              </motion.div>
            )}
            
            {comunicados.map((comunicado, index) => (
              <motion.div
                key={comunicado.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/8 transition-all duration-300 hover:scale-[1.01] shadow-lg overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex items-start space-x-4">
                      <div className="text-blue-400 mt-1">
                        <BellRing className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-white">{comunicado.titulo}</h3>
                          <div className="flex items-center gap-2">
                            {comunicado.urgente && (
                              <Badge className="bg-red-500/20 text-red-400 border-red-400/50 px-2 py-0.5 rounded-full">
                                Urgente
                              </Badge>
                            )}
                            {role === "social_media" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteComunicado(comunicado.id)}
                                className="text-red-400 hover:bg-red-500/10"
                              >
                                <Trash className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <p className="text-white/70 text-sm mb-2">{comunicado.conteudo}</p>
                        <p className="text-white/50 text-xs">Publicado em {comunicado.data}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeFilter === "galeria" && (
          <div className="space-y-6">
            {role === "social_media" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-xl border-white/10 rounded-xl p-6 shadow-lg"
              >
                <h2 className="text-xl font-bold text-white mb-4">Adicionar Nova Foto</h2>
                <form onSubmit={handleAddFoto} className="space-y-4">
                  <div>
                    <Label htmlFor="fotoTitulo" className="text-white/80">Título da Foto</Label>
                    <Input
                      id="fotoTitulo"
                      value={newFotoTitulo}
                      onChange={(e) => setNewFotoTitulo(e.target.value)}
                      placeholder="Nome da foto"
                      className="bg-white/5 border-white/10 text-white placeholder-white/40 focus:ring-blue-500/50 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fotoFile" className="text-white/80">Arquivo da Imagem</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="fotoFile"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        onClick={handleFileButtonClick}
                        variant="outline"
                        className="flex items-center px-6 py-3 rounded-lg bg-white/10 text-white/80 hover:bg-white/20 transition-colors duration-200 whitespace-nowrap flex-shrink-0"
                      >
                        <Image className="mr-2 h-4 w-4" />
                        Escolher arquivo
                      </Button>
                      {newFotoFile && (
                        <span className="text-white/70 text-sm flex-grow">
                          {newFotoFile.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border-none"
                  >
                    Adicionar Foto
                  </Button>
                </form>
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {fotos.map((foto, index) => (
                <motion.div
                  key={foto.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/8 transition-all duration-300 hover:scale-[1.01] shadow-lg overflow-hidden">
                    <CardContent className="p-3">
                      <div className="relative w-full h-40 bg-gray-700 rounded-lg overflow-hidden mb-3">
                        <img src={foto.imageUrl} alt={foto.titulo} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                          <h3 className="text-white font-semibold text-lg leading-tight">{foto.titulo}</h3>
                        </div>
                      </div>
                      <p className="text-white/60 text-sm">{foto.data}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeFilter === "contatos" && (
          <div className="grid gap-4 md:grid-cols-2">
            {contatos.map((contato, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/8 transition-all duration-300 hover:scale-[1.01] shadow-lg">
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2">{contato.nome}</h3>
                    <p className="text-blue-300 font-semibold text-sm mb-3">{contato.cargo}</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-white/70">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${contato.telefone}`} className="hover:underline">
                          {contato.telefone}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2 text-white/70">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${contato.email}`} className="hover:underline">
                          {contato.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comunidade;
