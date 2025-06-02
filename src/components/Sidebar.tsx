
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
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full w-64 bg-white/95 backdrop-blur-md border-r border-blue-100 shadow-xl z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-semibold text-slate-800 text-lg">Remir</span>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
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
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25" 
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform group-hover:scale-110",
                item.active ? "text-white" : "text-slate-500"
              )} />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <p className="text-sm text-slate-600 italic">
              "O Senhor é o meu pastor"
            </p>
            <p className="text-xs text-slate-500 mt-1">Salmos 23:1</p>
          </div>
        </div>
      </aside>
    </>
  );
}
