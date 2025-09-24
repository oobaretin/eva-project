import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CalendarIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { apiClient } from '../utils/api';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  category: string;
  features: string[];
}

// Services array moved outside component for better performance and availability
const services: Service[] = [
  {
    id: 'box-braids',
    name: 'Box Braids',
    description: 'Classic box braids with a modern twist. Perfect for protective styling and low maintenance.',
    duration: '4-6 hours',
    price: '$180-250',
    category: 'Protective Style',
    features: ['Protective styling', 'Low maintenance', 'Versatile styling', '4-6 weeks duration']
  },
  {
    id: 'knotless-box-braids',
    name: 'Knotless Box Braids',
    description: 'Gentle on your scalp with no tension at the roots. Comfortable and beautiful.',
    duration: '5-7 hours',
    price: '$200-280',
    category: 'Protective Style',
    features: ['No tension at roots', 'Comfortable wear', 'Gentle installation', '5-6 weeks duration']
  },
  {
    id: 'senegalese-twists',
    name: 'Senegalese Twists',
    description: 'Elegant and sophisticated twists that are perfect for any occasion.',
    duration: '4-5 hours',
    price: '$160-220',
    category: 'Protective Style',
    features: ['Elegant appearance', 'Versatile styling', 'Easy maintenance', '4-5 weeks duration'],
  },
  {
    id: 'passion-twists',
    name: 'Passion Twists',
    description: 'Trendy and bohemian style that gives you a carefree, natural look.',
    duration: '3-4 hours',
    price: '$140-200',
    category: 'Trendy Style',
    features: ['Bohemian look', 'Quick installation', 'Natural appearance', '3-4 weeks duration'],
  },
  {
    id: 'goddess-locs',
    name: 'Goddess Locs',
    description: 'Beautiful, wavy locs that give you a goddess-like appearance.',
    duration: '6-8 hours',
    price: '$220-300',
    category: 'Luxury Style',
    features: ['Luxury appearance', 'Wavy texture', 'Long-lasting', '6-8 weeks duration'],
  },
  {
    id: 'cornrows',
    name: 'Cornrows',
    description: 'Classic cornrows with modern patterns. Perfect for any hair length.',
    duration: '2-3 hours',
    price: '$80-120',
    category: 'Classic Style',
    features: ['Classic style', 'Quick installation', 'Versatile patterns', '2-3 weeks duration'],
  },
  {
    id: 'lemonade-braids',
    name: 'Lemonade Braids',
    description: 'Inspired by Beyoncé\'s iconic look. Side-swept braids that are absolutely stunning.',
    duration: '4-5 hours',
    price: '$180-240',
    category: 'Trendy Style',
    features: ['Iconic style', 'Side-swept design', 'Celebrity inspired', '4-5 weeks duration'],
  },
  {
    id: 'fulani-braids',
    name: 'Fulani Braids',
    description: 'Traditional African braids with decorative elements and cultural significance.',
    duration: '5-6 hours',
    price: '$200-260',
    category: 'Cultural Style',
    features: ['Cultural significance', 'Decorative elements', 'Traditional technique', '5-6 weeks duration'],
  },
  {
    id: 'micro-braids',
    name: 'Micro Braids',
    description: 'Tiny, delicate braids that give you a natural, textured look.',
    duration: '8-10 hours',
    price: '$300-400',
    category: 'Luxury Style',
    features: ['Delicate appearance', 'Natural texture', 'Long installation', '8-10 weeks duration'],
  },
  {
    id: 'jumbo-box-braids',
    name: 'Jumbo Box Braids',
    description: 'Large, bold braids that make a statement and are easy to maintain.',
    duration: '3-4 hours',
    price: '$120-180',
    category: 'Bold Style',
    features: ['Bold appearance', 'Quick installation', 'Easy maintenance', '3-4 weeks duration'],
  }
];

const BookingPage: React.FC = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
    hairLength: '',
    hairTexture: '',
    previousBraids: false,
    allergies: ''
  });

  // Handle selected style from gallery
  useEffect(() => {
    const selectedStyle = location.state?.selectedStyle;
    if (selectedStyle) {
      console.log('Selected style from gallery:', selectedStyle);
      
      // Find matching service based on category and title
      const matchingService = services.find(service => {
        const serviceName = service.name.toLowerCase();
        const serviceCategory = service.category.toLowerCase();
        const galleryCategory = selectedStyle.category.toLowerCase();
        const galleryTitle = selectedStyle.title.toLowerCase();
        
        // Match by category
        if (serviceCategory.includes(galleryCategory) || galleryCategory.includes(serviceCategory)) {
          return true;
        }
        
        // Match by name keywords
        if (galleryCategory.includes('box braids') && serviceName.includes('box braids')) {
          return true;
        }
        if (galleryCategory.includes('twists') && serviceName.includes('twists')) {
          return true;
        }
        if (galleryCategory.includes('cornrows') && serviceName.includes('cornrows')) {
          return true;
        }
        if (galleryCategory.includes('goddess') && serviceName.includes('goddess')) {
          return true;
        }
        
        // Match by title keywords
        if (galleryTitle.includes('box braids') && serviceName.includes('box braids')) {
          return true;
        }
        if (galleryTitle.includes('twists') && serviceName.includes('twists')) {
          return true;
        }
        if (galleryTitle.includes('cornrows') && serviceName.includes('cornrows')) {
          return true;
        }
        if (galleryTitle.includes('goddess') && serviceName.includes('goddess')) {
          return true;
        }
        
        return false;
      });
      
      console.log('Matching service found:', matchingService);
      
      if (matchingService) {
        setSelectedService(matchingService);
        setCurrentStep(2); // Skip to step 2 (date/time selection)
      } else {
        console.log('No matching service found for:', selectedStyle);
        // Show a toast message to inform the user
        toast.success('Style selected! Please choose a service below to continue booking.');
      }
    }
  }, [location.state]);

  const timeSlots = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '12:00 PM', available: true },
    { time: '1:00 PM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: true },
    { time: '5:00 PM', available: true },
    { time: '6:00 PM', available: true }
  ];

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setCurrentStep(2);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setCurrentStep(3);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setCurrentStep(4);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !selectedDate || !selectedTime) {
      toast.error('Please complete all required fields');
      return;
    }

    try {
      // Prepare booking data for API
      const bookingData = {
        service: {
          name: selectedService.name,
          price: selectedService.price,
          duration: selectedService.duration
        },
        date: selectedDate,
        time: selectedTime,
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          hairLength: formData.hairLength,
          hairTexture: formData.hairTexture,
          previousBraids: formData.previousBraids,
          allergies: formData.allergies,
          notes: formData.notes
        }
      };

      console.log('Submitting booking:', bookingData);
      
      // Call the backend API
      const response = await apiClient.bookings.create(bookingData);
      
      if (response.data.success) {
        toast.success(`🎉 ${response.data.message}\nBooking ID: ${response.data.data.bookingId}\n\nCheck your email for confirmation!`);
        
        // Reset form
        setCurrentStep(1);
        setSelectedService(null);
        setSelectedDate('');
        setSelectedTime('');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          notes: '',
          hairLength: '',
          hairTexture: '',
          previousBraids: false,
          allergies: ''
        });
      } else {
        toast.error(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('Failed to submit booking. Please try again or contact us directly at (832) 207-9386');
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
              Professional braiding services by BraidsbyEva. Choose from our wide variety of styles 
              designed to protect your hair while keeping you looking fabulous.
            </p>
          </div>
        </div>
      </div>

      {/* Selected Style Banner */}
      {location.state?.selectedStyle && (
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
                  You've selected "{location.state.selectedStyle.title}" - we'll help you book this style!
                </p>
                {selectedService && (
                  <p className="text-sm text-primary-600 mt-1">
                    ✓ Matched to: {selectedService.name} ({selectedService.price})
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Services Grid */}
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ${
              selectedService?.id === service.id ? 'ring-2 ring-primary-500 shadow-lg' : ''
            }`}>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-secondary-900">{service.name}</h3>
                  <div className="flex items-center gap-2">
                    {selectedService?.id === service.id && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                        ✓ Selected
                      </span>
                    )}
                    <span className="text-sm bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                      {service.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-secondary-600 mb-4">{service.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-secondary-500">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {service.duration}
                  </div>
                  <div className="text-lg font-bold text-primary-600">{service.price}</div>
                </div>
                
                <ul className="text-sm text-secondary-600 mb-4">
                  {service.features.slice(0, 2).map((feature, index) => (
                    <li key={index} className="flex items-center mb-1">
                      <StarIcon className="w-3 h-3 text-primary-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleServiceSelect(service)}
                  className={`w-full text-center font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 ${
                    selectedService?.id === service.id 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'btn-primary hover:bg-primary-700'
                  }`}
                >
                  {selectedService?.id === service.id ? '✓ Selected' : 'Select This Service'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Steps */}
      {selectedService && (
        <div className="bg-white border-t">
          <div className="container-max section-padding">
            <div className="max-w-2xl mx-auto">
              {/* Step Indicator */}
              <div className="flex items-center justify-center mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`w-16 h-1 mx-2 ${
                        currentStep > step ? 'bg-primary-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 2: Date Selection */}
              {currentStep === 2 && (
                <div className="text-center">
                  <h2 className="text-2xl font-serif font-bold text-secondary-900 mb-4">
                    Select Your Date
                  </h2>
                  <p className="text-secondary-600 mb-6">
                    Choose a date for your {selectedService.name} appointment
                  </p>
                  
                  <div className="grid grid-cols-7 gap-2 mb-6">
                    {Array.from({ length: 14 }, (_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i + 1);
                      const dateString = date.toISOString().split('T')[0];
                      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                      const dayNumber = date.getDate();
                      
                      return (
                        <button
                          key={dateString}
                          onClick={() => handleDateSelect(dateString)}
                          className="p-3 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200"
                        >
                          <div className="text-xs text-gray-500">{dayName}</div>
                          <div className="text-sm font-medium">{dayNumber}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Time Selection */}
              {currentStep === 3 && (
                <div className="text-center">
                  <h2 className="text-2xl font-serif font-bold text-secondary-900 mb-4">
                    Select Your Time
                  </h2>
                  <p className="text-secondary-600 mb-6">
                    Choose a time slot for {selectedDate}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => handleTimeSelect(slot.time)}
                        disabled={!slot.available}
                        className={`p-3 border rounded-lg transition-colors duration-200 ${
                          slot.available
                            ? 'border-gray-200 hover:border-primary-500 hover:bg-primary-50'
                            : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Personal Information */}
              {currentStep === 4 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-serif font-bold text-secondary-900 mb-2">
                      Your Information
                    </h2>
                    <p className="text-secondary-600">
                      Please provide your details to complete the booking
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Hair Length
                      </label>
                      <select
                        name="hairLength"
                        value={formData.hairLength}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select hair length</option>
                        <option value="short">Short (Ear length)</option>
                        <option value="medium">Medium (Shoulder length)</option>
                        <option value="long">Long (Below shoulders)</option>
                        <option value="very-long">Very Long (Mid back+)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Hair Texture
                      </label>
                      <select
                        name="hairTexture"
                        value={formData.hairTexture}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select hair texture</option>
                        <option value="4A">4A - Coily</option>
                        <option value="4B">4B - Coily</option>
                        <option value="4C">4C - Coily</option>
                        <option value="3A">3A - Curly</option>
                        <option value="3B">3B - Curly</option>
                        <option value="3C">3C - Curly</option>
                        <option value="2A">2A - Wavy</option>
                        <option value="2B">2B - Wavy</option>
                        <option value="2C">2C - Wavy</option>
                        <option value="1A">1A - Straight</option>
                        <option value="1B">1B - Straight</option>
                        <option value="1C">1C - Straight</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Special Requests or Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Any specific requests or information we should know?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Allergies or Sensitivities
                    </label>
                    <input
                      type="text"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Please list any allergies or sensitivities"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="previousBraids"
                      checked={formData.previousBraids}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-secondary-700">
                      I have had braids before
                    </label>
                  </div>

                  {/* Booking Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-secondary-900 mb-2">Booking Summary</h3>
                    <div className="text-sm text-secondary-600 space-y-1">
                      <div><strong>Service:</strong> {selectedService.name}</div>
                      <div><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</div>
                      <div><strong>Time:</strong> {selectedTime}</div>
                      <div><strong>Duration:</strong> {selectedService.duration}</div>
                      <div><strong>Price:</strong> {selectedService.price}</div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;