import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export const AtividadesPage: React.FC = () => {
  const { activities, addActivity } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    duration: '',
    location: '',
    responsible: '',
    impact: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addActivity({
      title: formData.title,
      description: formData.description,
      date: new Date(formData.date),
      duration: parseInt(formData.duration),
      location: formData.location,
      responsible: formData.responsible,
      impact: formData.impact,
      status: 'created',
    });
    setFormData({
      title: '',
      description: '',
      date: '',
      duration: '',
      location: '',
      responsible: '',
      impact: '',
    });
    setShowForm(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Atividades</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            {showForm ? 'Cancelar' : 'Nova Atividade'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Adicionar Nova Atividade</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Título da Atividade"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                name="description"
                placeholder="Descrição"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="number"
                name="duration"
                placeholder="Duração (minutos)"
                value={formData.duration}
                onChange={handleInputChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                name="location"
                placeholder="Local da Atividade"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                name="responsible"
                placeholder="Responsável"
                value={formData.responsible}
                onChange={handleInputChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                name="impact"
                placeholder="Impacto/Resultados"
                value={formData.impact}
                onChange={handleInputChange}
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
          {activities.map(activity => (
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
                      ? 'bg-blue-600'
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
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
                  Editar
                </button>
                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors">
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        {activities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhuma atividade cadastrada ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
};
