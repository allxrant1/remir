
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MinhaEscala = () => {
  const escalas = [
    {
      id: 1,
      titulo: "Culto de Domingo",
      ministerio: "Louvor",
      data: "24 de Novembro",
      hora: "18:30",
      local: "Templo Principal",
      funcao: "Vocal",
      status: "confirmado"
    },
    {
      id: 2,
      titulo: "Ensaio Geral",
      ministerio: "Louvor",
      data: "26 de Novembro",
      hora: "20:00",
      local: "Sala de Ensaio",
      funcao: "Vocal",
      status: "pendente"
    },
    {
      id: 3,
      titulo: "Culto de Quarta",
      ministerio: "Intercessão",
      data: "27 de Novembro",
      hora: "19:30",
      local: "Templo Principal",
      funcao: "Oração",
      status: "confirmado"
    },
    {
      id: 4,
      titulo: "Culto de Domingo",
      ministerio: "Louvor",
      data: "1 de Dezembro",
      hora: "18:30",
      local: "Templo Principal",
      funcao: "Vocal",
      status: "agendado"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado": return "bg-green-500";
      case "pendente": return "bg-yellow-500";
      case "agendado": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmado": return "Confirmado";
      case "pendente": return "Pendente";
      case "agendado": return "Agendado";
      default: return status;
    }
  };

  const getMinisterioColor = (ministerio: string) => {
    switch (ministerio.toLowerCase()) {
      case "louvor": return "text-purple-300";
      case "intercessão": return "text-blue-300";
      case "infantil": return "text-green-300";
      case "jovens": return "text-orange-300";
      default: return "text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="px-4 lg:px-8 py-8">
        {/* Banner de Título */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Minha Escala</h1>
              <p className="text-white/70">Acompanhe seus compromissos nos ministérios</p>
            </div>
          </div>
        </div>

        {/* Resumo Rápido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white">4</div>
              <p className="text-white/70 text-sm">Próximos Compromissos</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">2</div>
              <p className="text-white/70 text-sm">Confirmados</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">1</div>
              <p className="text-white/70 text-sm">Pendentes</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Escalas */}
        <div className="space-y-6">
          {escalas.map((escala) => (
            <Card key={escala.id} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{escala.titulo}</h3>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`font-semibold ${getMinisterioColor(escala.ministerio)}`}>
                        {escala.ministerio}
                      </span>
                      <span className="text-white/60">•</span>
                      <span className="text-white/80">{escala.funcao}</span>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(escala.status)} text-white px-3 py-1 rounded-full`}>
                    {getStatusText(escala.status)}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 text-white/80">
                    <Calendar className="w-4 h-4" />
                    <span>{escala.data}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/80">
                    <Clock className="w-4 h-4" />
                    <span>{escala.hora}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/80">
                    <MapPin className="w-4 h-4" />
                    <span>{escala.local}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Informações Adicionais */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Precisa de Ajuda?</h3>
            <p className="text-white/70 mb-4">
              Entre em contato com o líder do seu ministério para esclarecer dúvidas sobre sua escala.
            </p>
            <div className="flex items-center justify-center space-x-2 text-blue-300">
              <User className="w-4 h-4" />
              <span>Líder do Louvor: Ana Silva</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MinhaEscala;
