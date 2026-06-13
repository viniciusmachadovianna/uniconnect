import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../../frontend/src/assets/uni.png';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Sobre Nós', path: '/sobre' },
    { name: 'Participantes', path: '/participantes' },
    { name: 'Aulas', path: '/aulas' },
    { name: 'Aba Office', path: '/office' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Lado Esquerdo: Logo Institucional */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img src={logoImage} alt="Logo Uniconnect" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Uni<span className="text-blue-700">connect</span>
              </span>
            </Link>
          </div>

          {/* Centro/Direita: Links de Navegação (Desktop) */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`inline-flex items-center h-full px-1 border-b-2 text-[15px] font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'border-blue-700 text-blue-700'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Botão de Área Restrita / Contato */}
          </div>

          {/* Botão do Menu Mobile (Hambúrguer) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
              aria-label="Abrir menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
};
