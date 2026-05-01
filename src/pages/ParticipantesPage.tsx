import React, { useState } from "react"
import { useAppContext } from "../context/AppContext"

export const ParticipantesPage: React.FC = () => {
  const { participants, addParticipant } = useAppContext()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    curso: "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addParticipant({
      name: formData.name,
      area: formData.area,
      curso: formData.curso,
      status: "active",
    })
    setFormData({ name: "", area: "", curso: "" })
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Participantes</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            {showForm ? "Cancelar" : "Novo Participante"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Adicionar Novo Participante
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione uma área</option>
                <option value="Educação">Educação</option>
                <option value="Saúde">Saúde</option>
                <option value="Meio Ambiente">Meio Ambiente</option>
                <option value="Tecnologia">Tecnologia</option>
              </select>
              <select
                name="curso"
                value={formData.curso}
                onChange={handleInputChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione um curso</option>
                <option value="Engenharia de Software">Engenharia de Software</option>
                <option value="Administração">Administração</option>
                <option value="Medicina">Medicina</option>
                <option value="Enfermagem">Enfermagem</option>
                <option value="Direito">Direito</option>
                <option value="Psicologia">Psicologia</option>
                <option value="Biologia">Biologia</option>
                <option value="Ciência da Computação">Ciência da Computação</option>
              </select>
              <button
                type="submit"
                className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Adicionar Participante
              </button>
            </form>
          </div>
        )}

        {/* Participants List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {participant.name}
              </h3>
              <p className="text-gray-600 mb-2">
                <strong>Área:</strong> {participant.area}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Curso:</strong> {participant.curso}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Status:</strong>{" "}
                <span
                  className={`font-bold ${
                    participant.status === "active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {participant.status === "active" ? "Ativo" : "Inativo"}
                </span>
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

        {participants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Nenhum participante cadastrado ainda.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
