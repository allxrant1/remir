import { useState } from "react";
import { ArrowLeft, Mail, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/login',
      });

      if (error) throw error;

      setSuccess(true);
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível enviar o email de recuperação.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md" role="main" aria-labelledby="recovery-title">
      {/* Botão Voltar */}
      <div className="mb-6">
        <Link to="/login">
          <Button 
            variant="ghost" 
            className="text-white/85 hover:text-white hover:bg-white/10 p-2"
            aria-label="Voltar para a página de login"
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Voltar ao login
          </Button>
        </Link>
      </div>

      {/* Card de Recuperação */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
        <CardContent className="p-8">
          {/* Logo/Título */}
          <div className="text-center mb-8">
            <div 
              className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
              aria-hidden="true"
            >
              <RotateCw className="w-8 h-8 text-white" />
            </div>
            <h1 id="recovery-title" className="text-2xl font-bold text-white mb-2">Recuperar Senha</h1>
            <p className="text-white/85">
              {success 
                ? "Verifique seu email para redefinir sua senha" 
                : "Digite seu email para recuperar sua senha"}
            </p>
          </div>

          {success ? (
            <Alert 
              className="bg-green-500/20 border-green-500/30 text-green-200"
              role="alert"
              aria-live="polite"
            >
              <AlertDescription>
                Um email com instruções para redefinir sua senha foi enviado para {email}
              </AlertDescription>
            </Alert>
          ) : (
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
                    className="bg-white/10 border-white/20 text-white placeholder-white/80 pl-10 focus:ring-2 focus:ring-amber-400 focus:border-transparent h-12"
                    required
                    aria-required="true"
                    aria-describedby="email-hint"
                    disabled={loading}
                  />
                  <span id="email-hint" className="sr-only">Digite o endereço de email associado à sua conta para receber as instruções de recuperação de senha</span>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={loading}
                aria-live="polite"
              >
                {loading ? (
                  <div className="flex items-center justify-center" role="status">
                    <div 
                      className="w-5 h-5 border-2 border-white/80 border-t-white rounded-full animate-spin mr-2"
                      aria-hidden="true"
                    />
                    <span>Enviando...</span>
                    <span className="sr-only">Aguarde, enviando email de recuperação</span>
                  </div>
                ) : (
                  'Enviar email de recuperação'
                )}
              </Button>
            </form>
          )}
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
