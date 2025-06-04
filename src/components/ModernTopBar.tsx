
import { User, Bell, Search } from "lucide-react";

interface ModernTopBarProps {
  onMenuClick: () => void;
}

export function ModernTopBar({ onMenuClick }: ModernTopBarProps) {
  return (
    <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 px-4 lg:px-8 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 text-white/60 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-64"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-white/10 rounded-xl transition-all duration-300">
            <Bell className="w-5 h-5 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right hidden lg:block">
              <p className="text-white font-semibold">Gustavo</p>
              <p className="text-white/60 text-sm">Membro</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center ring-2 ring-white/20">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
