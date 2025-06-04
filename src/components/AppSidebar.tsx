
import { Home, Calendar, MessageSquare, User, Heart, CircleUser, CalendarDays } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { icon: Home, label: "Início", href: "/" },
  { icon: Calendar, label: "Programação", href: "/programacao" },
  { icon: MessageSquare, label: "Mensagens", href: "/mensagens" },
  { icon: User, label: "Oração", href: "/oracao" },
  { icon: Heart, label: "Contribuições", href: "/contribuicoes" },
  { icon: CircleUser, label: "Comunidade", href: "/comunidade" },
  { icon: User, label: "Meu Perfil", href: "/meu-perfil" },
  { icon: CalendarDays, label: "Minha Escala", href: "/minha-escala" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="bg-black/80 backdrop-blur-xl border-r border-white/10 shadow-2xl">
      <SidebarHeader className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <span className="font-bold text-white text-xl">Remir</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
                        ${isActive 
                          ? "bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-lg backdrop-blur-sm" 
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                        }
                      `}
                    >
                      <Link to={item.href}>
                        <item.icon className={`
                          w-5 h-5 transition-transform group-hover:scale-110
                          ${isActive ? "text-white" : "text-white/70"}
                        `} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <p className="text-sm text-white/80 italic">
            "O Senhor é o meu pastor"
          </p>
          <p className="text-xs text-white/60 mt-1">Salmos 23:1</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
