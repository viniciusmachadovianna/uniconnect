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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex-grow max-w-6xl w-full mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📚 Aba Office</h1>
          <p className="text-gray-600">Materiais completos do curso - Downloads e recursos</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Botão para adicionar material */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row items-start sm:items-center justify-between">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {showForm ? '✖ Cancelar' : '➕ Adicionar Material'}
          </button>
          {loading && <span className="text-slate-500">Sincronizando com o backend...</span>}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL/Link</label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="https://exemplo.com/arquivo"
                    disabled={!!selectedFile}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">OU faça upload abaixo</p>
                </div>
              </div>

              {/* Área de upload com drag-and-drop */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">📤 Arquivo (Opcional)</label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50'
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
                        <p className="text-sm text-gray-600 mt-1">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-700 font-semibold">Arraste um arquivo aqui</p>
                        <p className="text-gray-600 text-sm mt-1">ou clique para procurar</p>
                        <p className="text-xs text-gray-500 mt-2">Formatos: PDF, DOC, XLS, PPT, ZIP, MP4, etc.</p>
                      </>
                    )}
                  </div>
                </div>
                {selectedFile && (
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    ✕ Limpar arquivo
                  </button>
                )}
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
                  Adicionado em {new Date(material.uploadDate).toLocaleDateString('pt-BR')}
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
