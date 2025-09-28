import React, { useState } from 'react';
import { CreditCardIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import PaymentForm from './PaymentForm';
import StripeProvider from './StripeProvider';

interface PaymentMethodSelectorProps {
  amount: number;
  appointmentId: string;
  onPaymentSuccess: (paymentMethod: string, paymentIntentId?: string) => void;
  onPaymentError: (error: string) => void;
  isLoading?: boolean;
}

type PaymentMethod = 'card' | 'zelle';

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  amount,
  appointmentId,
  onPaymentSuccess,
  onPaymentError,
  isLoading = false
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');

  const handleCardPaymentSuccess = (paymentIntentId: string) => {
    onPaymentSuccess('card', paymentIntentId);
  };

  const handleZellePayment = () => {
    onPaymentSuccess('zelle');
  };

  const zelleInstructions = {
    phone: '(832) 207-9386',
    email: 'braidsbyevaofficial@gmail.com',
    amount: amount,
    reference: `Appointment ${appointmentId.slice(-6)}`
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Choose Payment Method</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Credit Card Option */}
          <button
            onClick={() => setSelectedMethod('card')}
            className={`p-4 border-2 rounded-lg transition-all duration-200 ${
              selectedMethod === 'card'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <CreditCardIcon className="w-6 h-6 text-primary-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Credit/Debit Card</div>
                <div className="text-sm text-gray-600">Visa, Mastercard, Amex</div>
              </div>
            </div>
          </button>

          {/* Zelle Option */}
          <button
            onClick={() => setSelectedMethod('zelle')}
            className={`p-4 border-2 rounded-lg transition-all duration-200 ${
              selectedMethod === 'zelle'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <BanknotesIcon className="w-6 h-6 text-green-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Zelle</div>
                <div className="text-sm text-gray-600">5% discount applied</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Payment Form */}
      {selectedMethod === 'card' && (
        <StripeProvider>
          <PaymentForm
            amount={amount}
            appointmentId={appointmentId}
            onSuccess={handleCardPaymentSuccess}
            onError={onPaymentError}
            isLoading={isLoading}
          />
        </StripeProvider>
      )}

      {/* Zelle Instructions */}
      {selectedMethod === 'zelle' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-green-900 mb-4">
            Zelle Payment Instructions
          </h4>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold">${amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Send to:</span>
              <span className="font-semibold">{zelleInstructions.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Reference:</span>
              <span className="font-semibold">{zelleInstructions.reference}</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-green-100 rounded-md">
            <p className="text-sm text-green-800">
              <strong>Note:</strong> Please include the reference number in your Zelle payment memo. 
              Your appointment will be confirmed once payment is received.
            </p>
          </div>

          <button
            onClick={handleZellePayment}
            disabled={isLoading}
            className="w-full mt-4 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? 'Processing...' : 'I\'ve Sent the Zelle Payment'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
