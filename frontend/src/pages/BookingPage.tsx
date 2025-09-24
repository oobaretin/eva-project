import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import { ClockIcon, StarIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { createBooking, testSupabaseConnection } from '../utils/supabase';

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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingFormData | null>(null);

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
    
    // Test Supabase connection on component mount
    testSupabaseConnection();
  }, [selectedStyle]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendBookingToBackend = async (bookingData: BookingFormData) => {
    try {
      // Get pricing and duration from the selected style
      const getStyleDetails = (styleName: string) => {
        const stylePricing: { [key: string]: { price: string; duration: string } } = {
          'Knotless Box Braids': { price: '$250', duration: '5-6 hours' },
          'Small Box Braids': { price: '$300', duration: '6-7 hours' },
          'Medium Box Braids': { price: '$200', duration: '4-5 hours' },
          'Large Box Braids': { price: '$150', duration: '3-4 hours' },
          'Jumbo Box Braids': { price: '$120', duration: '2-3 hours' },
          'Feed-in Cornrows': { price: '$100', duration: '2-3 hours' },
          'Stitch Braids': { price: '$80', duration: '2-3 hours' },
          'Ghana Braids': { price: '$120', duration: '3-4 hours' },
          'French Braids': { price: '$90', duration: '2-3 hours' },
          'Dutch Braids': { price: '$100', duration: '2-3 hours' },
          'Passion Twists': { price: '$180', duration: '3-4 hours' },
          'Senegalese Twists': { price: '$160', duration: '4-5 hours' },
          'Twist Out Style': { price: '$120', duration: '2-3 hours' },
          'Marley Twists': { price: '$160', duration: '4-5 hours' },
          'Spring Twists': { price: '$180', duration: '3-4 hours' },
          'Crochet Braids': { price: '$140', duration: '2-3 hours' },
          'Butterfly Locs': { price: '$220', duration: '4-5 hours' },
          'Faux Locs': { price: '$200', duration: '4-6 hours' },
          'Box Braids with Curls': { price: '$240', duration: '5-6 hours' },
          'Lemonade Braids': { price: '$160', duration: '3-4 hours' },
          'Kids Box Braids': { price: '$80', duration: '2-3 hours' },
          'Kids Cornrows': { price: '$60', duration: '1-2 hours' },
          'Kids Twists': { price: '$70', duration: '2-3 hours' },
          'Kids Pigtails': { price: '$50', duration: '1-2 hours' },
          'Goddess Braids': { price: '$180', duration: '3-4 hours' },
          'Fulani Braids': { price: '$200', duration: '4-5 hours' },
          'Halo Braid': { price: '$150', duration: '2-3 hours' },
          'Crown Braids': { price: '$170', duration: '3-4 hours' },
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
        status: 'pending'
      };

      // Create booking in Supabase
      const result = await createBooking(bookingPayload);
      console.log('Booking submitted successfully:', result);
      
      // Send booking to backend for email notifications
      try {
        const emailResponse = await fetch('http://localhost:5001/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingPayload)
        });
        
        if (emailResponse.ok) {
          console.log('Email notifications sent successfully');
        }
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the booking if email fails
      }
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      throw error; // Re-throw to handle in the main function
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.selectedDate || !formData.selectedTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Store booking details before resetting form
      setBookingDetails({ ...formData });
      
      // Send booking to backend (which will send emails)
      await sendBookingToBackend(formData);
      
      // Show confirmation modal
      setShowConfirmation(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        selectedDate: '',
        selectedTime: '',
        selectedStyle: selectedStyle?.title || '',
        specialRequests: ''
      });
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('Failed to submit booking. Please try again or contact us directly at (832) 207-9386');
    } finally {
      setIsSubmitting(false);
    }
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

      {/* Booking Form */}
      <div className="container-max section-padding">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            
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
                  Booking Appointment...
                </>
              ) : (
                'Book Appointment'
              )}
            </button>

            {/* Contact Info */}
            <div className="mt-6 text-center text-sm text-secondary-600">
              <p>Need help? Call us at <a href="tel:+18322079386" className="text-primary-600 hover:text-primary-700 font-medium">(832) 207-9386</a></p>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Success Message */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Appointment Booked!
              </h3>
              <p className="text-gray-600 mb-6">
                Thank you for booking with BraidsbyEva! We have received your appointment request and sent confirmation emails to both you and Eva. You should receive an email confirmation shortly at {bookingDetails?.email}. Eva will also contact you within 24 hours to confirm your appointment details.
              </p>
              
              {/* Appointment Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Appointment Details:</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Name:</strong> {bookingDetails?.name}</p>
                  <p><strong>Date:</strong> {bookingDetails?.selectedDate}</p>
                  <p><strong>Time:</strong> {bookingDetails?.selectedTime}</p>
                  {bookingDetails?.selectedStyle && (
                    <p><strong>Style:</strong> {bookingDetails.selectedStyle}</p>
                  )}
                  <p><strong>Phone:</strong> {bookingDetails?.phone}</p>
                  <p><strong>Email:</strong> {bookingDetails?.email}</p>
                </div>
              </div>
              
              {/* Next Steps */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• We'll call you to confirm your appointment</li>
                  <li>• You'll receive a confirmation text/email</li>
                  <li>• We'll send you preparation instructions</li>
                </ul>
              </div>
              
              {/* Contact Info */}
              <div className="text-sm text-gray-500 mb-6">
                <p>Questions? Call us at <a href="tel:+18322079386" className="text-primary-600 hover:text-primary-700 font-medium">(832) 207-9386</a></p>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;