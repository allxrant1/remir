import { Notification } from "@/contexts/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, FileText, Camera, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RefObject, useLayoutEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
  anchorRef: RefObject<HTMLButtonElement>;
}

function iconFor(message: string) {
  if (message.includes("foto")) return <Camera className="w-4 h-4" />;
  if (message.includes("comunicado")) return <FileText className="w-4 h-4" />;
  if (message.includes("mensagem")) return <MessageCircle className="w-4 h-4" />;
  return <Bell className="w-4 h-4" />;
}

export default function NotificationsModal({ open, onClose, notifications, anchorRef }: Props) {
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (open && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + 8, left: rect.right - 300 }); // align right edge, width 300
    }
  }, [open, anchorRef]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* modal */}
          <motion.div
            className="fixed bg-gray-800 text-gray-100 w-80 max-w-[95vw] rounded-xl p-5 z-[61] shadow-xl border border-white/10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{ top: coords.top, left: coords.left }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Notificações</h3>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {notifications.length === 0 ? (
              <p className="text-sm text-gray-300">Nenhuma notificação.</p>
            ) : (
              <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <li key={n.id} className="flex items-start gap-3 p-2 rounded hover:bg-white/5">
                    <div className="mt-1 text-blue-400">{iconFor(n.message)}</div>
                    <div className="flex-1">
                      <p className="text-sm leading-snug text-gray-100">{n.message}</p>
                      <span className="text-xs text-gray-400">
                        {n.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 