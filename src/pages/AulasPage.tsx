import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Footer } from '../components/Footer';

export const AulasPage: React.FC = () => {
  const { classes, addClass, addDocumentToClass, removeDocumentFromClass } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [expandedClassId, setExpandedClassId] = useState<string | null>(null);
  const [documentInput, setDocumentInput] = useState<{ [key: string]: { name: string; url: string } }>({});
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    duration: '',
    instructor: '',
    location: '',
    participants: '',
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
    addClass({
      title: formData.title,
      description: formData.description,
      date: new Date(formData.date),
      duration: parseInt(formData.duration, 10) || 0,
      instructor: formData.instructor,
      location: formData.location,
      participants: parseInt(formData.participants, 10) || 0,
      status: 'scheduled',
    });
    setFormData({
      title: '',
      description: '',
      date: '',
      duration: '',
      instructor: '',
      location: '',
      participants: '',
    });
    setShowForm(false);
  };

  const handleAddDocument = (classId: string) => {
    const input = documentInput[classId];
    if (input && input.name && input.url) {
      addDocumentToClass(classId, input);
      setDocumentInput(prev => ({
        ...prev,
        [classId]: { name: '', url: '' }
      }));
    }
  };

  const handleDocumentInputChange = (classId: string, field: 'name' | 'url', value: string) => {
    setDocumentInput(prev => ({
      ...prev,
      [classId]: {
        ...prev[classId],
        [field]: value
      }
    }));
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="relative bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Aulas Ministradas</h1>
              <p className="text-lg text-slate-300">Registre e acompanhe todas as aulas do grupo</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-md shadow-sm transition-colors"
            >
              {showForm ? "Cancelar" : "Nova Aula"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Nova Aula
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Título da Aula *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Digite o título da aula"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição *</label>
                <textarea
                  name="description"
                  placeholder="Descreva o conteúdo da aula"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Data e Hora *</label>
                  <input
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duração (minutos) *</label>
                  <input
                    type="number"
                    name="duration"
                    placeholder="120"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Instrutor/Professor *</label>
                  <input
                    type="text"
                    name="instructor"
                    placeholder="Nome do instrutor"
                    value={formData.instructor}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Local *</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Sala 101"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Número de Participantes *</label>
                <input
                  type="number"
                  name="participants"
                  placeholder="25"
                  value={formData.participants}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors"
              >
                Adicionar Aula
              </button>
            </form>
          </div>
        )}

        {/* Classes List */}
        {classes.length > 0 ? (
          <div className="space-y-8">
            {classes.map((classItem, index) => (
              <div
                key={classItem.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                style={{
                  animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Header with status */}
                <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold mb-2">{classItem.title}</h3>
                      <p className="text-green-100 text-lg leading-relaxed">{classItem.description}</p>
                    </div>
                    <span
                      className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap ml-4 ${
                        classItem.status === 'completed'
                          ? 'bg-green-700 text-white'
                          : classItem.status === 'scheduled'
                          ? 'bg-blue-700 text-white'
                          : 'bg-red-700 text-white'
                      }`}
                    >
                      {classItem.status === 'completed'
                        ? '✅ Concluída'
                        : classItem.status === 'scheduled'
                        ? '⏱️ Agendada'
                        : '❌ Cancelada'}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-gray-500 text-sm font-semibold">Data</p>
                        <p className="font-bold text-gray-900">{formatDate(classItem.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-gray-500 text-sm font-semibold">Duração</p>
                        <p className="font-bold text-gray-900">{classItem.duration} min</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-gray-500 text-sm font-semibold">Instrutor</p>
                        <p className="font-bold text-gray-900">{classItem.instructor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-gray-500 text-sm font-semibold">Participantes</p>
                        <p className="font-bold text-gray-900">{classItem.participants}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div>
                      <p className="text-gray-500 text-sm font-semibold">Local</p>
                      <p className="font-bold text-gray-900">{classItem.location}</p>
                    </div>
                  </div>

                  {/* Documents Section */}
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <button
                      onClick={() => setExpandedClassId(expandedClassId === classItem.id ? null : classItem.id)}
                      className="w-full text-lg font-bold text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-2 justify-between"
                    >
                      <span>Documentos {classItem.documents && classItem.documents.length > 0 ? `(${classItem.documents.length})` : '(0)'}</span>
                      <span className={`transform transition-transform ${expandedClassId === classItem.id ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </button>

                    {expandedClassId === classItem.id && (
                      <div className="mt-4 space-y-4">
                        {/* Add Document Form */}
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                          <h4 className="font-bold text-gray-900 mb-3">Adicionar Documento</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <input
                              type="text"
                              placeholder="Nome do documento"
                              value={documentInput[classItem.id]?.name || ''}
                              onChange={(e) => handleDocumentInputChange(classItem.id, 'name', e.target.value)}
                              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                            />
                            <input
                              type="url"
                              placeholder="URL do documento"
                              value={documentInput[classItem.id]?.url || ''}
                              onChange={(e) => handleDocumentInputChange(classItem.id, 'url', e.target.value)}
                              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                            />
                          </div>
                          <button
                            onClick={() => handleAddDocument(classItem.id)}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold py-2 px-4 rounded-lg transition-all"
                          >
                            Adicionar Documento
                          </button>
                        </div>

                        {/* Documents List */}
                        {classItem.documents && classItem.documents.length > 0 ? (
                          <div className="space-y-3">
                            {classItem.documents.map(doc => (
                              <div key={doc.id} className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center hover:shadow-md transition-all">
                                <div className="flex-1">
                                  <p className="font-bold text-gray-900">📄 {doc.name}</p>
                                  <p className="text-sm text-gray-500">
                                    Enviado em {new Date(doc.uploadedAt).toLocaleDateString('pt-BR')}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <a
                                    href={doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                                  >
                                    🔗 Abrir
                                  </a>
                                  <button
                                    onClick={() => removeDocumentFromClass(classItem.id, doc.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                                  >
                                    🗑️ Remover
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-600 text-center py-4">Nenhum documento adicionado ainda.</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                    <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold py-2 px-4 rounded-md transition-colors text-sm">
                      Editar
                    </button>
                    <button className="bg-white border border-red-200 text-red-600 hover:bg-red-50 font-semibold py-2 px-4 rounded-md transition-colors text-sm">
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
              <p className="text-gray-600 text-xl font-semibold mb-2">
                Nenhuma aula cadastrada ainda
              </p>
              <p className="text-gray-500">
                Clique em "+ Nova Aula" para começar
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .delay-2000 {
          animation-delay: 2s;
        }

        .animate-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
      <Footer />
    </div>
  );
};
