import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Footer } from '../components/Footer';

type TabType = 'aulas' | 'atividades';

export const AtividadesPage: React.FC = () => {
  const { classes, activities, addClass, addActivity } = useAppContext();
  const [activeTab, setActiveTab] = useState<TabType>('aulas');
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [showAulaForm, setShowAulaForm] = useState(false);
  const [showAtividadeForm, setShowAtividadeForm] = useState(false);

  // Form data for Aulas
  const [aulaFormData, setAulaFormData] = useState({
    title: '',
    description: '',
    date: '',
    duration: '',
    instructor: '',
    location: '',
    participants: '',
  });

  // Form data for Atividades
  const [atividadeFormData, setAtividadeFormData] = useState({
    title: '',
    description: '',
    date: '',
    duration: '',
    location: '',
    responsible: '',
    impact: '',
  });

  const handleAulaInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAulaFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAtividadeInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAtividadeFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAulaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addClass({
      title: aulaFormData.title,
      description: aulaFormData.description,
      date: new Date(aulaFormData.date),
      duration: parseInt(aulaFormData.duration),
      instructor: aulaFormData.instructor,
      location: aulaFormData.location,
      participants: parseInt(aulaFormData.participants) || 0,
      status: 'scheduled',
    });
    setAulaFormData({
      title: '',
      description: '',
      date: '',
      duration: '',
      instructor: '',
      location: '',
      participants: '',
    });
    setShowAulaForm(false);
  };

  const handleAtividadeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addActivity({
      title: atividadeFormData.title,
      description: atividadeFormData.description,
      date: new Date(atividadeFormData.date),
      duration: parseInt(atividadeFormData.duration),
      location: atividadeFormData.location,
      responsible: atividadeFormData.responsible,
      impact: atividadeFormData.impact,
      classId: selectedClassId || undefined,
      status: 'created',
    });
    setAtividadeFormData({
      title: '',
      description: '',
      date: '',
      duration: '',
      location: '',
      responsible: '',
      impact: '',
    });
    setShowAtividadeForm(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  // Filter activities by selected class
  const filteredActivities = selectedClassId
    ? activities.filter(activity => activity.classId === selectedClassId)
    : activities;

  const selectedClass = selectedClassId
    ? classes.find(c => c.id === selectedClassId)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      {/* Header Section */}
      <div className="relative bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Aulas e Atividades</h1>
          <p className="text-lg text-slate-300 mt-4">Gerencie todas as aulas ministradas e atividades do grupo</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Modern Tabs */}
        <div className="flex border-b border-slate-200 mb-8">
          <button
            onClick={() => {
              setActiveTab('aulas');
              setSelectedClassId(null);
            }}
            className={`px-8 py-4 font-semibold text-sm transition-colors border-b-2 ${
              activeTab === 'aulas'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Aulas Ministradas
          </button>
          <button
            onClick={() => setActiveTab('atividades')}
            className={`px-8 py-4 font-semibold text-sm transition-colors border-b-2 ${
              activeTab === 'atividades'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Atividades
          </button>
        </div>

        {/* Aulas Tab */}
        {activeTab === 'aulas' && (
          <div>
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900">Aulas Ministradas</h2>
              <button
                onClick={() => setShowAulaForm(!showAulaForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-md shadow-sm transition-colors"
              >
                {showAulaForm ? 'Cancelar' : 'Nova Aula'}
              </button>
            </div>

            {/* Aula Form */}
            {showAulaForm && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Nova Aula</h3>
                <form onSubmit={handleAulaSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Título da Aula *</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Digite o título da aula"
                      value={aulaFormData.title}
                      onChange={handleAulaInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição *</label>
                    <textarea
                      name="description"
                      placeholder="Descreva o conteúdo da aula"
                      value={aulaFormData.description}
                      onChange={handleAulaInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Data e Hora *</label>
                      <input
                        type="datetime-local"
                        name="date"
                        value={aulaFormData.date}
                        onChange={handleAulaInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Duração (minutos) *</label>
                      <input
                        type="number"
                        name="duration"
                        placeholder="120"
                        value={aulaFormData.duration}
                        onChange={handleAulaInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                        value={aulaFormData.instructor}
                        onChange={handleAulaInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Local *</label>
                      <input
                        type="text"
                        name="location"
                        placeholder="Sala 101"
                        value={aulaFormData.location}
                        onChange={handleAulaInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Número de Participantes *</label>
                    <input
                      type="number"
                      name="participants"
                      placeholder="25"
                      value={aulaFormData.participants}
                      onChange={handleAulaInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                {classes.map((aulaClass, index) => (
                  <div
                    key={aulaClass.id}
                    onClick={() => {
                      setSelectedClassId(aulaClass.id);
                      setActiveTab('atividades');
                    }}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200 overflow-hidden cursor-pointer"
                    style={{
                      animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <div className="bg-slate-50 border-b border-slate-200 p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{aulaClass.title}</h3>
                          <p className="text-slate-600 leading-relaxed">{aulaClass.description}</p>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap ml-4 ${
                            aulaClass.status === 'scheduled'
                              ? 'bg-blue-100 text-blue-800'
                              : aulaClass.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {aulaClass.status === 'scheduled'
                            ? 'Agendada'
                            : aulaClass.status === 'completed'
                            ? 'Concluída'
                            : 'Cancelada'}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 pb-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-gray-500 text-sm font-semibold">Data</p>
                            <p className="font-bold text-gray-900">{formatDate(aulaClass.date)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-gray-500 text-sm font-semibold">Duração</p>
                            <p className="font-bold text-gray-900">{aulaClass.duration} min</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-gray-500 text-sm font-semibold">Instrutor</p>
                            <p className="font-bold text-gray-900">{aulaClass.instructor}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-gray-500 text-sm font-semibold">Participantes</p>
                            <p className="font-bold text-gray-900">{aulaClass.participants}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-center pt-4 border-t border-gray-200">
                        <p className="text-blue-600 font-bold hover:text-blue-700">
                          Clique para ver atividades relacionadas →
                        </p>
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
        )}

        {/* Atividades Tab */}
        {activeTab === 'atividades' && (
          <div>
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-900">Atividades</h2>
                {selectedClass && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">📌 Filtrando por aula:</span>
                      <span className="font-bold text-purple-600 ml-2">{selectedClass.title}</span>
                      <button
                        onClick={() => setSelectedClassId(null)}
                        className="ml-4 inline-block text-purple-600 hover:text-purple-800 underline font-semibold transition-colors"
                      >
                        ✕ Limpar filtro
                      </button>
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowAtividadeForm(!showAtividadeForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-md shadow-sm transition-colors"
              >
                {showAtividadeForm ? 'Cancelar' : 'Nova Atividade'}
              </button>
            </div>

            {/* Atividade Form */}
            {showAtividadeForm && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Nova Atividade</h3>
                <form onSubmit={handleAtividadeSubmit} className="space-y-6">
                  {selectedClass && (
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Aula relacionada:</span>
                        <span className="ml-2 text-purple-600 font-bold">{selectedClass.title}</span>
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Título da Atividade *</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Digite o título da atividade"
                      value={atividadeFormData.title}
                      onChange={handleAtividadeInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição *</label>
                    <textarea
                      name="description"
                      placeholder="Descreva a atividade"
                      value={atividadeFormData.description}
                      onChange={handleAtividadeInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Data e Hora *</label>
                      <input
                        type="datetime-local"
                        name="date"
                        value={atividadeFormData.date}
                        onChange={handleAtividadeInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Duração (minutos) *</label>
                      <input
                        type="number"
                        name="duration"
                        placeholder="120"
                        value={atividadeFormData.duration}
                        onChange={handleAtividadeInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Local da Atividade *</label>
                      <input
                        type="text"
                        name="location"
                        placeholder="Sala 101"
                        value={atividadeFormData.location}
                        onChange={handleAtividadeInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Responsável *</label>
                      <input
                        type="text"
                        name="responsible"
                        placeholder="Nome do responsável"
                        value={atividadeFormData.responsible}
                        onChange={handleAtividadeInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Impacto/Resultados *</label>
                    <textarea
                      name="impact"
                      placeholder="Descreva o impacto ou resultados esperados"
                      value={atividadeFormData.impact}
                      onChange={handleAtividadeInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors"
                  >
                    Adicionar Atividade
                  </button>
                </form>
              </div>
            )}

            {/* Activities List */}
            {filteredActivities.length > 0 ? (
              <div className="space-y-8">
                {filteredActivities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden"
                    style={{
                      animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <div className="bg-slate-50 border-b border-slate-200 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{activity.title}</h3>
                          <p className="text-slate-600 leading-relaxed">{activity.description}</p>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap ml-4 ${
                            activity.status === 'created'
                              ? 'bg-blue-100 text-blue-800'
                              : activity.status === 'updated'
                              ? 'bg-slate-100 text-slate-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {activity.status === 'created'
                            ? 'Criada'
                            : activity.status === 'updated'
                            ? 'Atualizada'
                            : 'Deletada'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 pb-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-gray-500 text-sm font-semibold">Data</p>
                            <p className="font-bold text-gray-900">{formatDate(activity.date)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-gray-500 text-sm font-semibold">Duração</p>
                            <p className="font-bold text-gray-900">{activity.duration} min</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-gray-500 text-sm font-semibold">Local</p>
                            <p className="font-bold text-gray-900">{activity.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-gray-500 text-sm font-semibold">Responsável</p>
                            <p className="font-bold text-gray-900">{activity.responsible}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                        <p className="text-gray-500 text-sm font-semibold mb-2">Impacto/Resultados</p>
                        <p className="text-gray-900 leading-relaxed">{activity.impact}</p>
                      </div>

                      <div className="flex gap-3 pt-6 border-t border-gray-200">
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
                    {selectedClass
                      ? `Nenhuma atividade cadastrada para "${selectedClass.title}"`
                      : 'Nenhuma atividade cadastrada ainda'}
                  </p>
                  <p className="text-gray-500">
                    {selectedClass ? 'Clique em "+ Nova Atividade" para adicionar' : 'Selecione uma aula ou clique em "+ Nova Atividade"'}
                  </p>
                </div>
              </div>
            )}
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

        .fade-in-0 {
          opacity: 1;
        }
      `}</style>
      <Footer />
    </div>
  );
};
