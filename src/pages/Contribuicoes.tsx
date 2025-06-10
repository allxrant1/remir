import { useState } from "react";
import { Heart, Check, DollarSign, HandCoins, Globe, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

// Componente de partículas flutuantes (reutilizado da página de Oração)
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

const Contribuicoes = () => {
  const [tipoSelecionado, setTipoSelecionado] = useState("Dízimo");
  const [valorSelecionado, setValorSelecionado] = useState("");
  const [valorCustomizado, setValorCustomizado] = useState("");

  const tiposContribuicao = [
    {
      nome: "Dízimo",
      icon: <HandCoins className="w-6 h-6" />,
      descricao: "10% dos seus ganhos para Deus"
    },
    {
      nome: "Oferta",
      icon: <DollarSign className="w-6 h-6" />,
      descricao: "Contribuição voluntária"
    },
    {
      nome: "Missões",
      icon: <Globe className="w-6 h-6" />,
      descricao: "Apoio ao trabalho missionário"
    },
    {
      nome: "Projetos",
      icon: <Hammer className="w-6 h-6" />,
      descricao: "Construção e melhorias"
    }
  ];

  const valoresRapidos = ["25", "50", "100", "200"];

  const handleContribuir = () => {
    const valor = valorCustomizado || valorSelecionado;
    console.log("Contribuição:", { tipo: tipoSelecionado, valor });
    // Aqui seria a integração com o sistema de pagamento
    alert(`Contribuição de ${tipoSelecionado}: R$ ${valor} enviada! (Simulado)`);
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
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Contribuições</h1>
              <p className="text-white/60 text-sm">Seja parte da obra de Deus através da generosidade</p>
            </div>
          </div>
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Tipos de Contribuição */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Tipo de Contribuição</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tiposContribuicao.map((tipo) => (
                <Card
                  key={tipo.nome}
                  className={`cursor-pointer transition-all duration-300 ${
                    tipoSelecionado === tipo.nome
                      ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-blue-400"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  } backdrop-blur-xl relative overflow-hidden`}
                  onClick={() => setTipoSelecionado(tipo.nome)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-blue-400">{tipo.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{tipo.nome}</h4>
                        <p className="text-sm text-white/70">{tipo.descricao}</p>
                      </div>
                      {tipoSelecionado === tipo.nome && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                          <Check className="w-5 h-5 text-blue-400" />
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Valores Rápidos */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
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
                  className={`rounded-full text-white ${
                    valorSelecionado === valor
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/20"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  R$ {valor}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Valor Personalizado */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
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
                className="bg-white/5 border-white/10 text-white placeholder-white/40 pl-8 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent h-12"
              />
            </div>
          </motion.div>

          {/* Resumo e Botão de Contribuir */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
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
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg py-6 rounded-xl font-semibold shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Contribuir Agora
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Informações Adicionais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-6 text-center">
                <p className="text-white/70 text-sm">
                  Sua contribuição é segura e será processada com total privacidade.
                  Você receberá um comprovante por email.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contribuicoes;
