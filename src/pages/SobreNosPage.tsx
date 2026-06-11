import React from 'react';
import { Footer } from '../components/Footer';

export const SobreNosPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-4000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">Sobre o Uniconnect</h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-4">
            Transformando vidas através da extensão universitária
          </p>
          <p className="text-lg md:text-xl text-blue-300 opacity-90">
            Conectando conhecimento acadêmico com impacto social
          </p>
        </div>
      </div>

      {/* Mission Vision Values Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-blue-600 mb-4">🎯 Missão</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Promover a extensão universitária como ferramenta de transformação social, conectando conhecimento acadêmico com as necessidades reais da comunidade.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-purple-600 mb-4">👁️ Visão</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Ser referência em projetos de extensão universitária, gerando impacto duradouro nas comunidades onde atuamos.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-green-600 mb-4">💚 Valores</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Integridade, inclusão, compromisso com a comunidade e excelência nas ações realizadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">📜 Nossa História</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Uma jornada de transformação social e impacto comunitário
          </p>
        </div>
        
        <div className="space-y-8">
          {/* Timeline Items */}
          <div className="relative pl-8 md:pl-0">
            <div className="md:flex items-center gap-8">
              <div className="md:w-1/2 text-right">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-blue-600 mb-2">2015 - Fundação</h3>
                  <p className="text-gray-600 leading-relaxed">
                    O grupo de extensão Uniconnect foi criado com a missão de conectar conhecimento acadêmico com as necessidades da comunidade local.
                  </p>
                </div>
              </div>
              <div className="hidden md:flex w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full items-center justify-center text-white font-bold text-lg">1</div>
              <div className="md:w-1/2"></div>
            </div>
          </div>

          <div className="relative pl-8 md:pl-0">
            <div className="md:flex items-center gap-8">
              <div className="md:w-1/2"></div>
              <div className="hidden md:flex w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full items-center justify-center text-white font-bold text-lg">2</div>
              <div className="md:w-1/2">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-purple-600 mb-2">2017 - Crescimento</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Expansão das ações para novos bairros, aumentando o número de participantes e beneficiados pelas atividades.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative pl-8 md:pl-0">
            <div className="md:flex items-center gap-8">
              <div className="md:w-1/2 text-right">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-green-600 mb-2">2020 - Transformação Digital</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Adaptação às mudanças causadas pela pandemia, com criação de atividades online e desenvolvimento da plataforma Uniconnect.
                  </p>
                </div>
              </div>
              <div className="hidden md:flex w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full items-center justify-center text-white font-bold text-lg">3</div>
              <div className="md:w-1/2"></div>
            </div>
          </div>

          <div className="relative pl-8 md:pl-0">
            <div className="md:flex items-center gap-8">
              <div className="md:w-1/2"></div>
              <div className="hidden md:flex w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full items-center justify-center text-white font-bold text-lg">4</div>
              <div className="md:w-1/2">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-orange-600 mb-2">2024 - Inovação</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Lançamento da plataforma Uniconnect v2.0 com novas funcionalidades para melhor gestão e visualização de impacto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">👥 Nossa Equipe</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Profissionais dedicados que fazem a diferença
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Coordenador */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 h-32 flex items-center justify-center">
              <span className="text-5xl">👨‍💼</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Coordenador</h3>
              <p className="text-gray-600 text-center">
                Responsável pela gestão geral e alinhamento estratégico do grupo.
              </p>
            </div>
          </div>

          {/* Educadores */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 h-32 flex items-center justify-center">
              <span className="text-5xl">👩‍🏫</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Educadores</h3>
              <p className="text-gray-600 text-center">
                Professores que ministram as aulas e coordenam as atividades.
              </p>
            </div>
          </div>

          {/* Voluntários */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-green-500 to-green-600 h-32 flex items-center justify-center">
              <span className="text-5xl">🤝</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Voluntários</h3>
              <p className="text-gray-600 text-center">
                Pessoas dedicadas que contribuem com seu tempo e conhecimento.
              </p>
            </div>
          </div>

          {/* Analistas */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 h-32 flex items-center justify-center">
              <span className="text-5xl">📊</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Analistas</h3>
              <p className="text-gray-600 text-center">
                Profissionais que monitoram e avaliam o impacto das ações.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">📈 Nosso Impacto</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Números que demonstram nosso compromisso com a transformação social
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center hover:shadow-xl transition-all">
            <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-3">500+</p>
            <p className="text-gray-700 font-semibold text-lg mb-1">Pessoas Beneficiadas</p>
            <p className="text-gray-500 text-sm">Anualmente</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center hover:shadow-xl transition-all">
            <p className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-3">50+</p>
            <p className="text-gray-700 font-semibold text-lg mb-1">Voluntários Ativos</p>
            <p className="text-gray-500 text-sm">Comprometidos</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center hover:shadow-xl transition-all">
            <p className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-3">200+</p>
            <p className="text-gray-700 font-semibold text-lg mb-1">Projetos Realizados</p>
            <p className="text-gray-500 text-sm">Desde a fundação</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center hover:shadow-xl transition-all">
            <p className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent mb-3">10+</p>
            <p className="text-gray-700 font-semibold text-lg mb-1">Anos de Atuação</p>
            <p className="text-gray-500 text-sm">Transformação social</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -right-10 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 -left-10 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">💪 Quer fazer parte de nossa equipe?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Estamos sempre à procura de pessoas apaixonadas por transformação social e dispostas a fazer a diferença na comunidade.
          </p>
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 active:scale-95 text-lg shadow-lg">
            Entre em Contato →
          </button>
        </div>
      </section>

      <style>{`
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

        .delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      <Footer />
    </div>
  );
};
