import React from 'react';
import duqueImage from '../../frontend/src/assets/duque.jpg';
import { Footer } from '../components/Footer';

export const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Sobre Nós</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Conheça o Uniconnect, uma iniciativa dedicada a promover a integração e o engajamento comunitário através de atividades extensionistas.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Nossa Missão</h2>
          <div className="space-y-4 text-base md:text-lg text-slate-600 leading-relaxed">
            <p>
              O Uniconnect é um projeto de extensão universitária que busca promover a integração e o engajamento dos participantes em atividades sociais de impacto positivo na comunidade.
            </p>
            <p>
              Através de uma plataforma centralizada, facilitamos o registro, acompanhamento e documentação de todas as atividades realizadas, contribuindo para a transparência e organização das ações sociais.
            </p>
            <p>
              Acreditamos que a educação e o engajamento comunitário são ferramentas poderosas para transformar realidades e criar oportunidades para todos.
            </p>
          </div>
        </div>
      </section>

      {/* Current Operation Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative rounded-lg overflow-hidden shadow-sm border border-slate-200 group">
              <img 
                src={duqueImage} 
                alt="Colégio Duque de Caxias" 
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/60 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Colégio Duque de Caxias</h3>
                <p className="text-slate-200 leading-relaxed">
                  Levando inclusão digital e inovação para as salas de aula
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Onde Atuamos</h2>
            <div className="space-y-4 text-base md:text-lg text-slate-600 leading-relaxed">
              <p>
                Atualmente, nosso projeto concentra suas atividades no <strong>Colégio Duque de Caxias</strong>, localizado na cidade de Juiz de Fora - MG.
              </p>
              <p>
                Nossa equipe atua diretamente na instituição, ministrando <strong>aulas de tecnologia e inovação</strong> para os alunos. Nosso objetivo principal é democratizar o acesso ao conhecimento digital.
              </p>
              <p>
                Através dessa parceria, proporcionamos aos estudantes o contato prático com ferramentas tecnológicas, desenvolvendo habilidades essenciais para o futuro e despertando o interesse pelas carreiras na área de TI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 mb-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Nossos Valores</h2>
          <p className="text-lg text-slate-600">
            Os pilares que guiam nossas ações e decisões no dia a dia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 border-t-4 border-t-blue-600">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Inclusão</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Promovemos a participação ativa de todos, independentemente de background ou experiência prévia.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 border-t-4 border-t-blue-600">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Colaboração</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Trabalhamos juntos, compartilhando conhecimentos e experiências para atingir objetivos comuns.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 border-t-4 border-t-blue-600">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Educação</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              A educação é o alicerce de nossas ações, buscando sempre transmitir conhecimento significativo.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 border-t-4 border-t-blue-600">
            <h3 className="text-xl font-bold text-slate-900 mb-3">Transparência</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Mantemos transparência em todas as nossas ações e resultados, documentando nosso impacto.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};