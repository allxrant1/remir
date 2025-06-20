import React from "react";

interface Filtros {
  tipo: string;
  data: string;
  pesquisa: string;
}

interface FilterBarProps {
  filtros: Filtros;
  onFiltroChange: (campo: keyof Filtros, valor: string) => void;
}

/**
 * Componente responsável pelos filtros da lista de eventos.
 * Centraliza UI e lógica de manipulação de filtro, permitindo
 * reutilização em outras telas e deixando a página mais enxuta.
 */
const FilterBar: React.FC<FilterBarProps> = ({ filtros, onFiltroChange }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-8 text-white">
      <h2 className="text-xl font-semibold mb-4">Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tipo */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Tipo</label>
          <select
            className="w-full max-w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
            value={filtros.tipo}
            onChange={(e) => onFiltroChange("tipo", e.target.value)}
          >
            <option value="">Todas as categorias</option>
            <option value="Cultos">Cultos</option>
            <option value="Ensino">Ensino</option>
            <option value="Oração">Oração</option>
            <option value="Eventos">Eventos</option>
          </select>
        </div>

        {/* Data */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Data</label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
            value={filtros.data}
            onChange={(e) => onFiltroChange("data", e.target.value)}
          />
        </div>

        {/* Pesquisa */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Pesquisar</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar eventos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
              value={filtros.pesquisa}
              onChange={(e) => onFiltroChange("pesquisa", e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* Ícone de pesquisa inline para não depender de libs */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar; 