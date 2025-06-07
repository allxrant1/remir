import { Menu, Bell } from "lucide-react";

interface ModernTopBarProps {
  onMenuClick: () => void;
}

export function ModernTopBar({ onMenuClick }: ModernTopBarProps) {
  return (
    <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 h-[73px] flex items-center sticky top-0 z-50">
      <div className="flex items-center justify-between w-full px-4 lg:px-8">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMenuClick}
            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <div className="flex items-center">
          <button className="relative p-2 hover:bg-white/10 rounded-xl transition-all duration-300">
            <Bell className="w-5 h-5 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
        </div>
      </div>
    </header>
  );
}
