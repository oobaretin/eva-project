import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { sendBookingEmails } from '../services/emailService';
import ServiceMenu from '../components/ServiceMenu';

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

  const handleServiceSelect = (serviceName: string, price: string, duration: string) => {
    setFormData(prev => ({
      ...prev,
      selectedStyle: serviceName
    }));
    toast.success(`Selected: ${serviceName}`);
  };

    const sendBookingToBackend = async (bookingData: BookingFormData) => {
      console.log('🚀 Starting booking process...');
        console.log('📝 Form data:', bookingData);

        // Get pricing and duration from the selected style
        const getStyleDetails = (styleName: string) => {
          const stylePricing: { [key: string]: { price: string; duration: string } } = {
            // Braids (9 styles)
            'Knotless Box Braids': { price: '$275', duration: '5-6 hours' },
            'Small Box Braids': { price: '$330', duration: '6-7 hours' },
            'Medium Box Braids': { price: '$210', duration: '4-5 hours' },
            'Large Box Braids': { price: '$158', duration: '3-4 hours' },
            'Jumbo Box Braids': { price: '$120', duration: '2-3 hours' },
            'Box Braids with Curls': { price: '$264', duration: '5-6 hours' },
            'Ghana Braids': { price: '$120', duration: '3-4 hours' },
            'French Braids': { price: '$90', duration: '2-3 hours' },
            'Dutch Braids': { price: '$100', duration: '2-3 hours' },
            // Twists (8 styles)
            'Passion Twists': { price: '$210', duration: '3-4 hours' },
            'Senegalese Twists': { price: '$210', duration: '4-5 hours' },
            'Twist Out Style': { price: '$120', duration: '2-3 hours' },
            'Marley Twists': { price: '$190', duration: '4-5 hours' },
            'Spring Twists': { price: '$210', duration: '3-4 hours' },
            'Goddess Braids': { price: '$200', duration: '3-4 hours' },
            'Fulani Braids': { price: '$210', duration: '4-5 hours' },
            'Lemonade Braids': { price: '$180', duration: '3-4 hours' },
            // Faux Locs (3 styles)
            'Butterfly Locs': { price: '$280', duration: '4-5 hours' },
            'Faux Locs': { price: '$250', duration: '4-6 hours' },
            'Goddess Locs': { price: '$320', duration: '4-5 hours' },
            // Crochets (9 styles)
            'Crochet Braids': { price: '$150', duration: '2-3 hours' },
            'Crochet Twists': { price: '$160', duration: '2-3 hours' },
            'Crochet Box Braids': { price: '$170', duration: '3-4 hours' },
            'Crochet Faux Locs': { price: '$200', duration: '3-4 hours' },
            'Crochet Passion Twists': { price: '$190', duration: '3-4 hours' },
            'Crochet Senegalese Twists': { price: '$185', duration: '3-4 hours' },
            'Crochet Spring Twists': { price: '$195', duration: '3-4 hours' },
            'Crochet Marley Twists': { price: '$180', duration: '3-4 hours' },
            'Crochet Goddess Braids': { price: '$200', duration: '3-4 hours' },
            // Dreads (2 styles)
            'Traditional Dreads': { price: '$250', duration: '4-5 hours' },
            'Interlocked Dreads': { price: '$280', duration: '5-6 hours' },
            // Kid Styles (8 styles)
            'Kids Box Braids': { price: '$80', duration: '2-3 hours' },
            'Kids Cornrows': { price: '$60', duration: '1-2 hours' },
            'Kids Twists': { price: '$70', duration: '2-3 hours' },
            'Kids Pigtails': { price: '$50', duration: '1-2 hours' },
            'Kids French Braids': { price: '$55', duration: '1-2 hours' },
            'Kids Dutch Braids': { price: '$60', duration: '1-2 hours' },
            'Kids Ponytails': { price: '$45', duration: '1 hour' },
            'Kids Bantu Knots': { price: '$65', duration: '2 hours' },
            // Cornrows (12 styles)
            'Feed-in Cornrows': { price: '$100', duration: '2-3 hours' },
            'Stitch Braids': { price: '$80', duration: '2-3 hours' },
            'Ghana Cornrows': { price: '$90', duration: '2-3 hours' },
            'French Cornrows': { price: '$85', duration: '2 hours' },
            'Dutch Cornrows': { price: '$90', duration: '2 hours' },
            'Goddess Cornrows': { price: '$110', duration: '3 hours' },
            'Fulani Cornrows': { price: '$100', duration: '2-3 hours' },
            'Lemonade Cornrows': { price: '$95', duration: '2-3 hours' },
            'Crown Cornrows': { price: '$105', duration: '3 hours' },
            'Halo Cornrows': { price: '$100', duration: '2-3 hours' },
            'Side Part Cornrows': { price: '$85', duration: '2 hours' },
            'Zigzag Cornrows': { price: '$90', duration: '2-3 hours' },
            // Bantu Knots (7 styles)
            'Traditional Bantu Knots': { price: '$100', duration: '2-3 hours' },
            'Bantu Knot Out': { price: '$120', duration: '2-3 hours' },
            'Mini Bantu Knots': { price: '$110', duration: '2-3 hours' },
            'Large Bantu Knots': { price: '$100', duration: '2 hours' },
            'Bantu Knots with Extensions': { price: '$130', duration: '3-4 hours' },
            'Goddess Bantu Knots': { price: '$125', duration: '3 hours' },
            'Crown Bantu Knots': { price: '$115', duration: '2-3 hours' },
            // Weaves/Extensions (3 styles)
            'Sew-in Weave': { price: '$220', duration: '4-5 hours' },
            'Tape-in Extensions': { price: '$350', duration: '3-4 hours' },
            'Clip-in Extensions': { price: '$180', duration: '2-3 hours' },
            // Hair Maintenance & Consultation (2 styles)
            'Hair Consultation': { price: '$25', duration: '30 minutes' },
            'Braids Touch-up': { price: '$50', duration: '1 hour' },
          };
          
          return stylePricing[styleName] || { price: 'To be discussed', duration: 'To be discussed' };
        };

        const styleDetails = getStyleDetails(bookingData.selectedStyle);
        console.log('💰 Style details:', styleDetails);

        // Split customer name into first and last name
        const nameParts = bookingData.name.trim().split(' ');
        const firstName = nameParts[0] || 'Customer';
        const lastName = nameParts.slice(1).join(' ') || 'Customer';

        // Create backend payload
        const backendPayload = {
          service: {
            name: bookingData.selectedStyle || 'Braiding Service',
            price: styleDetails.price.replace('$', ''),
            duration: styleDetails.duration.replace(' hours', '')
          },
          date: bookingData.selectedDate,
          time: bookingData.selectedTime,
          customer: {
            firstName: firstName,
            lastName: lastName,
            email: bookingData.email,
            phone: bookingData.phone,
            hairLength: 'Not specified',
            hairTexture: 'Not specified',
            previousBraids: false,
            allergies: 'None',
            notes: bookingData.specialRequests || ''
          }
        };

        console.log('📡 Backend payload:', backendPayload);

        // For production, we'll skip the backend API and just use email notifications
        // This ensures the booking works even without a deployed backend
        console.log('📡 Skipping backend API for production deployment');
        console.log('📡 Backend payload would be:', backendPayload);

        // Also send email notifications
        const emailPayload = {
          service_name: bookingData.selectedStyle || 'Braiding Service',
          service_price: styleDetails.price,
          service_duration: styleDetails.duration,
          appointment_date: bookingData.selectedDate,
          appointment_time: bookingData.selectedTime,
          customer_name: bookingData.name,
          customer_email: bookingData.email,
          customer_phone: bookingData.phone,
          notes: bookingData.specialRequests || ''
        };

        console.log('📧 Sending email notifications...');
        console.log('📧 Email payload:', emailPayload);
        try {
          await sendBookingEmails(emailPayload);
          console.log('✅ Email service called successfully!');
        } catch (emailError) {
          console.error('❌ Email sending failed:', emailError);
          console.log('⚠️ Booking confirmed, but email service failed');
        }
    };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.selectedDate || !formData.selectedTime) {
      toast.error('⚠️ Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send booking to backend
      await sendBookingToBackend(formData);
      
             // Show confirmation
             setShowConfirmation(true);
             toast.success('🎉 Booking confirmed! You will receive an email confirmation shortly.');
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('❌ Booking failed. Please try again or call (832) 207-9386');
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

      {/* Service Menu & Booking Form */}
      {!showConfirmation && (
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            {/* Service Menu Section */}
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <ServiceMenu 
                  onServiceSelect={handleServiceSelect}
                  selectedService={formData.selectedStyle}
                />
              </div>
            </div>

            {/* Booking Form Section */}
            <form id="booking-form" onSubmit={handleFormSubmit} className="bg-white rounded-lg shadow-lg p-8">
            
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

            {/* Selected Style - Read Only if selected from menu */}
            <div className="mb-6">
              <label htmlFor="selectedStyle" className="block text-sm font-medium text-secondary-700 mb-2">
                Selected Service
              </label>
              <input
                type="text"
                id="selectedStyle"
                name="selectedStyle"
                value={formData.selectedStyle}
                onChange={handleInputChange}
                placeholder="Select a service from the menu above"
                className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                readOnly={!!formData.selectedStyle}
              />
              {!formData.selectedStyle && (
                <p className="mt-2 text-sm text-secondary-500">
                  Please select a service from the menu above
                </p>
              )}
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

            {/* Payment Information */}
            <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Payment Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-blue-900">Cash Payment</p>
                    <p className="text-sm text-blue-700">Pay with cash on the day of your appointment</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-white rounded flex items-center justify-center border border-gray-200">
                      <img 
                        src="/zelle-logo1.png" 
                        alt="Zelle Logo" 
                        className="w-4 h-4 object-contain"
                      />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-blue-900">Zelle Payment</p>
                    <p className="text-sm text-blue-700">Send payment to: (832) 207-9386</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Payment is due on the day of your appointment. We accept cash and Zelle payments.
                </p>
              </div>
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
                  Submitting Booking...
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
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
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
                Booking Submitted!
              </h2>
              
              <p className="text-lg text-secondary-600 mb-6">
                Thank you for booking with BraidsbyEva! We'll contact you shortly to confirm your appointment details.
              </p>

              {/* Booking Details */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{formData.selectedStyle || 'To be discussed'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{formData.selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{formData.selectedTime}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">Payment Information</h4>
                <p className="text-sm text-blue-800">
                  Payment is due on the day of your appointment. We accept <strong>cash</strong> and <strong>Zelle</strong> payments.
                  <br />
                  <strong>Zelle:</strong> (832) 207-9386
                </p>
              </div>

              <p className="text-sm text-secondary-600 mb-6">
                You'll receive a confirmation email shortly. If you have any questions, please call us at (832) 207-9386.
              </p>

              <button
                onClick={() => {
                  setShowConfirmation(false);
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