import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => {
              setActiveTab('aulas');
              setSelectedClassId(null);
            }}
            className={`px-6 py-3 font-bold transition-colors ${
              activeTab === 'aulas'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📚 Aulas Ministradas
          </button>
          <button
            onClick={() => setActiveTab('atividades')}
            className={`px-6 py-3 font-bold transition-colors ${
              activeTab === 'atividades'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🎯 Atividades
          </button>
        </div>

        {/* Aulas Tab */}
        {activeTab === 'aulas' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900">Aulas Ministradas</h1>
              <button
                onClick={() => setShowAulaForm(!showAulaForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                {showAulaForm ? 'Cancelar' : 'Nova Aula'}
              </button>
            </div>

            {/* Aula Form */}
            {showAulaForm && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Adicionar Nova Aula</h2>
                <form onSubmit={handleAulaSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Título da Aula"
                    value={aulaFormData.title}
                    onChange={handleAulaInputChange}
                    required
                    className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    name="description"
                    placeholder="Descrição"
                    value={aulaFormData.description}
                    onChange={handleAulaInputChange}
                    rows={4}
                    className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="datetime-local"
                    name="date"
                    value={aulaFormData.date}
                    onChange={handleAulaInputChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    name="duration"
                    placeholder="Duração (minutos)"
                    value={aulaFormData.duration}
                    onChange={handleAulaInputChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="instructor"
                    placeholder="Instrutor"
                    value={aulaFormData.instructor}
                    onChange={handleAulaInputChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Local"
                    value={aulaFormData.location}
                    onChange={handleAulaInputChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    name="participants"
                    placeholder="Número de Participantes"
                    value={aulaFormData.participants}
                    onChange={handleAulaInputChange}
                    required
                    className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Adicionar Aula
                  </button>
                </form>
              </div>
            )}

            {/* Classes List */}
            <div className="space-y-4">
              {classes.map(aulaClass => (
                <div
                  key={aulaClass.id}
                  onClick={() => {
                    setSelectedClassId(aulaClass.id);
                    setActiveTab('atividades');
                  }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:cursor-pointer transition-shadow border-l-4 border-blue-600 hover:border-blue-800"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{aulaClass.title}</h3>
                      <p className="text-gray-600 mb-4">{aulaClass.description}</p>
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <p className="text-gray-500 text-sm">Data</p>
                          <p className="font-bold text-gray-900">{formatDate(aulaClass.date)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Duração</p>
                          <p className="font-bold text-gray-900">{aulaClass.duration} min</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Instrutor</p>
                          <p className="font-bold text-gray-900">{aulaClass.instructor}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Participantes</p>
                          <p className="font-bold text-gray-900">{aulaClass.participants}</p>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full font-bold text-white ${
                        aulaClass.status === 'scheduled'
                          ? 'bg-blue-600'
                          : aulaClass.status === 'completed'
                          ? 'bg-green-600'
                          : 'bg-red-600'
                      }`}
                    >
                      {aulaClass.status === 'scheduled'
                        ? 'Agendada'
                        : aulaClass.status === 'completed'
                        ? 'Concluída'
                        : 'Cancelada'}
                    </span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                    <p className="text-blue-600 font-bold hover:underline">
                      Clique para ver atividades relacionadas →
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {classes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Nenhuma aula cadastrada ainda.</p>
              </div>
            )}
          </div>
        )}

        {/* Atividades Tab */}
        {activeTab === 'atividades' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Atividades</h1>
                {selectedClass && (
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      Filtrando por aula:
                      <span className="font-bold text-blue-600 ml-2">{selectedClass.title}</span>
                      <button
                        onClick={() => setSelectedClassId(null)}
                        className="ml-4 text-blue-600 hover:text-blue-800 underline"
                      >
                        Limpar filtro
                      </button>
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowAtividadeForm(!showAtividadeForm)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                {showAtividadeForm ? 'Cancelar' : 'Nova Atividade'}
              </button>
            </div>

            {/* Atividade Form */}
            {showAtividadeForm && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Adicionar Nova Atividade</h2>
                <form onSubmit={handleAtividadeSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedClass && (
                    <div className="md:col-span-2 p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <span className="font-bold">Aula relacionada:</span>
                        <span className="ml-2 text-purple-600 font-bold">{selectedClass.title}</span>
                      </p>
                    </div>
                  )}
                  <input
                    type="text"
                    name="title"
                    placeholder="Título da Atividade"
                    value={atividadeFormData.title}
                    onChange={handleAtividadeInputChange}
                    required
                    className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <textarea
                    name="description"
                    placeholder="Descrição"
                    value={atividadeFormData.description}
                    onChange={handleAtividadeInputChange}
                    rows={4}
                    className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="datetime-local"
                    name="date"
                    value={atividadeFormData.date}
                    onChange={handleAtividadeInputChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="number"
                    name="duration"
                    placeholder="Duração (minutos)"
                    value={atividadeFormData.duration}
                    onChange={handleAtividadeInputChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Local da Atividade"
                    value={atividadeFormData.location}
                    onChange={handleAtividadeInputChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    name="responsible"
                    placeholder="Responsável"
                    value={atividadeFormData.responsible}
                    onChange={handleAtividadeInputChange}
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <textarea
                    name="impact"
                    placeholder="Impacto/Resultados"
                    value={atividadeFormData.impact}
                    onChange={handleAtividadeInputChange}
                    rows={3}
                    className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="submit"
                    className="md:col-span-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Adicionar Atividade
                  </button>
                </form>
              </div>
            )}

            {/* Activities List */}
            <div className="space-y-6">
              {filteredActivities.map(activity => (
                <div
                  key={activity.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-purple-600"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{activity.title}</h3>
                      <p className="text-gray-600">{activity.description}</p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full font-bold text-white ${
                        activity.status === 'created'
                          ? 'bg-purple-600'
                          : activity.status === 'updated'
                          ? 'bg-green-600'
                          : 'bg-red-600'
                      }`}
                    >
                      {activity.status === 'created'
                        ? 'Criada'
                        : activity.status === 'updated'
                        ? 'Atualizada'
                        : 'Deletada'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-gray-500 text-sm">Data</p>
                      <p className="font-bold text-gray-900">{formatDate(activity.date)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Duração</p>
                      <p className="font-bold text-gray-900">{activity.duration} min</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Local</p>
                      <p className="font-bold text-gray-900">{activity.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Responsável</p>
                      <p className="font-bold text-gray-900">{activity.responsible}</p>
                    </div>
                  </div>

                  <div className="mb-4 p-4 bg-purple-50 rounded-lg">
                    <p className="text-gray-500 text-sm mb-2">Impacto/Resultados</p>
                    <p className="text-gray-900">{activity.impact}</p>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition-colors">
                      Editar
                    </button>
                    <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors">
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredActivities.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  {selectedClass
                    ? `Nenhuma atividade cadastrada para a aula "${selectedClass.title}".`
                    : 'Nenhuma atividade cadastrada ainda.'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
