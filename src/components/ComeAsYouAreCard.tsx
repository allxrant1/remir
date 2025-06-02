
export function ComeAsYouAreCard() {
  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 group">
      <div className="text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C12 2 8 7 8 11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11C16 7 12 2 12 2Z"/>
            <path d="M12 18C10.3431 18 9 19.3431 9 21C9 21.5523 9.44772 22 10 22H14C14.5523 22 15 21.5523 15 21C15 19.3431 13.6569 18 12 18Z"/>
            <path d="M12 15V18"/>
          </svg>
        </div>
        
        {/* Content */}
        <div>
          <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-3">
            "Venha como você está"
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Deus tem um propósito especial para sua vida. Junte-se a nós nesta jornada de fé!
          </p>
        </div>
      </div>
    </div>
  );
}
