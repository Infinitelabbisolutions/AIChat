import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onDemoStart?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, onDemoStart }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const words = [
    'Advogados',
    'Procuradores',
    'Delegados',
    'Defensores Públicos',
    'Promotores de Justiça',
    'Auditores',
    'Consultores Legislativos',
    'Juízes'
  ];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  useEffect(() => {
    const word = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(word.substring(0, currentText.length + 1));
        
        if (currentText.length === word.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setCurrentText(word.substring(0, currentText.length - 1));
        
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Inteligência Artificial para{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block min-w-[200px]">
              {currentText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Automatize a criação de processos, análise jurídica e gestão de documentos com nossa IA especializada em direito brasileiro.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Começar Gratuitamente
              <ArrowRight className="w-4 h-4" />
            </button>
            {onDemoStart && (
              <button
                onClick={onDemoStart}
                className="px-6 py-3 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                Ver Demonstração
                <Sparkles className="w-4 h-4 text-blue-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;