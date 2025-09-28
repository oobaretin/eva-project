import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { ClockIcon, StarIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
// Removed Supabase import - now using backend API
import PaymentMethodSelector from '../components/PaymentMethodSelector';
import StripeProvider from '../components/StripeProvider';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  selectedDate: string;
  selectedTime: string;
  selectedStyle: string;
  specialRequests: string;
}


const BookingPage: React.FC = () => {
  const location = useLocation();
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    selectedDate: '',
    selectedTime: '',
    selectedStyle: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingFormData | null>(null);
  const [currentStep, setCurrentStep] = useState<'form' | 'payment' | 'confirmation'>('form');
  const [appointmentId, setAppointmentId] = useState<string>('');
  const [servicePrice, setServicePrice] = useState<number>(0);
  const [fullPrice, setFullPrice] = useState<number>(0);
  const [isDepositRequired, setIsDepositRequired] = useState<boolean>(false);

  // Available time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  // Get selected style from gallery
  const selectedStyle = location.state?.selectedStyle;

  useEffect(() => {
    if (selectedStyle) {
      setFormData(prev => ({
        ...prev,
        selectedStyle: selectedStyle.title
      }));
    }
    
    // Backend API connection is handled automatically
  }, [selectedStyle]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendBookingToBackend = async (bookingData: BookingFormData, paymentMethod?: string, paymentIntentId?: string) => {
    try {
      // Get pricing and duration from the selected style
      const getStyleDetails = (styleName: string) => {
        const stylePricing: { [key: string]: { price: string; duration: string } } = {
          'Knotless Box Braids': { price: '$275', duration: '5-6 hours' },
          'Small Box Braids': { price: '$330', duration: '6-7 hours' },
          'Medium Box Braids': { price: '$210', duration: '4-5 hours' },
          'Large Box Braids': { price: '$158', duration: '3-4 hours' },
          'Jumbo Box Braids': { price: '$120', duration: '2-3 hours' },
          'Feed-in Cornrows': { price: '$100', duration: '2-3 hours' },
          'Stitch Braids': { price: '$80', duration: '2-3 hours' },
          'Ghana Braids': { price: '$120', duration: '3-4 hours' },
          'French Braids': { price: '$90', duration: '2-3 hours' },
          'Dutch Braids': { price: '$100', duration: '2-3 hours' },
          'Passion Twists': { price: '$189', duration: '3-4 hours' },
          'Senegalese Twists': { price: '$168', duration: '4-5 hours' },
          'Twist Out Style': { price: '$120', duration: '2-3 hours' },
          'Marley Twists': { price: '$168', duration: '4-5 hours' },
          'Spring Twists': { price: '$189', duration: '3-4 hours' },
          'Crochet Braids': { price: '$140', duration: '2-3 hours' },
          'Butterfly Locs': { price: '$242', duration: '4-5 hours' },
          'Faux Locs': { price: '$210', duration: '4-6 hours' },
          'Box Braids with Curls': { price: '$264', duration: '5-6 hours' },
          'Lemonade Braids': { price: '$168', duration: '3-4 hours' },
          'Kids Box Braids': { price: '$80', duration: '2-3 hours' },
          'Kids Cornrows': { price: '$60', duration: '1-2 hours' },
          'Kids Twists': { price: '$70', duration: '2-3 hours' },
          'Kids Pigtails': { price: '$50', duration: '1-2 hours' },
          'Goddess Braids': { price: '$189', duration: '3-4 hours' },
          'Fulani Braids': { price: '$210', duration: '4-5 hours' },
          'Halo Braid': { price: '$150', duration: '2-3 hours' },
          'Crown Braids': { price: '$179', duration: '3-4 hours' },
        };
        
        return stylePricing[styleName] || { price: 'To be discussed', duration: 'To be discussed' };
      };

      const styleDetails = getStyleDetails(bookingData.selectedStyle);
      
      // Prepare data for Supabase
      const bookingPayload = {
        service_name: bookingData.selectedStyle || 'Braiding Service',
        service_price: styleDetails.price,
        service_duration: styleDetails.duration,
        appointment_date: bookingData.selectedDate,
        appointment_time: bookingData.selectedTime,
        customer_first_name: bookingData.name.split(' ')[0] || bookingData.name,
        customer_last_name: bookingData.name.split(' ').slice(1).join(' ') || '',
        customer_email: bookingData.email,
        customer_phone: bookingData.phone,
        customer_hair_length: 'Not specified',
        customer_hair_texture: 'Not specified',
        customer_previous_braids: false,
        customer_allergies: 'None',
        customer_notes: bookingData.specialRequests || '',
        status: paymentMethod ? 'confirmed' : 'pending',
        payment_method: paymentMethod || 'pending',
        payment_intent_id: paymentIntentId || null,
        appointment_id: appointmentId
      };

      // Calculate payment information using the actual service price
      const priceInfo = calculateServicePrice(bookingData.selectedStyle);
      const totalAmount = priceInfo.fullPrice;
      const isDepositRequired = priceInfo.isDepositRequired;
      const paidAmount = priceInfo.depositAmount;
      const remainingBalance = totalAmount - paidAmount;

      // Send booking to backend for processing and email notifications
      const backendPayload = {
        service: {
          name: bookingData.selectedStyle || 'Braiding Service',
          price: `$${totalAmount}`,
          duration: styleDetails.duration
        },
        date: bookingData.selectedDate,
        time: bookingData.selectedTime,
        customer: {
          firstName: bookingData.name.split(' ')[0] || bookingData.name,
          lastName: bookingData.name.split(' ').slice(1).join(' ') || 'Customer',
          email: bookingData.email,
          phone: bookingData.phone,
          hairLength: 'Not specified',
          hairTexture: 'Not specified',
          previousBraids: false,
          allergies: 'None',
          notes: bookingData.specialRequests || ''
        },
        paymentInfo: {
          totalAmount: totalAmount,
          paidAmount: paidAmount,
          remainingBalance: remainingBalance,
          isDeposit: isDepositRequired,
          paymentMethod: paymentMethod || 'Card Payment'
        }
      };

      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendPayload)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create booking');
      }
      
      const result = await response.json();
      console.log('Booking submitted successfully:', result);
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      throw error; // Re-throw to handle in the main function
    }
  };

  const calculateServicePrice = (styleName: string): { fullPrice: number; depositAmount: number; isDepositRequired: boolean } => {
    const stylePricing: { [key: string]: number } = {
      'Knotless Box Braids': 275, // 10% increase from $250
      'Small Box Braids': 330, // 10% increase from $300
      'Medium Box Braids': 210, // 5% increase from $200
      'Large Box Braids': 158, // 5% increase from $150
      'Jumbo Box Braids': 120, // No change
      'Feed-in Cornrows': 100, // No change
      'Stitch Braids': 80, // No change
      'Ghana Braids': 120, // No change
      'French Braids': 90, // No change
      'Dutch Braids': 100, // No change
      'Passion Twists': 189, // 5% increase from $180
      'Senegalese Twists': 168, // 5% increase from $160
      'Twist Out Style': 120, // No change
      'Marley Twists': 168, // 5% increase from $160
      'Spring Twists': 189, // 5% increase from $180
      'Crochet Braids': 140, // No change
      'Butterfly Locs': 242, // 10% increase from $220
      'Faux Locs': 210, // 5% increase from $200
      'Box Braids with Curls': 264, // 10% increase from $240
      'Lemonade Braids': 168, // 5% increase from $160
      'Kids Box Braids': 80, // No change
      'Kids Cornrows': 60, // No change
      'Kids Twists': 70, // No change
      'Kids Pigtails': 50, // No change
      'Goddess Braids': 189, // 5% increase from $180
      'Fulani Braids': 210, // 5% increase from $200
      'Halo Braid': 150, // No change
      'Crown Braids': 179, // 5% increase from $170
    };
    
    const fullPrice = stylePricing[styleName] || 150;
    const isDepositRequired = fullPrice > 200; // Services over $200 require deposit (not including $200)
    const depositAmount = isDepositRequired ? Math.round(fullPrice * 0.5) : fullPrice; // 50% deposit for large services
    
    return { fullPrice, depositAmount, isDepositRequired };
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.selectedDate || !formData.selectedTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Calculate service price
    const priceInfo = calculateServicePrice(formData.selectedStyle);
    setServicePrice(priceInfo.depositAmount);
    setFullPrice(priceInfo.fullPrice);
    setIsDepositRequired(priceInfo.isDepositRequired);
    
    // Generate appointment ID
    const appointmentId = `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setAppointmentId(appointmentId);
    
    // Move to payment step
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = async (paymentMethod: string, paymentIntentId?: string) => {
    setIsSubmitting(true);
    
    try {
      // Store booking details
      setBookingDetails({ ...formData });
      
      // Send booking to backend with payment info
      await sendBookingToBackend(formData, paymentMethod, paymentIntentId);
      
      // Move to confirmation step
      setCurrentStep('confirmation');
      
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Payment processed but booking failed. Please contact us at (832) 207-9386');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentError = (error: string) => {
    toast.error(error);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-4">
              Book Your Appointment
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Schedule your professional braiding service with Eva. Choose your date, time, and we'll take care of the rest.
            </p>
          </div>
        </div>
      </div>

      {/* Selected Style Banner */}
      {selectedStyle && (
        <div className="bg-primary-50 border-l-4 border-primary-500 p-4">
          <div className="container-max">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-primary-900">
                  Style Selected from Gallery
                </h3>
                <p className="text-primary-700">
                  You've selected "{selectedStyle.title}" - we'll help you book this style!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step Indicator */}
      <div className="container-max section-padding">
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${currentStep === 'form' ? 'text-primary-600' : currentStep === 'payment' || currentStep === 'confirmation' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'form' ? 'bg-primary-600 text-white' : currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Booking Details</span>
            </div>
            <div className={`w-8 h-1 ${currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${currentStep === 'payment' ? 'text-primary-600' : currentStep === 'confirmation' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'payment' ? 'bg-primary-600 text-white' : currentStep === 'confirmation' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
            <div className={`w-8 h-1 ${currentStep === 'confirmation' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${currentStep === 'confirmation' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'confirmation' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      {currentStep === 'form' && (
        <div className="container-max section-padding">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleFormSubmit} className="bg-white rounded-lg shadow-lg p-8">
            
            {/* Date Selection */}
            <div className="mb-6">
              <label htmlFor="selectedDate" className="block text-sm font-medium text-secondary-700 mb-2">
                Select Date *
              </label>
              <input
                type="date"
                id="selectedDate"
                name="selectedDate"
                value={formData.selectedDate}
                onChange={handleInputChange}
                min={getMinDate()}
                max={getMaxDate()}
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            {/* Time Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Select Time *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, selectedTime: time }))}
                    className={`py-3 px-4 rounded-lg border text-center font-medium transition-all duration-200 ${
                      formData.selectedTime === time
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-secondary-700 border-secondary-300 hover:border-primary-500 hover:bg-primary-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            {/* Selected Style */}
            <div className="mb-6">
              <label htmlFor="selectedStyle" className="block text-sm font-medium text-secondary-700 mb-2">
                Hairstyle (if selected from gallery)
              </label>
              <input
                type="text"
                id="selectedStyle"
                name="selectedStyle"
                value={formData.selectedStyle}
                onChange={handleInputChange}
                placeholder="Leave blank if you haven't selected a specific style"
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Special Requests */}
            <div className="mb-8">
              <label htmlFor="specialRequests" className="block text-sm font-medium text-secondary-700 mb-2">
                Special Requests or Notes
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows={4}
                placeholder="Any specific requests, hair concerns, or additional information..."
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                'Continue to Payment'
              )}
            </button>

            {/* Contact Info */}
            <div className="mt-6 text-center text-sm text-secondary-600">
              <p>Need help? Call us at <a href="tel:+18322079386" className="text-primary-600 hover:text-primary-700 font-medium">(832) 207-9386</a></p>
            </div>
          </form>
        </div>
      </div>
      )}

      {/* Payment Step */}
      {currentStep === 'payment' && (
        <div className="container-max section-padding">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-serif font-bold text-secondary-900 mb-2">
                  Complete Your Booking
                </h2>
                <p className="text-secondary-600">
                  Choose your payment method to secure your appointment
                </p>
              </div>

              {/* Service Summary */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{formData.selectedStyle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{formData.selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{formData.selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Price:</span>
                    <span className="font-medium">${fullPrice}</span>
                  </div>
                  {isDepositRequired && (
                    <>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Deposit Required (50%):</span>
                        <span>${servicePrice}</span>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                        <p className="text-sm text-blue-800">
                          <strong>Deposit Policy:</strong> Services over $200 require a 50% deposit to secure your appointment. 
                          The remaining balance (${fullPrice - servicePrice}) will be due at your appointment.
                        </p>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span>{isDepositRequired ? 'Deposit Due:' : 'Total:'}</span>
                    <span className="text-primary-600">${servicePrice}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <StripeProvider>
                <PaymentMethodSelector
                  amount={servicePrice}
                  appointmentId={appointmentId}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  isLoading={isSubmitting}
                />
              </StripeProvider>

              {/* Back Button */}
              <button
                onClick={() => setCurrentStep('form')}
                className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Back to Booking Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Step */}
      {currentStep === 'confirmation' && (
        <div className="container-max section-padding">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="text-2xl font-serif font-bold text-secondary-900 mb-4">
                Booking Confirmed!
              </h2>
              
              <p className="text-lg text-secondary-600 mb-6">
                Thank you for booking with BraidsbyEva! We're excited to create your beautiful style.
              </p>

              {/* Booking Details */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{bookingDetails?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{bookingDetails?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{bookingDetails?.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{bookingDetails?.selectedStyle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{bookingDetails?.selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{bookingDetails?.selectedTime}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span>Total Paid:</span>
                    <span className="text-green-600">${servicePrice}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-secondary-600 mb-6">
                You'll receive a confirmation email shortly. If you have any questions, please call us at (832) 207-9386.
              </p>

              <button
                onClick={() => {
                  setCurrentStep('form');
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    selectedDate: '',
                    selectedTime: '',
                    selectedStyle: selectedStyle?.title || '',
                    specialRequests: ''
                  });
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookingPage;