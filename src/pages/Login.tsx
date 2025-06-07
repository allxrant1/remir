import { useState, useEffect } from "react";
import { Lock, Mail, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Início do handleSubmit');
    setError("");
    setIsLoading(true);
    
    try {
      console.log('Chamando signInWithPassword...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log('Resposta de signInWithPassword recebida:', { data, error });

      if (error) {
        console.error('Erro de login:', error);
        throw error;
      }

      if (data.user) {
        console.log('Login bem-sucedido para o usuário:', data.user.id);
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta!",
          duration: 3000,
        });
        navigate("/");
      }
    } catch (error: any) {
      console.error('Erro detalhado no catch:', error);
      let errorMessage = "";
      
      if (error.message) {
        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Email ou senha incorretos.";
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage = "Por favor, confirme seu email antes de fazer login.";
        } else {
          errorMessage = error.message;
        }
      } else {
        errorMessage = "Erro ao fazer login. Verifique suas credenciais.";
      }
      
      setError(errorMessage);
      toast({
        title: "Erro no login",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      console.log('Fim do bloco finally em handleSubmit');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md" role="main" aria-labelledby="login-title">
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

      {/* Card de Login */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
        <CardContent className="p-8">
          {/* Logo/Título */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg" aria-hidden="true">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 id="login-title" className="text-2xl font-bold text-white mb-2">Bem-vindo de volta</h1>
            <p className="text-white/85">Entre na sua conta para continuar</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6" role="alert">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-white/75 pl-10 focus:ring-2 focus:ring-green-400 focus:border-transparent h-12"
                  required
                  aria-required="true"
                  aria-describedby="email-hint"
                  disabled={isLoading}
                />
                <span id="email-hint" className="sr-only">Digite seu endereço de email para entrar</span>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-white/75 pl-10 pr-10 focus:ring-2 focus:ring-green-400 focus:border-transparent h-12"
                  required
                  aria-required="true"
                  aria-describedby="password-hint"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white hover:bg-white/10 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showPassword}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                </Button>
                <span id="password-hint" className="sr-only">Digite sua senha para entrar</span>
              </div>
            </div>

            {/* Link Esqueci a Senha */}
            <div className="text-right">
              <Link to="/recuperar-senha">
                <Button variant="link" className="text-green-300 hover:text-green-200 p-0 h-auto font-medium" disabled={isLoading}>
                  Esqueci minha senha
                </Button>
              </Link>
            </div>

            {/* Botão de Login */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-12 text-base font-semibold"
              aria-live="polite"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/60 border-t-white rounded-full animate-spin mr-2" aria-hidden="true" />
                  <span>Entrando...</span>
                </div>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          {/* Divisor */}
          <div className="relative my-8" role="separator" aria-hidden="true">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-transparent px-4 text-white/80">ou</span>
            </div>
          </div>

          {/* Registro */}
          <div className="text-center">
            <p className="text-white/85">
              Não tem uma conta?{" "}
              <Link to="/cadastro">
                <Button variant="link" className="text-green-300 hover:text-green-200 p-0 h-auto font-medium" disabled={isLoading}>
                  Cadastre-se aqui
                </Button>
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-white/75 text-sm">
          © 2024 Igreja REMIR. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
