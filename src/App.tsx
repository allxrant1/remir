
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Programacao from "./pages/Programacao";
import Mensagens from "./pages/Mensagens";
import Oracao from "./pages/Oracao";
import Contribuicoes from "./pages/Contribuicoes";
import Comunidade from "./pages/Comunidade";
import MeuPerfil from "./pages/MeuPerfil";
import MinhaEscala from "./pages/MinhaEscala";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/programacao" element={<Programacao />} />
          <Route path="/mensagens" element={<Mensagens />} />
          <Route path="/oracao" element={<Oracao />} />
          <Route path="/contribuicoes" element={<Contribuicoes />} />
          <Route path="/comunidade" element={<Comunidade />} />
          <Route path="/meu-perfil" element={<MeuPerfil />} />
          <Route path="/minha-escala" element={<MinhaEscala />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
