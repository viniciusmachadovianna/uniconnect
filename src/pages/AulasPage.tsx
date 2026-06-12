import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Footer } from '../components/Footer';

export const AulasPage: React.FC = () => {
  const { classes, addClass } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
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
      duration: 0,
      instructor: 'uniconnect',
      location: formData.location,
      participants: 0,
      status: 'completed',
    });
    setFormData({
      title: '',
      description: '',
      date: '',
      location: '',
    });
    setShowForm(false);
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
          <div className="max-w-lg mx-auto bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Nova Aula
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Título da Aula *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Digite o título da aula"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição *</label>
                <textarea
                  name="description"
                  placeholder="Descreva o conteúdo da aula"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Data e Hora *</label>
                  <input
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Local *</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Ex: Colégio Duque de Caxias"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
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
          <div className="space-y-8 pb-12">
            {classes.map((classItem, index) => (
              <div
                key={classItem.id}
                className="max-w-lg mx-auto bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden"
                style={{
                  animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Header do Post */}
                <div className="flex items-center justify-between p-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
                      <div className="w-full h-full bg-white rounded-full border border-white flex items-center justify-center overflow-hidden">
                        <span className="text-xs font-bold text-slate-700">
                          UC
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 leading-none">uniconnect</p>
                      <p className="text-xs text-slate-500">{classItem.location}</p>
                    </div>
                  </div>
                </div>

                {/* Imagem do Post */}
                <div className="w-full aspect-square bg-slate-100 relative overflow-hidden group border-b border-slate-100">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                    <span className="text-8xl transform group-hover:scale-110 transition-transform duration-500">💻</span>
                  </div>
                </div>

                {/* Ações e Legenda */}
                <div className="p-4 bg-white">
                  <div className="text-sm text-slate-900 mb-1">
                    <span className="font-bold">{classItem.title}</span>
                  </div>
                  <p className="text-sm text-slate-700 mb-4">{classItem.description}</p>

                  <a 
                    href="https://instagram.com/uniconnectjf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-4 py-2 mb-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white text-xs font-bold rounded-full hover:opacity-90 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    Ver no Instagram
                  </a>

                  <p className="text-[10px] text-slate-400 uppercase tracking-wide mt-1">
                    {new Date(classItem.date).toLocaleDateString('pt-BR')}
                  </p>
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
