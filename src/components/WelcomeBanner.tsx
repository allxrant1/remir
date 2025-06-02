
export function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-2xl p-8 lg:p-12 text-white shadow-2xl">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dots)" />
          </svg>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Remir
          </h1>
          <p className="text-blue-100 text-lg lg:text-xl font-medium">
            Bem-vindo(a) à nossa família!
          </p>
          <p className="text-blue-200 mt-2 text-sm lg:text-base">
            Que a paz de Cristo seja com você hoje
          </p>
        </div>
      </div>
    </div>
  );
}
