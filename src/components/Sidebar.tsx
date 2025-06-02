
import { X, Home, Calendar, MessageSquare, User, Heart, CircleUser, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: "Início", href: "#", active: true },
  { icon: Calendar, label: "Programação", href: "#" },
  { icon: MessageSquare, label: "Mensagens", href: "#" },
  { icon: User, label: "Oração", href: "#" },
  { icon: Heart, label: "Contribuições", href: "#" },
  { icon: CircleUser, label: "Comunidade", href: "#" },
  { icon: User, label: "Meu Perfil", href: "#" },
  { icon: CalendarDays, label: "Minha Escala", href: "#" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full w-64 bg-black/80 backdrop-blur-xl border-r border-white/10 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="font-bold text-white text-xl">Remir</span>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                item.active 
                  ? "bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-lg backdrop-blur-sm" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform group-hover:scale-110",
                item.active ? "text-white" : "text-white/70"
              )} />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <p className="text-sm text-white/80 italic">
              "O Senhor é o meu pastor"
            </p>
            <p className="text-xs text-white/60 mt-1">Salmos 23:1</p>
          </div>
        </div>
      </aside>
    </>
  );
}
