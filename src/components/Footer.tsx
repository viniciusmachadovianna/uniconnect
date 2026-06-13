import React from 'react';
import logoImage from '../../frontend/src/assets/uni.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-6 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Brand & Description */}
          <div>
            <span className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3 mb-2">
              <img src={logoImage} alt="Logo Uniconnect" className="w-8 h-8 object-contain" />
              <span className="text-2xl font-extrabold tracking-tight">
                Uni<span className="text-blue-700">connect</span>
              </span>
            </span>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Transformando realidades através da extensão universitária, conectando o conhecimento acadêmico diretamente com as necessidades da comunidade.
            </p>
          </div>

          {/* Contact Info */}
          <div className="md:justify-self-end">
            <h3 className="text-white font-semibold mb-2 text-lg">Contato e Endereço</h3>
            <ul className="space-y-1 text-sm text-slate-400">
              <li><strong className="text-slate-300">Email:</strong> uniconnectjf@gmail.com</li>
              <li><strong className="text-slate-300">Instagram:</strong> @uniconnect.jf</li>
              <li><strong className="text-slate-300">Sede:</strong> UniAcademia, Juiz de Fora - MG</li>
              <li><strong className="text-slate-300">Atuação:</strong> Colégio Duque de Caxias</li>
            </ul>
          </div>

        </div>
        
        {/* Copyright */}
        <div className="border-t border-slate-800 mt-4 pt-3 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Uniconnect. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};