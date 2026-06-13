import React, { useState } from 'react';
import { Footer } from '../components/Footer';
import { useAppContext } from '../context/AppContext';

export const OfficePage: React.FC = () => {
  const { materials } = useAppContext();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredMaterials = filterType === 'all' ? materials : materials.filter(m => m.type === filterType);

  const getTypeIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      pdf: '📄',
      video: '🎥',
      link: '🔗',
      arquivo: '📦',
    };
    return icons[type] || '📋';
  };

  const getTypeBadgeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      pdf: 'bg-red-100 text-red-800',
      video: 'bg-blue-100 text-blue-800',
      link: 'bg-green-100 text-green-800',
      arquivo: 'bg-yellow-100 text-yellow-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="relative bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Office</h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
              Materiais completos do curso - Downloads e recursos
            </p>
          </div>
        </div>
      </div>

      <div className="flex-grow max-w-7xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Filtros */}
        <div className="mb-8 flex gap-3 flex-wrap">
          <button
            onClick={() => setFilterType('all')}
            className={`px-5 py-2.5 rounded-md font-semibold transition-colors shadow-sm border ${
              filterType === 'all'
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Todos
          </button>
          {['pdf', 'video', 'link', 'arquivo'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-5 py-2.5 rounded-md font-semibold transition-colors shadow-sm border ${
                filterType === type
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {getTypeIcon(type)} {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Lista de materiais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map(material => (
              <div
                key={material.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-slate-200 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl bg-slate-50 p-2 rounded-lg">{getTypeIcon(material.type)}</span>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 leading-tight">{material.title}</h3>
                      <span className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-semibold ${getTypeBadgeColor(material.type)}`}>
                        {material.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {material.description && (
                  <p className="text-slate-600 text-sm mb-4 flex-grow line-clamp-3">{material.description}</p>
                )}

                {!material.description && <div className="flex-grow"></div>}

                <div className="mt-auto pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 mb-4 font-medium">
                    Adicionado em {new Date(material.uploadDate).toLocaleDateString('pt-BR')}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href={material.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-md text-center font-semibold transition-colors text-sm"
                    >
                      Abrir
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="inline-block p-8 bg-white rounded-lg shadow-sm border border-slate-200">
                <p className="text-slate-600 text-lg font-semibold mb-2">Nenhum material encontrado</p>
                <p className="text-slate-500">Adicione materiais pelo painel admin em /admin</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
