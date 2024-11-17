import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import LicenseCard from './LicenseCard';
import StripeWrapper from './StripePaymentForm';
import { createPaymentIntent } from '../services/stripe';

interface FormData {
  fullName: string;
  email: string;
  cpf: string;
  oab: string;
  oabState: string;
  password: string;
  licenseType: 'basic' | 'pro' | 'premium';
}

interface RegistrationFormProps {
  onComplete: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    cpf: '',
    oab: '',
    oabState: '',
    password: '',
    licenseType: 'pro',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const licenses = [
    {
      name: 'Básico',
      price: 199.90,
      period: 'mês',
      type: 'basic' as const,
      features: [
        { text: 'Até 1.000 páginas por processo', included: true },
        { text: 'Até 10 processos por mês', included: true },
        { text: 'Análise processual simples', included: true },
        { text: 'Acesso a modelos básicos', included: true },
        { text: 'Suporte por email', included: true },
        { text: 'Análise avançada de jurisprudência', included: false },
        { text: 'Correção processual automática', included: false },
      ],
    },
    {
      name: 'Profissional',
      price: 379.90,
      period: 'mês',
      type: 'pro' as const,
      features: [
        { text: 'Até 5.000 páginas por processo', included: true },
        { text: 'Até 50 processos por mês', included: true },
        { text: 'Análise processual completa', included: true },
        { text: 'Acesso a todos os modelos', included: true },
        { text: 'Suporte prioritário 24/7', included: true },
        { text: 'Análise avançada de jurisprudência', included: true },
        { text: 'Correção processual automática', included: false },
      ],
      recommended: true,
    },
    {
      name: 'Premium',
      price: 579.49,
      period: 'mês',
      type: 'premium' as const,
      features: [
        { text: 'Até 20.000 páginas por processo', included: true },
        { text: 'Até 100 processos por mês', included: true },
        { text: 'Análise processual completa', included: true },
        { text: 'Acesso a modelos exclusivos', included: true },
        { text: 'Suporte VIP 24/7', included: true },
        { text: 'Análise avançada de jurisprudência', included: true },
        { text: 'Correção processual automática', included: true },
      ],
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatOAB = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})\d+?$/, '$1');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    }
  };

  const handleLicenseSelect = async (type: 'basic' | 'pro' | 'premium') => {
    setFormData((prev) => ({ ...prev, licenseType: type }));
    
    const selectedLicense = licenses.find(license => license.type === type);
    if (selectedLicense) {
      try {
        const { clientSecret } = await createPaymentIntent(selectedLicense.price * 100);
        setClientSecret(clientSecret);
        setShowPayment(true);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      }
    }
  };

  const handlePaymentSuccess = () => {
    const registrationData = {
      ...formData,
      paymentStatus: 'completed',
    };
    console.log('Registration completed:', registrationData);
    onComplete();
  };

  const selectedLicense = licenses.find(license => license.type === formData.licenseType);

  const isStepOneValid = () => {
    return (
      formData.fullName.length >= 3 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.cpf.replace(/\D/g, '').length === 11 &&
      formData.oab.replace(/\D/g, '').length === 6 &&
      formData.oabState &&
      formData.password.length >= 8
    );
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Cadastro de Advogado
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Preencha seus dados para começar
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Nome Completo
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="cpf" className="text-sm font-medium text-gray-700">
                  CPF
                </label>
                <input
                  id="cpf"
                  name="cpf"
                  type="text"
                  required
                  maxLength={14}
                  value={formData.cpf}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      cpf: formatCPF(e.target.value),
                    }));
                  }}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="000.000.000-00"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="oab" className="text-sm font-medium text-gray-700">
                    Número OAB
                  </label>
                  <input
                    id="oab"
                    name="oab"
                    type="text"
                    required
                    maxLength={7}
                    value={formData.oab}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        oab: formatOAB(e.target.value),
                      }));
                    }}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="000.000"
                  />
                </div>

                <div>
                  <label htmlFor="oabState" className="text-sm font-medium text-gray-700">
                    Estado OAB
                  </label>
                  <select
                    id="oabState"
                    name="oabState"
                    required
                    value={formData.oabState}
                    onChange={handleInputChange}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Selecione</option>
                    {brazilianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Mínimo 8 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isStepOneValid()}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Próximo
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Escolha seu plano
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Selecione o plano que melhor atende suas necessidades
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {licenses.map((license) => (
            <LicenseCard
              key={license.type}
              name={license.name}
              price={license.price.toFixed(2)}
              period={license.period}
              features={license.features}
              recommended={license.recommended}
              selected={formData.licenseType === license.type}
              onSelect={() => handleLicenseSelect(license.type)}
            />
          ))}
        </div>

        {showPayment && clientSecret && selectedLicense && (
          <div className="mt-8 max-w-md mx-auto">
            <StripeWrapper
              clientSecret={clientSecret}
              onSuccess={handlePaymentSuccess}
              amount={selectedLicense.price * 100}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;