import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

export interface PaymentData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

interface PaymentFormProps {
  price: string;
  onSubmit: (data: PaymentData) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ price, onSubmit }) => {
  const [formData, setFormData] = useState<PaymentData>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim()
      .slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .slice(0, 5);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = () => {
    return (
      formData.cardNumber.replace(/\s/g, '').length === 16 &&
      formData.cardName.length >= 3 &&
      formData.expiryDate.length === 5 &&
      formData.cvv.length === 3
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">Informações de Pagamento</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
            Número do Cartão
          </label>
          <input
            type="text"
            id="cardNumber"
            maxLength={19}
            value={formData.cardNumber}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                cardNumber: formatCardNumber(e.target.value),
              }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
            Nome no Cartão
          </label>
          <input
            type="text"
            id="cardName"
            value={formData.cardName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                cardName: e.target.value.toUpperCase(),
              }))
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
              Data de Validade
            </label>
            <input
              type="text"
              id="expiryDate"
              placeholder="MM/AA"
              maxLength={5}
              value={formData.expiryDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  expiryDate: formatExpiryDate(e.target.value),
                }))
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              maxLength={3}
              value={formData.cvv}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  cvv: e.target.value.replace(/\D/g, ''),
                }))
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={!isFormValid()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <span>Pagar R$ {price}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;