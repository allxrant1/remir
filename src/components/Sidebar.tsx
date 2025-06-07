import { X, Home, Calendar, MessageSquare, User, Heart, CircleUser, CalendarDays, Settings, Users, FileText, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  icon: any;
  label: string;
  href: string;
  roles: string[];
}

// Menu items para usuários autenticados
const authenticatedMenuItems: MenuItem[] = [
  { icon: Home, label: "Início", href: "/", roles: ['visitor', 'member', 'ministry_user', 'ministry_leader', 'social_media'] },
  { icon: Calendar, label: "Programação", href: "/programacao", roles: ['visitor', 'member', 'ministry_user', 'ministry_leader', 'social_media'] },
  { icon: MessageSquare, label: "Mensagens", href: "/mensagens", roles: ['visitor', 'member', 'ministry_user', 'ministry_leader', 'social_media'] },
  { icon: User, label: "Oração", href: "/oracao", roles: ['member', 'ministry_user', 'ministry_leader', 'social_media'] },
  { icon: Heart, label: "Contribuições", href: "/contribuicoes", roles: ['visitor', 'member', 'ministry_user', 'ministry_leader', 'social_media'] },
  { icon: CircleUser, label: "Comunidade", href: "/comunidade", roles: ['visitor', 'member', 'ministry_user', 'ministry_leader', 'social_media'] },
  { icon: User, label: "Meu Perfil", href: "/meu-perfil", roles: ['member', 'ministry_user', 'ministry_leader', 'social_media'] },
  { icon: CalendarDays, label: "Minha Escala", href: "/minha-escala", roles: ['ministry_user', 'ministry_leader'] },
  { icon: Users, label: "Gestão de Ministério", href: "/gestao-ministerio", roles: ['ministry_leader'] },
  { icon: FileText, label: "Gestão de Conteúdo", href: "/gestao-conteudo", roles: ['social_media'] },
  { icon: Settings, label: "Configurações", href: "/configuracoes", roles: ['ministry_leader', 'social_media'] },
];

// Menu items para visitantes
const publicMenuItems: MenuItem[] = [
  { icon: Home, label: "Início", href: "/", roles: ['visitor'] },
  { icon: Calendar, label: "Programação", href: "/programacao", roles: ['visitor'] },
  { icon: MessageSquare, label: "Mensagens", href: "/mensagens", roles: ['visitor'] },
  { icon: Heart, label: "Contribuições", href: "/contribuicoes", roles: ['visitor'] },
  { icon: CircleUser, label: "Comunidade", href: "/comunidade", roles: ['visitor'] },
];

// Opções de autenticação para usuários não logados
const authMenuItems: MenuItem[] = [
  { icon: LogIn, label: "Entrar", href: "/login", roles: ['visitor'] },
  { icon: UserPlus, label: "Criar Conta", href: "/cadastro", roles: ['visitor'] },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { user, role } = useAuth();

  // Seleciona os itens do menu baseado no estado de autenticação
  const menuItems = user ? authenticatedMenuItems : publicMenuItems;
  const filteredMenuItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full w-64 bg-black/80 backdrop-blur-xl border-r border-white/10 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between h-[73px] px-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="font-bold text-white text-xl">Remir</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {/* Menu principal */}
          {filteredMenuItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={index}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-lg backdrop-blur-sm" 
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-transform group-hover:scale-110",
                  isActive ? "text-white" : "text-white/70"
                )} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}

          {/* Opções de autenticação para usuários não logados */}
          {!user && (
            <>
              <div className="h-px bg-white/10 my-4" />
              {authMenuItems.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={`auth-${index}`}
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                      isActive 
                        ? "bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-lg backdrop-blur-sm" 
                        : "text-white/70 hover:bg-white/10 hover:text-white",
                      item.label === "Criar Conta" ? "bg-blue-600/20" : ""
                    )}
                  >
                    <item.icon className={cn(
                      "w-5 h-5 transition-transform group-hover:scale-110",
                      isActive ? "text-white" : "text-white/70"
                    )} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
