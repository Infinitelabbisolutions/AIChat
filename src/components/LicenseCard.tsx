import React from 'react';
import { Check, X } from 'lucide-react';

interface Feature {
  text: string;
  included: boolean;
}

interface LicenseCardProps {
  name: string;
  price: string;
  period: string;
  features: Feature[];
  recommended?: boolean;
  selected: boolean;
  onSelect: () => void;
}

const LicenseCard: React.FC<LicenseCardProps> = ({
  name,
  price,
  period,
  features,
  recommended,
  selected,
  onSelect,
}) => {
  return (
    <div
      className={`relative rounded-2xl p-8 ${
        selected
          ? 'border-2 border-blue-500 ring-2 ring-blue-500 ring-opacity-50'
          : 'border border-gray-200'
      } ${recommended ? 'shadow-lg' : 'shadow-sm'} bg-white`}
    >
      {recommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full">
            Recomendado
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
        <div className="mt-4 flex items-baseline justify-center gap-2">
          <span className="text-4xl font-bold text-gray-900">R$ {price}</span>
          <span className="text-gray-500">/{period}</span>
        </div>

        <ul className="mt-8 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              {feature.included ? (
                <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
              ) : (
                <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
              )}
              <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-500'}`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={onSelect}
          className={`mt-8 w-full py-3 px-4 rounded-lg transition-colors ${
            selected
              ? 'bg-blue-600 text-white'
              : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
          }`}
        >
          {selected ? 'Selecionado' : 'Selecionar'}
        </button>
      </div>
    </div>
  );
};

export default LicenseCard;