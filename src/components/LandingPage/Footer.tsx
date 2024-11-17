import React from 'react';
import { Scale } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-6 h-6 text-blue-400" />
              <span className="font-semibold">Assistente Jurídico IA</span>
            </div>
            <p className="text-gray-400 text-sm">
              Transformando o trabalho jurídico com inteligência artificial
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-white text-sm">Recursos</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white text-sm">Preços</a></li>
              <li><a href="#demo" className="text-gray-400 hover:text-white text-sm">Demonstração</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white text-sm">Sobre</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white text-sm">Contato</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacidade</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/terms" className="text-gray-400 hover:text-white text-sm">Termos de Uso</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white text-sm">Política de Privacidade</a></li>
              <li><a href="/compliance" className="text-gray-400 hover:text-white text-sm">Compliance</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Assistente Jurídico IA. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;