import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_your_publishable_key');

export interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
}

export const createPaymentIntent = async (amount: number): Promise<PaymentIntent> => {
  // In a real application, this would be an API call to your backend
  // which would create a PaymentIntent using your Stripe secret key
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  });

  return response.json();
};

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount / 100);
};

export default stripePromise;