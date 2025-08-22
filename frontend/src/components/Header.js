import React from 'react';
import { Link } from 'react-router-dom';
import elosaudeLogo from '../assets/elosaude_semFundo.png';

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <nav className="container mx-auto grid grid-cols-3 items-center">
        {/* Coluna 1: Logo alinhado à esquerda */}
        <div className="flex items-center space-x-2 justify-self-start">
          <img src={elosaudeLogo} alt="Logo Elosaúde" className="h-12" />
        </div>

        {/* Coluna 2: Título centralizado */}
        <div className="justify-self-center text-center">
          <span className="text-xl font-bold text-gray-800">
            Sistema de Comunicados
          </span>
        </div>

        {/* Coluna 3: Links alinhados à direita */}
        <div className="space-x-4 flex items-center justify-self-end">
          <Link to="/create" className="text-elosaude-green hover:text-green-700 font-semibold">
            Criar Comunicado
          </Link>
          <Link to="/analytics" className="text-elosaude-green hover:text-green-700 font-semibold">
            Análise
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;