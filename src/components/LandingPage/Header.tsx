import React from 'react';
import { Scale } from 'lucide-react';

interface HeaderProps {
  onGetStarted: () => void;
  onDemoStart?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGetStarted, onDemoStart }) => {
  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-blue-600" />
            <span className="font-semibold text-gray-900">Assistente Jurídico IA</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-600 hover:text-blue-600">Recursos</a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-blue-600">Preços</a>
            <a href="#about" className="text-sm text-gray-600 hover:text-blue-600">Sobre</a>
            <a href="#contact" className="text-sm text-gray-600 hover:text-blue-600">Contato</a>
            {onDemoStart && (
              <button
                onClick={onDemoStart}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Demo
              </button>
            )}
            <button
              onClick={onGetStarted}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 transition-opacity"
            >
              Começar Agora
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;