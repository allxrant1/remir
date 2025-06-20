import { Menu, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";
import { useState, useRef } from "react";
import NotificationsModal from "@/components/NotificationsModal";

interface ModernTopBarProps {
  onMenuClick: () => void;
}

export function ModernTopBar({ onMenuClick }: ModernTopBarProps) {
  const { user } = useAuth();
  const { unreadCount, markAllRead, notifications } = useNotification();
  const [open, setOpen] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);

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
        
        {user && (
          <div className="flex items-center">
            <button
              className="relative p-2 hover:bg-white/10 rounded-xl transition-all duration-300"
              onClick={() => {
                setOpen(true);
                markAllRead();
              }}
              ref={bellRef}
            >
              <Bell className="w-5 h-5 text-white" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 min-w-[18px] h-4 px-1 bg-red-500 text-[10px] flex items-center justify-center rounded-full">
                  {unreadCount}
                </div>
              )}
            </button>
            <NotificationsModal open={open} onClose={() => setOpen(false)} notifications={notifications} anchorRef={bellRef} />
          </div>
        )}
      </div>
    </header>
  );
}
