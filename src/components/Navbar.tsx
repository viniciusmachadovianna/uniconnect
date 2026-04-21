import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold">U</span>
            </div>
            <span className="text-xl font-bold hidden sm:inline">Uniconnect</span>
          </Link>

          <div className="flex gap-8">
            <Link
              to="/"
              className="hover:text-blue-100 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/participantes"
              className="hover:text-blue-100 transition-colors duration-200"
            >
              Participantes
            </Link>
            <Link
              to="/aulas"
              className="hover:text-blue-100 transition-colors duration-200"
            >
              Aulas
            </Link>
            <Link
              to="/atividades"
              className="hover:text-blue-100 transition-colors duration-200"
            >
              Atividades
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
