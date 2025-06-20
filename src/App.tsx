import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { PrivateRoute } from "@/components/PrivateRoute";
import { Layout } from "@/components/Layout";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "./components/ui/button";
import { CalendarIcon, HomeIcon, UsersIcon } from "lucide-react";

// Páginas
import Index from "@/pages/Index";
import Programacao from "@/pages/Programacao";
import Mensagens from "@/pages/Mensagens";
import Oracao from "@/pages/Oracao";
import Contribuicoes from "@/pages/Contribuicoes";
import Comunidade from "@/pages/Comunidade";
import MeuPerfil from "@/pages/MeuPerfil";
import MinhaEscala from "@/pages/MinhaEscala";
import Login from "@/pages/Login";
import Cadastro from "@/pages/Cadastro";
import RecuperarSenha from "@/pages/RecuperarSenha";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NotificationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Rotas de autenticação com Layout de auth */}
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/cadastro" element={<Cadastro />} />
                  <Route path="/recuperar-senha" element={<RecuperarSenha />} />
                </Route>

                {/* Rotas protegidas com Layout principal */}
                <Route element={<Layout />}>
                  {/* Rotas públicas */}
                  <Route path="/" element={<Index />} />
                  <Route path="/programacao" element={<Programacao />} />
                  <Route path="/mensagens" element={<Mensagens />} />
                  <Route path="/contribuicoes" element={<Contribuicoes />} />
                  <Route path="/comunidade" element={<Comunidade />} />

                  {/* Rotas para membros */}
                  <Route
                    path="/oracao"
                    element={
                      <PrivateRoute
                        allowedRoles={[
                          "member",
                          "ministry_user",
                          "ministry_leader",
                          "social_media",
                        ]}
                      >
                        <Oracao />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/meu-perfil"
                    element={
                      <PrivateRoute
                        allowedRoles={[
                          "member",
                          "ministry_user",
                          "ministry_leader",
                          "social_media",
                        ]}
                      >
                        <MeuPerfil />
                      </PrivateRoute>
                    }
                  />

                  {/* Rotas para usuários de ministério */}
                  <Route
                    path="/minha-escala"
                    element={
                      <PrivateRoute
                        allowedRoles={["ministry_user", "ministry_leader"]}
                      >
                        <MinhaEscala />
                      </PrivateRoute>
                    }
                  />

                  {/* Rotas para líderes de ministério */}
                  <Route
                    path="/gestao-ministerio"
                    element={
                      <PrivateRoute allowedRoles={["ministry_leader"]}>
                        <div>Gestão de Ministério</div>
                      </PrivateRoute>
                    }
                  />
                </Route>

                {/* Rota 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </NotificationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
