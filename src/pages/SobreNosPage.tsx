import React from 'react';

export const SobreNosPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Sobre o Uniconnect</h1>
            <p className="text-xl md:text-2xl mb-4">
              Transformando vidas através da extensão universitária
            </p>
            <p className="text-lg md:text-xl opacity-90">
              Conectando conhecimento acadêmico com impacto social
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">🎯 Missão</h2>
              <p className="text-gray-700 leading-relaxed">
                Promover a extensão universitária como ferramenta de transformação social, 
                conectando conhecimento acadêmico com as necessidades reais da comunidade.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">👁️ Visão</h2>
              <p className="text-gray-700 leading-relaxed">
                Ser referência em projetos de extensão universitária, gerando impacto 
                duradouro nas comunidades onde atuamos.
              </p>
            </div>

            {/* Values */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-green-600 mb-4">💚 Valores</h2>
              <p className="text-gray-700 leading-relaxed">
                Integridade, inclusão, compromisso com a comunidade e excelência nas 
                ações realizadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Nossa História</h2>
          
          <div className="space-y-8">
            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-blue-600 transform md:-translate-x-1/2"></div>

              {/* Timeline item 1 */}
              <div className="mb-8 md:mb-12">
                <div className="flex items-center mb-4">
                  <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-blue-600 rounded-full transform md:-translate-x-4 md:translate-y-0"></div>
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pr-8 md:text-right">
                    <h3 className="text-xl font-bold text-gray-900">2015 - Fundação</h3>
                    <p className="text-gray-600 mt-2">
                      O grupo de extensão Uniconnect foi criado com a missão de conectar 
                      conhecimento acadêmico com as necessidades da comunidade local.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline item 2 */}
              <div className="mb-8 md:mb-12">
                <div className="flex items-center mb-4">
                  <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-blue-600 rounded-full transform md:-translate-x-4 md:translate-y-0"></div>
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pl-8">
                    <h3 className="text-xl font-bold text-gray-900">2017 - Crescimento</h3>
                    <p className="text-gray-600 mt-2">
                      Expansão das ações para novos bairros, aumentando o número de 
                      participantes e beneficiados pelas atividades.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline item 3 */}
              <div className="mb-8 md:mb-12">
                <div className="flex items-center mb-4">
                  <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-blue-600 rounded-full transform md:-translate-x-4 md:translate-y-0"></div>
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pr-8 md:text-right">
                    <h3 className="text-xl font-bold text-gray-900">2020 - Transformação Digital</h3>
                    <p className="text-gray-600 mt-2">
                      Adaptação às mudanças causadas pela pandemia, com criação de 
                      atividades online e desenvolvimento da plataforma Uniconnect.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline item 4 */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-blue-600 rounded-full transform md:-translate-x-4 md:translate-y-0"></div>
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pl-8">
                    <h3 className="text-xl font-bold text-gray-900">2024 - Inovação</h3>
                    <p className="text-gray-600 mt-2">
                      Lançamento da plataforma Uniconnect v2.0 com novas funcionalidades 
                      para melhor gestão e visualização de impacto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Nossa Equipe</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Coordenador</h3>
              <p className="text-gray-600">
                Responsável pela gestão geral e alinhamento estratégico do grupo.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👩‍🏫</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Educadores</h3>
              <p className="text-gray-600">
                Professores que ministram as aulas e coordenam as atividades.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Voluntários</h3>
              <p className="text-gray-600">
                Pessoas dedicadas que contribuem com seu tempo e conhecimento.
              </p>
            </div>

            {/* Team Member 4 */}
            <div className="text-center bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Analistas</h3>
              <p className="text-gray-600">
                Profissionais que monitoram e avaliam o impacto das ações.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Nosso Impacto</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-5xl font-bold text-blue-600 mb-3">500+</p>
              <p className="text-lg text-gray-600 font-semibold">Pessoas Beneficiadas</p>
              <p className="text-sm text-gray-500 mt-2">Anualmente</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-purple-600 mb-3">50+</p>
              <p className="text-lg text-gray-600 font-semibold">Voluntários Ativos</p>
              <p className="text-sm text-gray-500 mt-2">Comprometidos</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-green-600 mb-3">200+</p>
              <p className="text-lg text-gray-600 font-semibold">Projetos Realizados</p>
              <p className="text-sm text-gray-500 mt-2">Desde a fundação</p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-bold text-orange-600 mb-3">10+</p>
              <p className="text-lg text-gray-600 font-semibold">Anos de Atuação</p>
              <p className="text-sm text-gray-500 mt-2">Transformação social</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Quer fazer parte de nossa equipe?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Estamos sempre à procura de pessoas apaixonadas por transformação social e 
            dispostas a fazer a diferença na comunidade.
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors text-lg">
            Entre em Contato
          </button>
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
