import { Calendar, Clock, MapPin, MessageSquare, Star } from "lucide-react";

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {/* Quick Action 1 - Oração */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white hover:scale-[1.02] transition-all duration-500 cursor-pointer group">
        <MessageSquare className="w-6 h-6 mb-4 text-green-400 group-hover:scale-110 transition-transform" />
        <h4 className="font-semibold mb-2">Oração</h4>
        <p className="text-white/70 text-sm">Pedidos especiais</p>
      </div>

      {/* Quick Action 2 - Contribuir */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white hover:scale-[1.02] transition-all duration-500 cursor-pointer group">
        <Star className="w-6 h-6 mb-4 text-yellow-400 group-hover:scale-110 transition-transform" />
        <h4 className="font-semibold mb-2">Contribuir</h4>
        <p className="text-white/70 text-sm">Oferta online</p>
      </div>

      {/* Event 2 - Estudos Bíblicos */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white hover:scale-[1.02] transition-all duration-500">
        <div className="flex items-center justify-between mb-4">
          <Calendar className="w-6 h-6 text-blue-400" />
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">QUA</span>
        </div>
        <h4 className="text-lg font-bold mb-2">Estudos Bíblicos</h4>
        <div className="flex items-center text-white/70 text-sm mb-2">
          <Clock className="w-4 h-4 mr-2" />
          <span>19:30 - 21:00</span>
        </div>
        <div className="flex items-center text-white/70 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          <span>Sala de Estudos</span>
        </div>
      </div>
    </div>
  );
}
