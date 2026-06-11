import React, { useState } from 'react';
import { Footer } from '../components/Footer';

interface Material {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'link' | 'arquivo';
  url: string;
  uploadDate: Date;
}

export const OfficePage: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: '1',
      title: 'Apresentação Introdutória',
      description: 'Slides iniciais do curso',
      type: 'pdf',
      url: '#',
      uploadDate: new Date('2024-01-15'),
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'pdf' as const,
    url: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.url) {
      const newMaterial: Material = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        type: formData.type,
        url: formData.url,
        uploadDate: new Date(),
      };
      setMaterials([...materials, newMaterial]);
      setFormData({ title: '', description: '', type: 'pdf', url: '' });
      setShowForm(false);
    }
  };

  const deleteMaterial = (id: string) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📚 Aba Office</h1>
          <p className="text-gray-600">Materiais completos do curso - Downloads e recursos</p>
        </div>

        {/* Botão para adicionar material */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {showForm ? '✖ Cancelar' : '➕ Adicionar Material'}
          </button>
        </div>

        {/* Formulário para adicionar material */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-l-4 border-indigo-600">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Novo Material</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Ex: Aula 01 - Introdução"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descrição adicional sobre o material"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="pdf">📄 PDF</option>
                    <option value="video">🎥 Vídeo</option>
                    <option value="link">🔗 Link</option>
                    <option value="arquivo">📦 Arquivo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL/Link *</label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="https://exemplo.com/arquivo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  ✅ Salvar Material
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filtros */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Todos
          </button>
          {['pdf', 'video', 'link', 'arquivo'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterType === type
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {getTypeIcon(type)} {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Lista de materiais */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map(material => (
              <div
                key={material.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-indigo-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{getTypeIcon(material.type)}</span>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{material.title}</h3>
                      <span className={`inline-block mt-1 px-3 py-1 text-sm rounded-full font-medium ${getTypeBadgeColor(material.type)}`}>
                        {material.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {material.description && (
                  <p className="text-gray-600 text-sm mb-3">{material.description}</p>
                )}

                <p className="text-xs text-gray-400 mb-4">
                  Adicionado em {material.uploadDate.toLocaleDateString('pt-BR')}
                </p>

                <div className="flex gap-2">
                  <a
                    href={material.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-center font-semibold transition-colors"
                  >
                    🔗 Acessar
                  </a>
                  <button
                    onClick={() => deleteMaterial(material.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">Nenhum material encontrado. Adicione um novo material para começar!</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
