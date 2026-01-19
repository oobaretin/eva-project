import React, { useState } from 'react';
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

const ServiceMenu: React.FC<ServiceMenuProps> = ({ onServiceSelect, selectedService }) => {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const handleServiceClick = (service: ServiceVariation) => {
    onServiceSelect(service.name, service.price, service.duration);
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
              className="bg-white border border-secondary-200 rounded-lg shadow-sm overflow-hidden transition-all duration-200"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(categoryKey)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-sm">
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
                <div className="border-t border-secondary-100 bg-secondary-50">
                  <div className="p-4 space-y-2">
                    {category.variations.map((variation, index) => {
                      const isSelected = selectedService === variation.name;
                      
                      return (
                        <button
                          key={index}
                          onClick={() => handleServiceClick(variation)}
                          className={`w-full px-4 py-3 rounded-lg border-2 text-left transition-all duration-200 ${
                            isSelected
                              ? 'border-primary-500 bg-primary-50 shadow-md'
                              : 'border-secondary-200 bg-white hover:border-primary-300 hover:bg-primary-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
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
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedService && (
        <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <p className="text-sm text-primary-800">
            <strong>Selected:</strong> {selectedService}
          </p>
          <p className="text-xs text-primary-700 mt-1 mb-3">
            Continue below to complete your booking
          </p>
          <button
            onClick={() => {
              const bookingForm = document.getElementById('booking-form');
              if (bookingForm) {
                bookingForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Book Now
          </button>
        </div>
      )}
      
      {!selectedService && (
        <div className="mt-6 p-4 bg-secondary-50 border border-secondary-200 rounded-lg text-center">
          <p className="text-sm text-secondary-700 mb-3">
            Select a service above to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceMenu;
