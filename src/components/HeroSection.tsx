
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Main content */}
      <div className="text-center z-10 px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-7xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 mb-6 leading-none">
            REMIR
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto mb-8"></div>
        </div>
        
        <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6 leading-tight">
          Bem-vindo à nossa
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            família espiritual
          </span>
        </h2>
        
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          Que a paz de Cristo seja com você hoje e sempre. Junte-se a nós nesta jornada de fé, amor e comunhão.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105">
            Participar do Culto
          </button>
          <button className="border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur-sm hover:bg-white/10">
            Conhecer Mais
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-white/60" />
      </div>
    </section>
  );
}
