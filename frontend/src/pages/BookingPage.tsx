import React, { useState } from 'react';
import { CalendarIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  category: string;
  features: string[];
  image: string;
}

const BookingPage: React.FC = () => {
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

  const services: Service[] = [
    {
      id: 'box-braids',
      name: 'Box Braids',
      description: 'Classic box braids with a modern twist. Perfect for protective styling and low maintenance.',
      duration: '4-6 hours',
      price: '$180-250',
      category: 'Protective Style',
      features: ['Protective styling', 'Low maintenance', 'Versatile styling', '4-6 weeks duration'],
      image: '/images/services/box-braids.jpg'
    },
    {
      id: 'knotless-box-braids',
      name: 'Knotless Box Braids',
      description: 'Gentle on your scalp with no tension at the roots. Comfortable and beautiful.',
      duration: '5-7 hours',
      price: '$200-280',
      category: 'Protective Style',
      features: ['No tension at roots', 'Comfortable wear', 'Gentle installation', '5-6 weeks duration'],
      image: '/images/services/knotless-box-braids.jpg'
    },
    {
      id: 'senegalese-twists',
      name: 'Senegalese Twists',
      description: 'Elegant and sophisticated twists that are perfect for any occasion.',
      duration: '4-5 hours',
      price: '$160-220',
      category: 'Protective Style',
      features: ['Elegant appearance', 'Versatile styling', 'Easy maintenance', '4-5 weeks duration'],
      image: '/images/services/senegalese-twists.jpg'
    },
    {
      id: 'passion-twists',
      name: 'Passion Twists',
      description: 'Trendy and bohemian style that gives you a carefree, natural look.',
      duration: '3-4 hours',
      price: '$140-200',
      category: 'Trendy Style',
      features: ['Bohemian look', 'Quick installation', 'Natural appearance', '3-4 weeks duration'],
      image: '/images/services/passion-twists.jpg'
    },
    {
      id: 'goddess-locs',
      name: 'Goddess Locs',
      description: 'Beautiful, wavy locs that give you a goddess-like appearance.',
      duration: '6-8 hours',
      price: '$220-300',
      category: 'Luxury Style',
      features: ['Luxury appearance', 'Wavy texture', 'Long-lasting', '6-8 weeks duration'],
      image: '/images/services/goddess-locs.jpg'
    },
    {
      id: 'cornrows',
      name: 'Cornrows',
      description: 'Classic cornrows with modern patterns. Perfect for any hair length.',
      duration: '2-3 hours',
      price: '$80-120',
      category: 'Classic Style',
      features: ['Classic style', 'Quick installation', 'Versatile patterns', '2-3 weeks duration'],
      image: '/images/services/cornrows.jpg'
    },
    {
      id: 'lemonade-braids',
      name: 'Lemonade Braids',
      description: 'Inspired by Beyoncé\'s iconic look. Side-swept braids that are absolutely stunning.',
      duration: '4-5 hours',
      price: '$180-240',
      category: 'Trendy Style',
      features: ['Iconic style', 'Side-swept design', 'Celebrity inspired', '4-5 weeks duration'],
      image: '/images/services/lemonade-braids.jpg'
    },
    {
      id: 'fulani-braids',
      name: 'Fulani Braids',
      description: 'Traditional African braids with decorative elements and cultural significance.',
      duration: '5-6 hours',
      price: '$200-260',
      category: 'Cultural Style',
      features: ['Cultural significance', 'Decorative elements', 'Traditional technique', '5-6 weeks duration'],
      image: '/images/services/fulani-braids.jpg'
    },
    {
      id: 'micro-braids',
      name: 'Micro Braids',
      description: 'Tiny, delicate braids that give you a natural, textured look.',
      duration: '8-10 hours',
      price: '$300-400',
      category: 'Luxury Style',
      features: ['Delicate appearance', 'Natural texture', 'Long installation', '8-10 weeks duration'],
      image: '/images/services/micro-braids.jpg'
    },
    {
      id: 'jumbo-box-braids',
      name: 'Jumbo Box Braids',
      description: 'Large, bold braids that make a statement and are easy to maintain.',
      duration: '3-4 hours',
      price: '$120-180',
      category: 'Bold Style',
      features: ['Bold appearance', 'Quick installation', 'Easy maintenance', '3-4 weeks duration'],
      image: '/images/services/jumbo-box-braids.jpg'
    },
    {
      id: 'butterfly-locs',
      name: 'Butterfly Locs',
      description: 'Soft, wavy locs with a butterfly-like texture that\'s absolutely beautiful.',
      duration: '6-7 hours',
      price: '$240-320',
      category: 'Luxury Style',
      features: ['Soft texture', 'Wavy appearance', 'Luxury feel', '6-7 weeks duration'],
      image: '/images/services/butterfly-locs.jpg'
    },
    {
      id: 'ghana-braids',
      name: 'Ghana Braids',
      description: 'Traditional Ghanaian braids with a modern twist. Perfect for any occasion.',
      duration: '4-5 hours',
      price: '$160-220',
      category: 'Cultural Style',
      features: ['Traditional technique', 'Modern twist', 'Versatile styling', '4-5 weeks duration'],
      image: '/images/services/ghana-braids.jpg'
    }
  ];

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

  const handleBookNow = (service: Service) => {
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
    
    try {
      // Create booking data
      const bookingData = {
        service: {
          name: selectedService?.name,
          price: selectedService?.price,
          duration: selectedService?.duration
        },
        date: selectedDate,
        time: selectedTime,
        customer: formData
      };

      // Submit to backend
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();

      if (result.success) {
        // Show success message
        alert(`Booking submitted successfully!\n\nWe will contact you at ${formData.phone} to confirm your appointment.\n\nService: ${selectedService?.name}\nDate: ${new Date(selectedDate).toLocaleDateString()}\nTime: ${selectedTime}\n\nBooking ID: ${result.data.bookingId}`);
        
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
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to submit booking. Please try again or contact us directly at (832) 207-9386');
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

      {/* Services Grid */}
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <div className="text-6xl">💇‍♀️</div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-secondary-900">{service.name}</h3>
                  <span className="text-sm bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>
                
                <p className="text-secondary-600 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-secondary-500">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    Duration: {service.duration}
                  </div>
                  <div className="flex items-center text-sm text-secondary-500">
                    <StarIcon className="w-4 h-4 mr-2" />
                    Price: {service.price}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {service.features.map((feature, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => handleBookNow(service)}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  BOOK NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedService && currentStep > 1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-secondary-900">
                  Book {selectedService.name}
                </h2>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-secondary-600 mb-2">{selectedService.description}</p>
                <div className="flex justify-between text-sm text-secondary-500">
                  <span>Duration: {selectedService.duration}</span>
                  <span>Price: {selectedService.price}</span>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mb-6">
                <div className="flex items-center justify-center space-x-4">
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
                        <div className={`w-12 h-1 mx-2 ${
                          currentStep > step ? 'bg-primary-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-2 space-x-12">
                  <span className={`text-xs ${currentStep >= 1 ? 'text-primary-600 font-semibold' : 'text-gray-500'}`}>
                    Service
                  </span>
                  <span className={`text-xs ${currentStep >= 2 ? 'text-primary-600 font-semibold' : 'text-gray-500'}`}>
                    Date
                  </span>
                  <span className={`text-xs ${currentStep >= 3 ? 'text-primary-600 font-semibold' : 'text-gray-500'}`}>
                    Time
                  </span>
                  <span className={`text-xs ${currentStep >= 4 ? 'text-primary-600 font-semibold' : 'text-gray-500'}`}>
                    Details
                  </span>
                </div>
              </div>

              {/* Step 2: Date Selection */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="mr-4 p-2 text-gray-500 hover:text-primary-600 transition-colors"
                    >
                      ← Back
                    </button>
                    <h3 className="text-lg font-semibold text-secondary-900">Select Date</h3>
                  </div>
                  
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-secondary-700 mb-2">
                      Choose your preferred date
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={selectedDate}
                      onChange={(e) => handleDateSelect(e.target.value)}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Time Selection */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="mr-4 p-2 text-gray-500 hover:text-primary-600 transition-colors"
                    >
                      ← Back
                    </button>
                    <h3 className="text-lg font-semibold text-secondary-900">Select Time</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => slot.available && handleTimeSelect(slot.time)}
                        disabled={!slot.available}
                        className={`p-2 rounded-lg font-medium text-sm transition-colors ${
                          slot.available
                            ? 'bg-primary-100 text-primary-800 hover:bg-primary-200'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Personal Details */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="mr-4 p-2 text-gray-500 hover:text-primary-600 transition-colors"
                    >
                      ← Back
                    </button>
                    <h3 className="text-lg font-semibold text-secondary-900">Personal Details</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-secondary-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-secondary-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="hairLength" className="block text-sm font-medium text-secondary-700 mb-1">
                          Hair Length
                        </label>
                        <select
                          id="hairLength"
                          name="hairLength"
                          value={formData.hairLength}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        >
                          <option value="">Select length</option>
                          <option value="short">Short (Shoulder length)</option>
                          <option value="medium">Medium (Mid-back length)</option>
                          <option value="long">Long (Waist length)</option>
                          <option value="very-long">Very Long (Waist length)</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="hairTexture" className="block text-sm font-medium text-secondary-700 mb-1">
                          Hair Texture
                        </label>
                        <select
                          id="hairTexture"
                          name="hairTexture"
                          value={formData.hairTexture}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        >
                          <option value="">Select texture</option>
                          <option value="straight">Straight</option>
                          <option value="wavy">Wavy</option>
                          <option value="curly">Curly</option>
                          <option value="coily">Coily</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-secondary-700 mb-1">
                        Additional Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Any specific requests or information we should know?"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="allergies" className="block text-sm font-medium text-secondary-700 mb-1">
                        Allergies or Sensitivities
                      </label>
                      <input
                        type="text"
                        id="allergies"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleInputChange}
                        placeholder="Please list any allergies or sensitivities"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="previousBraids"
                        name="previousBraids"
                        checked={formData.previousBraids}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="previousBraids" className="ml-2 block text-sm text-secondary-700">
                        I have had braids before
                      </label>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;