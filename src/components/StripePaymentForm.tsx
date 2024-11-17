import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { CreditCard } from 'lucide-react';
import stripePromise from '../services/stripe';
import { formatPrice } from '../services/stripe';

interface StripePaymentFormProps {
  clientSecret: string;
  onSuccess: () => void;
  amount: number;
}

const PaymentForm: React.FC<StripePaymentFormProps> = ({
  clientSecret,
  onSuccess,
  amount,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
      redirect: 'if_required',
    });

    if (submitError) {
      setError(submitError.message || 'Ocorreu um erro ao processar o pagamento.');
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">
            Informações de Pagamento
          </h3>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Total a pagar: <span className="font-semibold">{formatPrice(amount)}</span>
          </p>
        </div>

        <div className="space-y-4">
          <PaymentElement />

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isProcessing || !stripe}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Processando...</span>
            ) : (
              <span>Finalizar Pagamento</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

interface StripeWrapperProps {
  clientSecret: string;
  onSuccess: () => void;
  amount: number;
}

const StripeWrapper: React.FC<StripeWrapperProps> = ({
  clientSecret,
  onSuccess,
  amount,
}) => {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm
        clientSecret={clientSecret}
        onSuccess={onSuccess}
        amount={amount}
      />
    </Elements>
  );
};

export default StripeWrapper;