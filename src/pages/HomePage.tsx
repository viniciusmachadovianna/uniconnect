import React from 'react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Bem-vindo ao <span className="text-blue-600">Uniconnect</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Plataforma de gestão de atividades para o grupo de extensão universitária.
            Registre, acompanhe e compartilhe o impacto social de nossas ações.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Funcionalidades Principais
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">👥</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Participantes</h3>
              <p className="text-gray-600">
                Gerencie e acompanhe todos os participantes do grupo de extensão.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">📚</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Aulas Ministradas</h3>
              <p className="text-gray-600">
                Registre e consulte todas as aulas ministradas pelo grupo.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Atividades</h3>
              <p className="text-gray-600">
                Documente todas as atividades e seu impacto na comunidade.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">📊</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Relatórios</h3>
              <p className="text-gray-600">
                Acompanhe métricas e gere relatórios sobre as atividades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">50+</p>
            <p className="text-gray-600">Participantes Ativos</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-600 mb-2">150+</p>
            <p className="text-gray-600">Atividades Registradas</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-purple-600 mb-2">30+</p>
            <p className="text-gray-600">Aulas Ministradas</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Uniconnect - Grupo de Extensão Universitária. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};