import React from 'react';
import { FileText, Brain, CheckCircle2 } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Recursos Poderosos</h2>
          <p className="text-lg text-gray-600">
            Tudo que você precisa para otimizar seu trabalho jurídico
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
            <FileText className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Geração de Processos</h3>
            <p className="text-gray-600">
              Crie petições e documentos jurídicos automaticamente com nossa IA especializada
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
            <Brain className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Análise Inteligente</h3>
            <p className="text-gray-600">
              Análise completa de processos e documentos com identificação de pontos críticos
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
            <CheckCircle2 className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Revisão Automática</h3>
            <p className="text-gray-600">
              Correção e sugestões de melhorias em tempo real para seus documentos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;