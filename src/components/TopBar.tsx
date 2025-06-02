
import { Menu, User } from "lucide-react";

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          <div className="hidden lg:block">
            <p className="text-slate-600">Olá, <span className="font-semibold text-slate-800">Gustavo</span>!</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
