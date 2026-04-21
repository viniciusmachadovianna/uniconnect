import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export const AulasPage: React.FC = () => {
  const { classes, addClass } = useAppContext();
  const [showForm, setShowForm] = useState(false);
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
      duration: parseInt(formData.duration),
      instructor: formData.instructor,
      location: formData.location,
      participants: parseInt(formData.participants),
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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Aulas Ministradas</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            {showForm ? 'Cancelar' : 'Nova Aula'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Adicionar Nova Aula</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Título da Aula"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <textarea
                name="description"
                placeholder="Descrição"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="number"
                name="duration"
                placeholder="Duração (minutos)"
                value={formData.duration}
                onChange={handleInputChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="instructor"
                placeholder="Instrutor/Professor"
                value={formData.instructor}
                onChange={handleInputChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="location"
                placeholder="Local"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="number"
                name="participants"
                placeholder="Número de Participantes"
                value={formData.participants}
                onChange={handleInputChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Adicionar Aula
              </button>
            </form>
          </div>
        )}

        {/* Classes List */}
        <div className="space-y-6">
          {classes.map(classItem => (
            <div
              key={classItem.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{classItem.title}</h3>
                  <p className="text-gray-600">{classItem.description}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full font-bold text-white ${
                    classItem.status === 'completed'
                      ? 'bg-green-600'
                      : classItem.status === 'scheduled'
                      ? 'bg-blue-600'
                      : 'bg-red-600'
                  }`}
                >
                  {classItem.status === 'completed'
                    ? 'Concluída'
                    : classItem.status === 'scheduled'
                    ? 'Agendada'
                    : 'Cancelada'}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-gray-500 text-sm">Data</p>
                  <p className="font-bold text-gray-900">{formatDate(classItem.date)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Duração</p>
                  <p className="font-bold text-gray-900">{classItem.duration} min</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Instrutor</p>
                  <p className="font-bold text-gray-900">{classItem.instructor}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Participantes</p>
                  <p className="font-bold text-gray-900">{classItem.participants}</p>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                <strong>Local:</strong> {classItem.location}
              </p>

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

        {classes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhuma aula cadastrada ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
};
