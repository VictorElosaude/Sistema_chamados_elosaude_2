import React from 'react';
import elosaudeLogoBranco from '../assets/elosaudebranco.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-elosaude-dark text-white py-6">
      <div className="container mx-auto flex flex-col items-center text-center text-sm">
        {/* Logo do footer */}
        <img src={elosaudeLogoBranco} alt="Logo Elosaúde Branco" className="h-8 mb-2" />

        {/* Texto de direitos autorais centralizado */}
        <p>© {currentYear} Elosaúde. Todos os direitos reservados.</p>
        <p>Desenvolvido por: Inovação Elosaúde</p>
      </div>
    </footer>
  );
};

export default Footer;