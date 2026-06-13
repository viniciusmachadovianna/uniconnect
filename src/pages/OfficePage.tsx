import React, { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';

type MaterialType = 'pdf' | 'video' | 'link' | 'arquivo';

interface Material {
  id: string;
  title: string;
  description: string;
  type: MaterialType;
  url: string;
  uploadDate: string;
}

const API_BASE = '/api/materials';

export const OfficePage: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'pdf' as MaterialType,
    url: '',
  });

  const fetchMaterials = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_BASE);
      if (!response.ok) {
        throw new Error('Falha ao buscar materiais do backend');
      }

      const data: Material[] = await response.json();
      setMaterials(data);
    } catch (err) {
      setError((err as Error).message || 'Erro ao conectar com o backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setFormData(prev => ({ ...prev, url: '' }));
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setFormData(prev => ({ ...prev, url: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      setError('Título é obrigatório');
      return;
    }

    if (!formData.url && !selectedFile) {
      setError('Forneça uma URL ou selecione um arquivo');
      return;
    }

    setError('');
    setLoading(true);

    try {
      let finalUrl = formData.url;

      // Se há arquivo selecionado, fazer upload
      if (selectedFile) {
        const reader = new FileReader();
        
        const fileBase64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(selectedFile);
        });

        const uploadResponse = await fetch(`${API_BASE}/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file: fileBase64,
            title: formData.title,
          }),
        });

        if (!uploadResponse.ok) {
          throw new Error('Falha ao fazer upload do arquivo');
        }

        const uploadResult = await uploadResponse.json();
        finalUrl = uploadResult.url;
      }

      // Salvar material
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          url: finalUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar material');
      }

      const newMaterial: Material = await response.json();
      setMaterials(prev => [newMaterial, ...prev]);
      setFormData({ title: '', description: '', type: 'pdf', url: '' });
      setSelectedFile(null);
      setShowForm(false);
    } catch (err) {
      setError((err as Error).message || 'Erro ao conectar com o backend');
    } finally {
      setLoading(false);
    }
  };

  const deleteMaterial = async (id: string) => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao remover material');
      }

      setMaterials(prev => prev.filter(material => material.id !== id));
    } catch (err) {
      setError((err as Error).message || 'Erro ao conectar com o backend');
    } finally {
      setLoading(false);
    }
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
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="relative bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Office</h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
                Materiais completos do curso - Downloads e recursos
              </p>
            </div>
            <div className="flex items-center gap-4">
              {loading && <span className="text-slate-300 text-sm font-medium">Sincronizando...</span>}
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-md shadow-sm transition-colors whitespace-nowrap"
              >
                {showForm ? 'Cancelar' : 'Novo Material'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow max-w-7xl w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-8 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 shadow-sm">
            {error}
          </div>
        )}

        {/* Formulário para adicionar material */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Novo Material</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Título *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Ex: Aula 01 - Introdução"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Descrição adicional sobre o material"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="pdf">📄 PDF</option>
                    <option value="video">🎥 Vídeo</option>
                    <option value="link">🔗 Link</option>
                    <option value="arquivo">📦 Arquivo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">URL/Link</label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="https://exemplo.com/arquivo"
                    disabled={!!selectedFile}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 disabled:text-slate-500 transition-all"
                  />
                  <p className="text-xs text-slate-500 mt-2 font-medium">OU faça upload de um arquivo abaixo</p>
                </div>
              </div>

              {/* Área de upload com drag-and-drop */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">📤 Arquivo (Opcional)</label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50'
                  }`}
                >
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.mp4,.mkv,.mov"
                  />
                  <div className="pointer-events-none">
                    {selectedFile ? (
                      <>
                        <p className="text-green-600 font-semibold">✅ Arquivo selecionado</p>
                        <p className="text-sm text-slate-600 mt-1">{selectedFile.name}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-slate-700 font-semibold">Arraste um arquivo aqui</p>
                        <p className="text-slate-600 text-sm mt-1">ou clique para procurar</p>
                        <p className="text-xs text-slate-500 mt-2">Formatos: PDF, DOC, XLS, PPT, ZIP, MP4, etc.</p>
                      </>
                    )}
                  </div>
                </div>
                {selectedFile && (
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="mt-3 text-sm text-red-600 hover:text-red-700 font-semibold transition-colors"
                  >
                    ✕ Limpar arquivo
                  </button>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition-colors"
                >
                  Salvar Material
                </button>
              </div>
            </form>
          </div>
        )}

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
                    <button
                      onClick={() => deleteMaterial(material.id)}
                      className="bg-white border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-md font-semibold transition-colors text-sm"
                      title="Remover Material"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="inline-block p-8 bg-white rounded-lg shadow-sm border border-slate-200">
                <p className="text-slate-600 text-lg font-semibold mb-2">Nenhum material encontrado</p>
                <p className="text-slate-500">Adicione um novo material ou altere o filtro atual.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
