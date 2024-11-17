import React from 'react';
import { Check } from 'lucide-react';

interface PricingSectionProps {
  onGetStarted: () => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onGetStarted }) => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Planos e Preços</h2>
          <p className="text-lg text-gray-600">
            Escolha o plano ideal para suas necessidades
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Básico</h3>
            <p className="text-3xl font-bold text-gray-900 mb-6">
              R$ 199,90<span className="text-lg font-normal text-gray-500">/mês</span>
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">Até 1.000 páginas por processo</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">Até 10 processos por mês</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">Suporte por email</span>
              </li>
            </ul>
            <button
              onClick={onGetStarted}
              className="w-full py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Começar Agora
            </button>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border-2 border-blue-600 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
              Mais Popular
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Profissional</h3>
            <p className="text-3xl font-bold text-gray-900 mb-6">
              R$ 379,90<span className="text-lg font-normal text-gray-500">/mês</span>
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">Até 5.000 páginas por processo</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">Até 50 processos por mês</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">Suporte prioritário 24/7</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">Modelos personalizados</span>
              </li>
            </ul>
            <button
              onClick={onGetStarted}
              className="w-full py-2 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 transition-opacity"
            >
              Começar Agora
            </button>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium</h3>
            <p className="text-3xl font-bold text-gray-900 mb-6">
              R$ 579,49<span className="text-lg font-normal text-gray-500">/mês</span>
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">Até 20.000 páginas por processo</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">Até 100 processos por mês</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">API personalizada</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">Gerente de conta dedicado</span>
              </li>
            </ul>
            <button
              onClick={onGetStarted}
              className="w-full py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Começar Agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;