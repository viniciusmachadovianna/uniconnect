import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../../frontend/src/assets/uniconect.jpeg'; // Substitua pelo nome real da sua imagem!
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div 
          className="relative bg-slate-900 text-white py-24 md:py-32 bg-cover bg-center border-b border-slate-800"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {/* Overlay escuro para garantir que o texto fique legível sobre a imagem */}
          <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12 md:pb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
              Transformando a comunidade <br className="hidden md:block" /> através da educação
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              O Uniconnect é uma iniciativa de extensão universitária focada em promover a inclusão digital e o engajamento comunitário em Juiz de Fora.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/sobre" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md shadow-sm transition-colors text-center">
                Conheça o Projeto
              </Link>
              <Link to="/aulas" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold py-3 px-8 rounded-md backdrop-blur-sm transition-colors text-center">
                Acompanhe Nossas Aulas
              </Link>
            </div>
          </div>
        </div>


        {/* Pillars / Features Section */}
        <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Nosso Site Institucional
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Centralizamos todas as informações do nosso projeto de extensão para garantir transparência, organização e registro de impacto histórico.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 flex flex-col items-start hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-md flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Nossa Equipe</h3>
              <p className="text-slate-600 mb-6 flex-grow text-sm leading-relaxed">
                Conheça os alunos e profissionais engajados divididos entre nossas frentes de atuação de Desenvolvimento, Professores e Conteúdo.
              </p>
              <Link to="/participantes" className="text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors">Ver equipe →</Link>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 flex flex-col items-start hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-md flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Aulas Ministradas</h3>
              <p className="text-slate-600 mb-6 flex-grow text-sm leading-relaxed">
                Registro histórico de todas as aulas de tecnologia, detalhando conteúdos, datas e instrutores no Colégio Duque de Caxias.
              </p>
              <Link to="/aulas" className="text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors">Acessar registros →</Link>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 flex flex-col items-start hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-md flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Atividades de Extensão</h3>
              <p className="text-slate-600 mb-6 flex-grow text-sm leading-relaxed">
                Acompanhamento detalhado das ações comunitárias, documentação de progresso e avaliação real de impacto social.
              </p>
              <Link to="/atividades" className="text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors">Ver atividades →</Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};