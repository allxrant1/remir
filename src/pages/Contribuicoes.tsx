
import { useState } from "react";
import { Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Contribuicoes = () => {
  const [tipoSelecionado, setTipoSelecionado] = useState("Dízimo");
  const [valorSelecionado, setValorSelecionado] = useState("");
  const [valorCustomizado, setValorCustomizado] = useState("");

  const tiposContribuicao = [
    { 
      nome: "Dízimo", 
      icon: "💰",
      descricao: "10% dos seus ganhos para Deus"
    },
    { 
      nome: "Oferta", 
      icon: "🙏",
      descricao: "Contribuição voluntária"
    },
    { 
      nome: "Missões", 
      icon: "🌍",
      descricao: "Apoio ao trabalho missionário"
    },
    { 
      nome: "Projetos", 
      icon: "🏗️",
      descricao: "Construção e melhorias"
    }
  ];

  const valoresRapidos = ["25", "50", "100", "200"];

  const handleContribuir = () => {
    const valor = valorCustomizado || valorSelecionado;
    console.log("Contribuição:", { tipo: tipoSelecionado, valor });
    // Aqui seria a integração com o sistema de pagamento
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="px-4 lg:px-8 py-8">
        {/* Banner de Título */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Contribuições</h1>
              <p className="text-white/70">Seja parte da obra de Deus através da generosidade</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Tipos de Contribuição */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Tipo de Contribuição</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tiposContribuicao.map((tipo) => (
                <Card 
                  key={tipo.nome}
                  className={`cursor-pointer transition-all duration-300 ${
                    tipoSelecionado === tipo.nome
                      ? "bg-gradient-to-r from-red-500/30 to-pink-500/30 border-red-400"
                      : "bg-white/10 border-white/20 hover:bg-white/15"
                  } backdrop-blur-xl`}
                  onClick={() => setTipoSelecionado(tipo.nome)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{tipo.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{tipo.nome}</h4>
                        <p className="text-sm text-white/70">{tipo.descricao}</p>
                      </div>
                      {tipoSelecionado === tipo.nome && (
                        <Check className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Valores Rápidos */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Valores Rápidos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {valoresRapidos.map((valor) => (
                <Button
                  key={valor}
                  variant={valorSelecionado === valor ? "default" : "outline"}
                  onClick={() => {
                    setValorSelecionado(valor);
                    setValorCustomizado("");
                  }}
                  className={`rounded-full ${
                    valorSelecionado === valor
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  }`}
                >
                  R$ {valor}
                </Button>
              ))}
            </div>
          </div>

          {/* Valor Personalizado */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Valor Personalizado</h3>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">R$</span>
              <Input
                type="number"
                placeholder="0,00"
                value={valorCustomizado}
                onChange={(e) => {
                  setValorCustomizado(e.target.value);
                  setValorSelecionado("");
                }}
                className="bg-white/10 border-white/20 text-white placeholder-white/60 pl-8 focus:ring-2 focus:ring-red-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Resumo e Botão de Contribuir */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Resumo da Contribuição</h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-white">
                  <span>Tipo:</span>
                  <span className="font-semibold">{tipoSelecionado}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Valor:</span>
                  <span className="font-semibold">
                    R$ {valorCustomizado || valorSelecionado || "0,00"}
                  </span>
                </div>
              </div>
              
              <Button 
                onClick={handleContribuir}
                disabled={!valorCustomizado && !valorSelecionado}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-lg py-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Heart className="w-5 h-5 mr-2" />
                Contribuir Agora
              </Button>
            </CardContent>
          </Card>

          {/* Informações Adicionais */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardContent className="p-6 text-center">
              <p className="text-white/70 text-sm">
                Sua contribuição é segura e será processada com total privacidade. 
                Você receberá um comprovante por email.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contribuicoes;
