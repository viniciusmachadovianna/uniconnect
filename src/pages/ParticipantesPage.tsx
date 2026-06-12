import React, { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { Footer } from '../components/Footer';

export const ParticipantesPage: React.FC = () => {
  const { participants } = useAppContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterArea, setFilterArea] = useState("")

  const filteredParticipants = participants.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesArea = filterArea === "" || p.area === filterArea
    return matchesSearch && matchesArea
  })

  const getAreaColor = (area: string) => {
    switch (area) {
      case "Desenvolvedor":
        return "from-blue-500 to-blue-600"
      case "Professor":
        return "from-green-500 to-green-600"
      case "Marketing":
        return "from-purple-500 to-purple-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getAreaBadgeColor = (area: string) => {
    switch (area) {
      case "Desenvolvedor":
        return "bg-blue-100 text-blue-800"
      case "Professor":
        return "bg-green-100 text-green-800"
      case "Marketing":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="relative bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Participantes</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Conheça nossa equipe dedicada de profissionais em diferentes áreas de atuação
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow max-w-screen-2xl mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Teams Description Section */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 border-t-4 border-t-blue-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">💻</div>
              <h3 className="text-lg font-bold text-slate-900">Equipe de Desenvolvimento</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Evoluir e dar manutenção no site e nos sistemas do projeto.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 border-t-4 border-t-green-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">👨‍🏫</div>
              <h3 className="text-lg font-bold text-slate-900">Professores</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Dar as aulas presencialmente na instituição para os alunos assistidos.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 border-t-4 border-t-purple-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xl">📱</div>
              <h3 className="text-lg font-bold text-slate-900">Equipe de Conteúdo</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Elaborar os materiais de aula e gerenciar as postagens das redes sociais.
            </p>
          </div>
        </div>

        {/* Controls Section */}
        <div className="mb-12 space-y-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="w-full sm:w-auto">
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 rounded-md border border-slate-300 bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <select
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-md border border-slate-300 bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Todas as áreas</option>
              <option value="Desenvolvedor">Desenvolvedor</option>
              <option value="Professor">Professor</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </div>

        {/* Participants Grid */}
        {filteredParticipants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredParticipants.map((participant, index) => (
              <div
                key={participant.id}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-200 overflow-hidden flex flex-col"
                style={{
                  animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Card Header with Image */}
                <div className={`relative aspect-square bg-gradient-to-br ${getAreaColor(participant.area)} overflow-hidden`}>
                  {participant.photo ? (
                    <>
                      <img
                        src={participant.photo}
                        alt={participant.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        style={{ objectPosition: participant.imagePosition || 'top' }}
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-6xl font-bold opacity-80">
                        {participant.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* Area Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getAreaBadgeColor(participant.area)} backdrop-blur-sm`}>
                      {participant.area}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 truncate" title={participant.name}>
                    {participant.name}
                  </h3>
                  <p className="text-sm text-slate-600 truncate" title={participant.curso}>
                    {participant.curso}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white rounded-lg shadow-sm border border-slate-200">
              <p className="text-slate-600 text-lg font-semibold mb-2">
                {searchTerm || filterArea ? "Nenhum participante encontrado" : "Nenhum participante cadastrado"}
              </p>
              <p className="text-slate-500">
                {searchTerm || filterArea ? "Tente ajustar sua busca ou filtro" : "A equipe será cadastrada em breve"}
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

        .animate-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
      <Footer />
    </div>
  )
}
