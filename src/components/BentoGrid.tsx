
import { Calendar, Clock, MapPin, Heart, BookOpen, Users, MessageSquare, Star } from "lucide-react";

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
      {/* Verse Card - Large */}
      <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-orange-500 via-pink-500 to-red-500 rounded-3xl p-8 text-white relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
        <div className="relative z-10">
          <BookOpen className="w-8 h-8 mb-6 opacity-80" />
          <h3 className="text-sm font-semibold mb-4 opacity-80">VERSÍCULO DO DIA</h3>
          <blockquote className="text-2xl lg:text-3xl font-bold mb-6 leading-tight">
            "O Senhor é o meu pastor, nada me faltará"
          </blockquote>
          <p className="text-lg font-semibold opacity-90">Salmos 23:1</p>
        </div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      </div>

      {/* Come as You Are - Medium */}
      <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
        <div className="relative z-10 h-full flex flex-col justify-between">
          <Heart className="w-8 h-8 mb-4 opacity-80" />
          <div>
            <h3 className="text-xl lg:text-2xl font-bold mb-4">
              "Venha como você está"
            </h3>
            <p className="text-white/90 leading-relaxed">
              Deus tem um propósito especial para sua vida.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="lg:col-span-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white hover:scale-[1.02] transition-all duration-500">
        <Users className="w-6 h-6 mb-4 text-blue-400" />
        <div className="text-3xl font-bold mb-2">1.2k+</div>
        <p className="text-white/70 text-sm">Membros Ativos</p>
      </div>

      {/* Quick Action 1 */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white hover:scale-[1.02] transition-all duration-500 cursor-pointer group">
        <MessageSquare className="w-6 h-6 mb-4 text-green-400 group-hover:scale-110 transition-transform" />
        <h4 className="font-semibold mb-2">Oração</h4>
        <p className="text-white/70 text-sm">Pedidos especiais</p>
      </div>

      {/* Event 1 */}
      <div className="md:col-span-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white hover:scale-[1.02] transition-all duration-500">
        <div className="flex items-center justify-between mb-4">
          <Calendar className="w-6 h-6 text-purple-400" />
          <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">HOJE</span>
        </div>
        <h4 className="text-lg font-bold mb-2">Culto de Domingo</h4>
        <div className="flex items-center text-white/70 text-sm mb-2">
          <Clock className="w-4 h-4 mr-2" />
          <span>10:00 - 12:00</span>
        </div>
        <div className="flex items-center text-white/70 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          <span>Santuário Principal</span>
        </div>
      </div>

      {/* Quick Action 2 */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white hover:scale-[1.02] transition-all duration-500 cursor-pointer group">
        <Star className="w-6 h-6 mb-4 text-yellow-400 group-hover:scale-110 transition-transform" />
        <h4 className="font-semibold mb-2">Contribuir</h4>
        <p className="text-white/70 text-sm">Oferta online</p>
      </div>

      {/* Event 2 */}
      <div className="md:col-span-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-white hover:scale-[1.02] transition-all duration-500">
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

      {/* Community Stats */}
      <div className="lg:col-span-1 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white hover:scale-[1.02] transition-all duration-500">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">98%</div>
          <p className="text-green-100 text-sm">Satisfação</p>
        </div>
      </div>
    </div>
  );
}
