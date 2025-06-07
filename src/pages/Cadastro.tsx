import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserPlus, Mail, Lock, Eye, EyeOff, ArrowLeft, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Cadastro() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Início do handleSubmit de Cadastro');
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    try {
      console.log('Chamando supabase.auth.signUp...');
      // 1. Criar o usuário no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        }
      });

      if (authError) {
        console.error('Erro de autenticação no signUp:', authError);
        throw authError;
      }

      if (authData.user) {
        console.log('Usuário criado no Auth com sucesso:', authData.user.id);
        console.log('Dados do usuário criados automaticamente pelo trigger de banco de dados.');
        toast({
          title: "Conta criada com sucesso!",
          description: "Verifique seu email para confirmar o cadastro.",
        });

        console.log('Navegando para /login');
        navigate("/login");
      }
    } catch (error: any) {
      console.error('Erro geral no catch de Cadastro:', error);
      let errorMessage = "Erro ao criar conta. ";
      
      if (error.message) {
        if (error.message.includes("unique constraint")) {
          errorMessage += "Este email já está em uso.";
        } else if (error.message.includes("Password should be")) {
          errorMessage += "A senha deve ter pelo menos 6 caracteres.";
        } else {
          errorMessage += error.message;
        }
      }
      
      setError(errorMessage);
      toast({
        title: "Erro no cadastro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      console.log('Fim do bloco finally em handleSubmit de Cadastro');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md" role="main" aria-labelledby="registro-title">
      {/* Botão Voltar */}
      <div className="mb-6">
        <Link to="/">
          <Button 
            variant="ghost" 
            className="text-white/80 hover:text-white hover:bg-white/10 p-2"
            aria-label="Voltar para a página inicial"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Voltar ao início
          </Button>
        </Link>
      </div>

      {/* Card de Cadastro */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
        <CardContent className="p-8">
          {/* Logo/Título */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg" aria-hidden="true">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 id="registro-title" className="text-2xl font-bold text-white mb-2">Criar sua conta</h1>
            <p className="text-white/85">Junte-se à nossa comunidade</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6" role="alert">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Nome */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-white">
                Nome Completo
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-white/80 absolute left-3 top-1/2 transform -translate-y-1/2" aria-hidden="true" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder-white/75 pl-10 focus:ring-2 focus:ring-indigo-400 focus:border-transparent h-12"
                  required
                  aria-required="true"
                  aria-describedby="name-hint"
                />
                <span id="name-hint" className="sr-only">Digite seu nome completo para criar a conta</span>
              </div>
            </div>

            {/* Campo Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/80 absolute left-3 top-1/2 transform -translate-y-1/2" aria-hidden="true" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder-white/75 pl-10 focus:ring-2 focus:ring-indigo-400 focus:border-transparent h-12"
                  required
                  aria-required="true"
                  aria-describedby="email-hint"
                />
                <span id="email-hint" className="sr-only">Digite seu endereço de email para criar a conta</span>
              </div>
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-white">
                Senha
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/80 absolute left-3 top-1/2 transform -translate-y-1/2" aria-hidden="true" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder-white/75 pl-10 pr-10 focus:ring-2 focus:ring-indigo-400 focus:border-transparent h-12"
                  required
                  aria-required="true"
                  aria-describedby="password-hint"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white hover:bg-white/10 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                </Button>
                <span id="password-hint" className="sr-only">Digite uma senha segura com pelo menos 6 caracteres</span>
              </div>
            </div>

            {/* Campo Confirmar Senha */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-white">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/80 absolute left-3 top-1/2 transform -translate-y-1/2" aria-hidden="true" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder-white/75 pl-10 pr-10 focus:ring-2 focus:ring-indigo-400 focus:border-transparent h-12"
                  required
                  aria-required="true"
                  aria-describedby="confirm-password-hint"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white hover:bg-white/10 h-8 w-8"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
                  aria-pressed={showConfirmPassword}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                </Button>
                <span id="confirm-password-hint" className="sr-only">Digite sua senha novamente para confirmar</span>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={loading}
              aria-live="polite"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/80 border-t-white rounded-full animate-spin mr-2" />
                  Criando conta...
                </div>
              ) : (
                'Criar Conta'
              )}
            </Button>

            <div className="text-center">
              <p className="text-white/85">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Entrar
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
