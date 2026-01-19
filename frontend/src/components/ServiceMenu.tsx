import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface ServiceVariation {
  name: string;
  price: string;
  duration: string;
}

interface ServiceCategory {
  name: string;
  variations: ServiceVariation[];
}

interface ServiceMenuProps {
  onServiceSelect: (serviceName: string, price: string, duration: string) => void;
  selectedService?: string;
  showBookingForm?: boolean;
  onToggleBookingForm?: () => void;
  formData?: any;
  onFormChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onFormSubmit?: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  timeSlots?: string[];
  getMinDate?: () => string;
  getMaxDate?: () => string;
}

const SERVICE_DATA: { [key: string]: ServiceCategory } = {
  'Braids': {
    name: 'Braids',
    variations: [
      { name: 'Knotless Box Braids', price: '$275', duration: '5-6 hours' },
      { name: 'Small Box Braids', price: '$330', duration: '6-7 hours' },
      { name: 'Medium Box Braids', price: '$210', duration: '4-5 hours' },
      { name: 'Large Box Braids', price: '$158', duration: '3-4 hours' },
      { name: 'Jumbo Box Braids', price: '$120', duration: '2-3 hours' },
      { name: 'Box Braids with Curls', price: '$264', duration: '5-6 hours' },
      { name: 'Ghana Braids', price: '$120', duration: '3-4 hours' },
      { name: 'French Braids', price: '$90', duration: '2-3 hours' },
      { name: 'Dutch Braids', price: '$100', duration: '2-3 hours' },
    ]
  },
  'Twists': {
    name: 'Twists',
    variations: [
      { name: 'Passion Twists', price: '$210', duration: '3-4 hours' },
      { name: 'Senegalese Twists', price: '$210', duration: '4-5 hours' },
      { name: 'Twist Out Style', price: '$120', duration: '2-3 hours' },
      { name: 'Marley Twists', price: '$190', duration: '4-5 hours' },
      { name: 'Spring Twists', price: '$210', duration: '3-4 hours' },
      { name: 'Goddess Braids', price: '$200', duration: '3-4 hours' },
      { name: 'Fulani Braids', price: '$210', duration: '4-5 hours' },
      { name: 'Lemonade Braids', price: '$180', duration: '3-4 hours' },
    ]
  },
  'Faux Locs': {
    name: 'Faux Locs',
    variations: [
      { name: 'Butterfly Locs', price: '$280', duration: '4-5 hours' },
      { name: 'Faux Locs', price: '$250', duration: '4-6 hours' },
      { name: 'Goddess Locs', price: '$320', duration: '4-5 hours' },
    ]
  },
  'Crochets': {
    name: 'Crochets',
    variations: [
      { name: 'Crochet Braids', price: '$150', duration: '2-3 hours' },
      { name: 'Crochet Twists', price: '$160', duration: '2-3 hours' },
      { name: 'Crochet Box Braids', price: '$170', duration: '3-4 hours' },
      { name: 'Crochet Faux Locs', price: '$200', duration: '3-4 hours' },
      { name: 'Crochet Passion Twists', price: '$190', duration: '3-4 hours' },
      { name: 'Crochet Senegalese Twists', price: '$185', duration: '3-4 hours' },
      { name: 'Crochet Spring Twists', price: '$195', duration: '3-4 hours' },
      { name: 'Crochet Marley Twists', price: '$180', duration: '3-4 hours' },
      { name: 'Crochet Goddess Braids', price: '$200', duration: '3-4 hours' },
    ]
  },
  'Dreads': {
    name: 'Dreads',
    variations: [
      { name: 'Traditional Dreads', price: '$250', duration: '4-5 hours' },
      { name: 'Interlocked Dreads', price: '$280', duration: '5-6 hours' },
    ]
  },
  'Kid Styles': {
    name: 'Kid Styles',
    variations: [
      { name: 'Kids Box Braids', price: '$80', duration: '2-3 hours' },
      { name: 'Kids Cornrows', price: '$60', duration: '1-2 hours' },
      { name: 'Kids Twists', price: '$70', duration: '2-3 hours' },
      { name: 'Kids Pigtails', price: '$50', duration: '1-2 hours' },
      { name: 'Kids French Braids', price: '$55', duration: '1-2 hours' },
      { name: 'Kids Dutch Braids', price: '$60', duration: '1-2 hours' },
      { name: 'Kids Ponytails', price: '$45', duration: '1 hour' },
      { name: 'Kids Bantu Knots', price: '$65', duration: '2 hours' },
    ]
  },
  'Cornrows': {
    name: 'Cornrows',
    variations: [
      { name: 'Feed-in Cornrows', price: '$100', duration: '2-3 hours' },
      { name: 'Stitch Braids', price: '$80', duration: '2-3 hours' },
      { name: 'Ghana Cornrows', price: '$90', duration: '2-3 hours' },
      { name: 'French Cornrows', price: '$85', duration: '2 hours' },
      { name: 'Dutch Cornrows', price: '$90', duration: '2 hours' },
      { name: 'Goddess Cornrows', price: '$110', duration: '3 hours' },
      { name: 'Fulani Cornrows', price: '$100', duration: '2-3 hours' },
      { name: 'Lemonade Cornrows', price: '$95', duration: '2-3 hours' },
      { name: 'Crown Cornrows', price: '$105', duration: '3 hours' },
      { name: 'Halo Cornrows', price: '$100', duration: '2-3 hours' },
      { name: 'Side Part Cornrows', price: '$85', duration: '2 hours' },
      { name: 'Zigzag Cornrows', price: '$90', duration: '2-3 hours' },
    ]
  },
  'Bantu Knots': {
    name: 'Bantu Knots',
    variations: [
      { name: 'Traditional Bantu Knots', price: '$100', duration: '2-3 hours' },
      { name: 'Bantu Knot Out', price: '$120', duration: '2-3 hours' },
      { name: 'Mini Bantu Knots', price: '$110', duration: '2-3 hours' },
      { name: 'Large Bantu Knots', price: '$100', duration: '2 hours' },
      { name: 'Bantu Knots with Extensions', price: '$130', duration: '3-4 hours' },
      { name: 'Goddess Bantu Knots', price: '$125', duration: '3 hours' },
      { name: 'Crown Bantu Knots', price: '$115', duration: '2-3 hours' },
    ]
  },
  'Weaves/Extensions': {
    name: 'Weaves/Extensions',
    variations: [
      { name: 'Sew-in Weave', price: '$220', duration: '4-5 hours' },
      { name: 'Tape-in Extensions', price: '$350', duration: '3-4 hours' },
      { name: 'Clip-in Extensions', price: '$180', duration: '2-3 hours' },
    ]
  },
  'Hair Maintenance & Consultation': {
    name: 'Hair Maintenance & Consultation',
    variations: [
      { name: 'Hair Consultation', price: '$25', duration: '30 minutes' },
      { name: 'Braids Touch-up', price: '$50', duration: '1 hour' },
    ]
  }
};

const ServiceMenu: React.FC<ServiceMenuProps> = ({ 
  onServiceSelect, 
  selectedService,
  showBookingForm = false,
  onToggleBookingForm,
  formData,
  onFormChange,
  onFormSubmit,
  isSubmitting = false,
  timeSlots = [],
  getMinDate,
  getMaxDate
}) => {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
  const [expandedServiceForm, setExpandedServiceForm] = useState<string | null>(null);

  // Auto-expand category and form when service is selected from outside
  useEffect(() => {
    if (selectedService) {
      // Find which category contains this service
      Object.entries(SERVICE_DATA).forEach(([categoryKey, category]) => {
        const hasService = category.variations.some(v => v.name === selectedService);
        if (hasService) {
          setExpandedCategories(prev => ({ ...prev, [categoryKey]: true }));
        }
      });
    }
  }, [selectedService]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const handleServiceClick = (service: ServiceVariation) => {
    onServiceSelect(service.name, service.price, service.duration);
  };

  const handleBookNowClick = (service: ServiceVariation, e: React.MouseEvent) => {
    e.stopPropagation();
    onServiceSelect(service.name, service.price, service.duration);
    setExpandedServiceForm(expandedServiceForm === service.name ? null : service.name);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold text-secondary-900 mb-2">
          Select Your Service
        </h2>
        <p className="text-secondary-600">
          Choose from our professional braiding services. Click on a category to see all options.
        </p>
      </div>

      <div className="space-y-3">
        {Object.entries(SERVICE_DATA).map(([categoryKey, category]) => {
          const isExpanded = expandedCategories[categoryKey] || false;
          
          return (
            <div
              key={categoryKey}
              className="bg-white border-2 border-secondary-200 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary-200"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(categoryKey)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-primary-700 font-bold text-base">
                        {category.variations.length}
                      </span>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-secondary-900">
                      {category.name}
                    </h3>
                    <p className="text-sm text-secondary-600">
                      {category.variations.length} {category.variations.length === 1 ? 'style' : 'styles'}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {isExpanded ? (
                    <ChevronUpIcon className="w-5 h-5 text-secondary-500" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-secondary-500" />
                  )}
                </div>
              </button>

              {/* Service Variations */}
              {isExpanded && (
                <div className="border-t-2 border-secondary-100 bg-gradient-to-br from-secondary-50 to-white">
                  <div className="p-6 space-y-3">
                    {category.variations.map((variation, index) => {
                      const isSelected = selectedService === variation.name;
                      const isFormExpanded = expandedServiceForm === variation.name;
                      
                      return (
                        <div key={index} className="space-y-2">
                          <div className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 ${
                            isSelected
                              ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-primary-100 shadow-lg transform scale-[1.02]'
                              : 'border-secondary-200 bg-white hover:border-primary-300 hover:bg-primary-50 hover:shadow-md'
                          }`}>
                            <div className="flex items-center justify-between">
                              <button
                                onClick={() => handleServiceClick(variation)}
                                className="flex-1 text-left"
                              >
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-semibold text-secondary-900">
                                    {variation.name}
                                  </h4>
                                  {isSelected && (
                                    <span className="text-xs bg-primary-600 text-white px-2 py-1 rounded-full">
                                      Selected
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-secondary-600 mt-1">
                                  {variation.duration}
                                </p>
                              </button>
                              <button
                                onClick={(e) => handleBookNowClick(variation, e)}
                                className="ml-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                          
                          {/* Nested Booking Form */}
                          {isFormExpanded && formData && onFormChange && onFormSubmit && (
                            <div className="bg-white border-2 border-primary-300 rounded-2xl p-8 mt-4 shadow-xl">
                              <form onSubmit={onFormSubmit}>
                                {/* Date Selection */}
                                <div className="mb-4">
                                  <label htmlFor={`date-${index}`} className="block text-sm font-medium text-secondary-700 mb-2">
                                    Select Date *
                                  </label>
                                  <input
                                    type="date"
                                    id={`date-${index}`}
                                    name="selectedDate"
                                    value={formData.selectedDate || ''}
                                    onChange={onFormChange}
                                    min={getMinDate ? getMinDate() : ''}
                                    max={getMaxDate ? getMaxDate() : ''}
                                    className="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                    required
                                  />
                                </div>

                                {/* Time Selection */}
                                <div className="mb-4">
                                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                                    Select Time *
                                  </label>
                                  <div className="grid grid-cols-3 gap-2">
                                    {timeSlots.map((time) => (
                                      <button
                                        key={time}
                                        type="button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          if (onFormChange) {
                                            const syntheticEvent = {
                                              target: { name: 'selectedTime', value: time },
                                              currentTarget: { name: 'selectedTime', value: time }
                                            } as React.ChangeEvent<HTMLInputElement>;
                                            onFormChange(syntheticEvent);
                                          }
                                        }}
                                        className={`py-2.5 px-4 rounded-xl border-2 text-center text-sm font-semibold transition-all duration-300 ${
                                          formData?.selectedTime === time
                                            ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white border-primary-600 shadow-lg transform scale-105'
                                            : 'bg-white text-secondary-700 border-secondary-300 hover:border-primary-500 hover:bg-primary-50 hover:shadow-md'
                                        }`}
                                      >
                                        {time}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {/* Contact Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <label htmlFor={`name-${index}`} className="block text-sm font-medium text-secondary-700 mb-2">
                                      Full Name *
                                    </label>
                                    <input
                                      type="text"
                                      id={`name-${index}`}
                                      name="name"
                                      value={formData.name || ''}
                                      onChange={onFormChange}
                                      className="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                      required
                                    />
                                  </div>
                                  
                                  <div>
                                    <label htmlFor={`phone-${index}`} className="block text-sm font-medium text-secondary-700 mb-2">
                                      Phone Number *
                                    </label>
                                    <input
                                      type="tel"
                                      id={`phone-${index}`}
                                      name="phone"
                                      value={formData.phone || ''}
                                      onChange={onFormChange}
                                      className="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <label htmlFor={`email-${index}`} className="block text-sm font-medium text-secondary-700 mb-2">
                                    Email Address *
                                  </label>
                                  <input
                                    type="email"
                                    id={`email-${index}`}
                                    name="email"
                                    value={formData.email || ''}
                                    onChange={onFormChange}
                                    className="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                    required
                                  />
                                </div>

                                {/* Special Requests */}
                                <div className="mb-4">
                                  <label htmlFor={`requests-${index}`} className="block text-sm font-medium text-secondary-700 mb-2">
                                    Special Requests or Notes
                                  </label>
                                  <textarea
                                    id={`requests-${index}`}
                                    name="specialRequests"
                                    value={formData.specialRequests || ''}
                                    onChange={onFormChange}
                                    rows={3}
                                    placeholder="Any specific requests, hair concerns, or additional information..."
                                    className="w-full px-4 py-3 border-2 border-secondary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                  />
                                </div>

                                {/* Submit Button */}
                                <button
                                  type="submit"
                                  disabled={isSubmitting}
                                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-primary-400 disabled:to-primary-400 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
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
                              </form>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ServiceMenu;
