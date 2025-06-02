
import { useState } from "react";
import { User, Edit, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MeuPerfil = () => {
  const [editando, setEditando] = useState(false);
  const [dadosUsuario, setDadosUsuario] = useState({
    nome: "Gustavo",
    sobrenome: "Silva",
    email: "meninosid@gmail.com",
    telefone: "(11) 99999-9999",
    dataNascimento: "1990-05-15",
    endereco: "Rua das Flores, 123 - São Paulo, SP"
  });

  const handleSalvar = () => {
    setEditando(false);
    // Aqui seria a lógica para salvar os dados
    console.log("Dados salvos:", dadosUsuario);
  };

  const handleSair = () => {
    // Aqui seria a lógica para logout
    console.log("Usuário deslogado");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="px-4 lg:px-8 py-8">
        {/* Banner de Perfil */}
        <div className="mb-8">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      Olá, {dadosUsuario.nome}!
                    </h1>
                    <p className="text-white/70">{dadosUsuario.email}</p>
                  </div>
                </div>
                <Button
                  onClick={handleSair}
                  variant="outline"
                  className="bg-red-500/20 border-red-400 text-red-300 hover:bg-red-500/30"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Informações Pessoais */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Informações Pessoais</h2>
              <Button
                onClick={() => editando ? handleSalvar() : setEditando(true)}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Edit className="w-4 h-4 mr-2" />
                {editando ? "Salvar" : "Editar"}
              </Button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome" className="text-white mb-2 block">
                    Nome
                  </Label>
                  <Input
                    id="nome"
                    type="text"
                    value={dadosUsuario.nome}
                    onChange={(e) => setDadosUsuario({ ...dadosUsuario, nome: e.target.value })}
                    disabled={!editando}
                    placeholder="Digite seu nome"
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 disabled:opacity-50 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <Label htmlFor="sobrenome" className="text-white mb-2 block">
                    Sobrenome
                  </Label>
                  <Input
                    id="sobrenome"
                    type="text"
                    value={dadosUsuario.sobrenome}
                    onChange={(e) => setDadosUsuario({ ...dadosUsuario, sobrenome: e.target.value })}
                    disabled={!editando}
                    placeholder="Digite seu sobrenome"
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 disabled:opacity-50 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-white mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={dadosUsuario.email}
                  onChange={(e) => setDadosUsuario({ ...dadosUsuario, email: e.target.value })}
                  disabled={!editando}
                  placeholder="exemplo@email.com"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50 disabled:opacity-50 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <Label htmlFor="telefone" className="text-white mb-2 block">
                  Telefone
                </Label>
                <Input
                  id="telefone"
                  type="tel"
                  value={dadosUsuario.telefone}
                  onChange={(e) => setDadosUsuario({ ...dadosUsuario, telefone: e.target.value })}
                  disabled={!editando}
                  placeholder="(11) 99999-9999"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50 disabled:opacity-50 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <Label htmlFor="dataNascimento" className="text-white mb-2 block">
                  Data de Nascimento
                </Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  value={dadosUsuario.dataNascimento}
                  onChange={(e) => setDadosUsuario({ ...dadosUsuario, dataNascimento: e.target.value })}
                  disabled={!editando}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50 disabled:opacity-50 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              <div>
                <Label htmlFor="endereco" className="text-white mb-2 block">
                  Endereço
                </Label>
                <Input
                  id="endereco"
                  type="text"
                  value={dadosUsuario.endereco}
                  onChange={(e) => setDadosUsuario({ ...dadosUsuario, endereco: e.target.value })}
                  disabled={!editando}
                  placeholder="Rua, número - Cidade, Estado"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50 disabled:opacity-50 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>
            </div>

            {editando && (
              <div className="mt-6 flex space-x-3">
                <Button
                  onClick={handleSalvar}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  Salvar Alterações
                </Button>
                <Button
                  onClick={() => setEditando(false)}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Cancelar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MeuPerfil;
