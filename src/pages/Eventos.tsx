import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Evento {
  id: string;
  titulo: string;
  categoria: 'workshop' | 'palestra' | 'curso' | 'hackathon' | 'mentoria';
  data: string;
  local: string;
  participantes: number;
  descricao: string;
}

export default function Eventos() {
  const { user } = useAuth();
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtros, setFiltros] = useState({
    categoria: '',
    data: '',
    pesquisa: '',
    filtroRapido: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [novoEvento, setNovoEvento] = useState<Partial<Evento>>({});

  // Simulação de dados iniciais
  useEffect(() => {
    const eventosIniciais: Evento[] = [
      {
        id: '1',
        titulo: 'Workshop de React Avançado',
        categoria: 'workshop',
        data: '2024-03-15',
        local: 'Sala de Treinamento',
        participantes: 25,
        descricao: 'Aprenda técnicas avançadas de React com hooks personalizados e otimização de performance.'
      },
      {
        id: '2',
        titulo: 'Palestra: Arquitetura de Software',
        categoria: 'palestra',
        data: '2024-03-20',
        local: 'Auditório Principal',
        participantes: 50,
        descricao: 'Discussão sobre padrões de arquitetura e boas práticas em desenvolvimento de software.'
      },
      {
        id: '3',
        titulo: 'Curso de TypeScript',
        categoria: 'curso',
        data: '2024-03-25',
        local: 'Laboratório de Informática',
        participantes: 30,
        descricao: 'Curso completo de TypeScript do básico ao avançado.'
      }
    ];
    setEventos(eventosIniciais);
  }, []);

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const eventosFiltrados = eventos.filter(evento => {
    const matchCategoria = !filtros.categoria || evento.categoria === filtros.categoria;
    const matchData = !filtros.data || evento.data === filtros.data;
    const matchPesquisa = !filtros.pesquisa || 
      evento.titulo.toLowerCase().includes(filtros.pesquisa.toLowerCase()) ||
      evento.descricao.toLowerCase().includes(filtros.pesquisa.toLowerCase());
    
    return matchCategoria && matchData && matchPesquisa;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (novoEvento.titulo && novoEvento.categoria && novoEvento.data) {
      const eventoCompleto: Evento = {
        id: Date.now().toString(),
        titulo: novoEvento.titulo,
        categoria: novoEvento.categoria as Evento['categoria'],
        data: novoEvento.data,
        local: novoEvento.local || '',
        participantes: novoEvento.participantes || 0,
        descricao: novoEvento.descricao || ''
      };
      setEventos(prev => [...prev, eventoCompleto]);
      setShowModal(false);
      setNovoEvento({});
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filtros.categoria}
              onChange={(e) => handleFiltroChange('categoria', e.target.value)}
            >
              <option value="">Todas as categorias</option>
              <option value="workshop">Workshop</option>
              <option value="palestra">Palestra</option>
              <option value="curso">Curso</option>
              <option value="hackathon">Hackathon</option>
              <option value="mentoria">Mentoria</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
            <input 
              type="date" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filtros.data}
              onChange={(e) => handleFiltroChange('data', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pesquisar</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar eventos..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filtros.pesquisa}
                onChange={(e) => handleFiltroChange('pesquisa', e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
          <h3 className="text-gray-500 text-sm">Total de Eventos</h3>
          <p className="text-3xl font-bold">{eventosFiltrados.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm">Eventos Hoje</h3>
          <p className="text-3xl font-bold">
            {eventosFiltrados.filter(e => e.data === new Date().toISOString().split('T')[0]).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm">Próximos 7 dias</h3>
          <p className="text-3xl font-bold">
            {eventosFiltrados.filter(e => {
              const dataEvento = new Date(e.data);
              const hoje = new Date();
              const diffTime = dataEvento.getTime() - hoje.getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays >= 0 && diffDays <= 7;
            }).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm">Total de Participantes</h3>
          <p className="text-3xl font-bold">
            {eventosFiltrados.reduce((acc, evento) => acc + evento.participantes, 0)}
          </p>
        </div>
      </div>

      {/* Lista de Eventos */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Eventos de Programação</h2>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Visualizar:</span>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-500'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-r-lg ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-500'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventosFiltrados.map(evento => (
              <div key={evento.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-40 bg-indigo-600 relative">
                  <div className="absolute top-0 right-0 bg-white m-2 px-3 py-1 rounded-full text-xs font-semibold text-indigo-700">
                    {evento.categoria}
                  </div>
                  <div className="absolute bottom-0 left-0 bg-white m-2 px-3 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(evento.data).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2">{evento.titulo}</h3>
                  <p className="text-gray-600 text-sm mb-4">{evento.descricao}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {evento.local}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {evento.participantes} participantes
                    </span>
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                      Ver detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participantes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {eventosFiltrados.map(evento => (
                  <tr key={evento.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{evento.titulo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        {evento.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(evento.data).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{evento.local}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{evento.participantes}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">Ver detalhes</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Novo Evento */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Adicionar Novo Evento</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Evento</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={novoEvento.titulo || ''}
                      onChange={(e) => setNovoEvento(prev => ({ ...prev, titulo: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={novoEvento.categoria || ''}
                      onChange={(e) => setNovoEvento(prev => ({ ...prev, categoria: e.target.value as Evento['categoria'] }))}
                      required
                    >
                      <option value="">Selecione uma categoria</option>
                      <option value="workshop">Workshop</option>
                      <option value="palestra">Palestra</option>
                      <option value="curso">Curso</option>
                      <option value="hackathon">Hackathon</option>
                      <option value="mentoria">Mentoria</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={novoEvento.data || ''}
                      onChange={(e) => setNovoEvento(prev => ({ ...prev, data: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={novoEvento.local || ''}
                      onChange={(e) => setNovoEvento(prev => ({ ...prev, local: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número de Participantes</label>
                    <input 
                      type="number" 
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={novoEvento.participantes || ''}
                      onChange={(e) => setNovoEvento(prev => ({ ...prev, participantes: parseInt(e.target.value) }))}
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={novoEvento.descricao || ''}
                      onChange={(e) => setNovoEvento(prev => ({ ...prev, descricao: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Salvar Evento
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 