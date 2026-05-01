import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Sobre Nós</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Conheça o Uniconnect, uma iniciativa social dedicada a promover a integração e o engajamento comunitário através de atividades extensionistas.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa Missão</h2>
            <p className="text-gray-600 text-lg mb-4">
              O Uniconnect é um projeto de extensão universitária que busca promover a integração e o engajamento dos participantes em atividades sociais de impacto positivo na comunidade.
            </p>
            <p className="text-gray-600 text-lg mb-4">
              Através de uma plataforma centralizada, facilitamos o registro, acompanhamento e documentação de todas as atividades realizadas, contribuindo para a transparência e organização das ações sociais.
            </p>
            <p className="text-gray-600 text-lg">
              Acreditamos que a educação e o engajamento comunitário são ferramentas poderosas para transformar realidades e criar oportunidades para todos.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-12 rounded-lg">
            <div className="text-6xl text-center mb-4">🎯</div>
            <p className="text-center text-gray-700 font-semibold">
              Transformar vidas através da educação e do engajamento social
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Nossos Valores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">💚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Inclusão</h3>
              <p className="text-gray-600">
                Promovemos a participação ativa de todos, independentemente de background ou experiência prévia.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Colaboração</h3>
              <p className="text-gray-600">
                Trabalhamos juntos, compartilhando conhecimentos e experiências para atingir objetivos comuns.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Educação</h3>
              <p className="text-gray-600">
                A educação é o alicerce de nossas ações, buscando sempre transmitir conhecimento significativo.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transparência</h3>
              <p className="text-gray-600">
                Mantemos transparência em todas as nossas ações e resultados, documentando nosso impacto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Nosso Impacto</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">50+</p>
            <p className="text-gray-700 font-semibold">Participantes Ativos</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg text-center">
            <p className="text-4xl font-bold text-green-600 mb-2">150+</p>
            <p className="text-gray-700 font-semibold">Aulas Ministradas</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg text-center">
            <p className="text-4xl font-bold text-purple-600 mb-2">1000+</p>
            <p className="text-gray-700 font-semibold">Pessoas Impactadas</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg text-center">
            <p className="text-4xl font-bold text-orange-600 mb-2">5+</p>
            <p className="text-gray-700 font-semibold">Anos de Atuação</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Nossa Equipe</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Coordenador Geral</h3>
              <p className="text-gray-600 mb-3">
                Responsável pela coordenação geral do projeto e gestão de recursos.
              </p>
              <p className="text-sm text-gray-500">Extensão Universitária</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Entre em Contato</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tem interesse em participar do Uniconnect? Gostaria de colaborar com o projeto? Entre em contato conosco!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p>contato@uniconnect.edu.br</p>
            </div>
            
            <div>
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">Telefone</h3>
              <p>(11) 99999-9999</p>
            </div>
            
            <div>
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold mb-2">Localização</h3>
              <p>Universidade XYZ, São Paulo - SP</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};