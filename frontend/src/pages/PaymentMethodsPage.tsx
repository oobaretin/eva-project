import React from 'react';

const PaymentMethodsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-4">
              Payment Methods
            </h1>
            <p className="text-xl text-secondary-600">
              We accept various payment methods for your convenience. Choose what works best for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Accepted Payment Methods */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-6">Accepted Payment Methods</h2>
                
                <div className="space-y-6">
                  {/* Cash */}
                  <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-secondary-900">Cash</h3>
                      <p className="text-secondary-600 text-sm">Preferred method - no fees</p>
                    </div>
                    <div className="text-green-600 font-semibold">✓ Accepted</div>
                  </div>

                  {/* Zelle */}
                  <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-secondary-900">Zelle</h3>
                      <p className="text-secondary-600 text-sm">(832) 207-9386</p>
                    </div>
                    <div className="text-green-600 font-semibold">✓ Accepted</div>
                  </div>

                  {/* Credit/Debit Cards */}
                  <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-secondary-900">Credit/Debit Cards</h3>
                      <p className="text-secondary-600 text-sm">Visa, Mastercard, American Express</p>
                    </div>
                    <div className="text-yellow-600 font-semibold">⚠️ Limited</div>
                  </div>

                  {/* PayPal */}
                  <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-secondary-900">PayPal</h3>
                      <p className="text-secondary-600 text-sm">Coming soon</p>
                    </div>
                    <div className="text-gray-400 font-semibold">⏳ Soon</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-6">Payment Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Payment Due</h3>
                      <p className="text-secondary-600 text-sm">Payment is due at the time of service completion</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-secondary-900">No Hidden Fees</h3>
                      <p className="text-secondary-600 text-sm">All prices include tax and are clearly displayed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Secure Processing</h3>
                      <p className="text-secondary-600 text-sm">All card transactions are processed securely</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Receipt Provided</h3>
                      <p className="text-secondary-600 text-sm">Digital receipt sent to your email</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details & Instructions */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-6">Zelle Payment Instructions</h2>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                  <p className="text-purple-800 font-semibold mb-2">Zelle Phone Number:</p>
                  <p className="text-purple-900 text-lg">(832) 207-9386</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Open Your Banking App</h3>
                      <p className="text-secondary-600 text-sm">Use your bank's mobile app or online banking</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Find Zelle</h3>
                      <p className="text-secondary-600 text-sm">Look for the Zelle option in your app</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Send Payment</h3>
                      <p className="text-secondary-600 text-sm">Send to: (832) 207-9386</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Confirm Amount</h3>
                      <p className="text-secondary-600 text-sm">Enter the exact service amount</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    <strong>Note:</strong> Zelle payments are instant and secure. 
                    Make sure to use the exact phone number: (832) 207-9386
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-6">Deposits & Large Services</h2>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Services Over $200</h3>
                    <p className="text-blue-800 text-sm">
                      A 50% deposit is required when booking services over $200. 
                      The remaining balance is due at service completion.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-400 bg-green-50 p-4">
                    <h3 className="font-semibold text-green-900 mb-2">Wedding/Event Services</h3>
                    <p className="text-green-800 text-sm">
                      Special event bookings require a $100 non-refundable deposit 
                      to secure your appointment.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-purple-400 bg-purple-50 p-4">
                    <h3 className="font-semibold text-purple-900 mb-2">Group Bookings</h3>
                    <p className="text-purple-800 text-sm">
                      Group appointments (3+ people) require a $50 deposit per person 
                      to confirm all appointments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-6">Refund Policy</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Service Satisfaction</h3>
                      <p className="text-secondary-600 text-sm">
                        If you're not satisfied with your service, please contact us within 48 hours. 
                        We'll work with you to make it right.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Deposit Refunds</h3>
                      <p className="text-secondary-600 text-sm">
                        Deposits are non-refundable but can be applied to rescheduled appointments 
                        with 24+ hours notice.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-secondary-900">No Cash Refunds</h3>
                      <p className="text-secondary-600 text-sm">
                        We do not provide cash refunds. All refunds are processed through 
                        the original payment method.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
                Questions About Payment?
              </h2>
              <p className="text-secondary-600 mb-6">
                Contact us if you have any questions about our payment methods or policies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+18322079386"
                  className="bg-primary-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
                >
                  Call (832) 207-9386
                </a>
                <a
                  href="mailto:braidsbyevaofficial@gmail.com"
                  className="bg-gray-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPage;
