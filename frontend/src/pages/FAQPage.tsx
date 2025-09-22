import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData: FAQItem[] = [
    // General Questions
    {
      question: "What services do you offer?",
      answer: "We offer a wide variety of braiding services including box braids, knotless box braids, Senegalese twists, passion twists, goddess locs, butterfly locs, cornrows, lemonade braids, Fulani braids, Ghana braids, micro braids, and jumbo box braids. Each style is customized to your hair type and preferences.",
      category: "general"
    },
    {
      question: "How long do braids typically last?",
      answer: "Braids typically last 6-8 weeks with proper care. However, this can vary depending on your hair type, lifestyle, and maintenance routine. We provide detailed aftercare instructions to help extend the life of your braids.",
      category: "general"
    },
    {
      question: "Do you work with all hair types?",
      answer: "Yes! We work with all hair types and textures. Whether you have natural hair, relaxed hair, or transitioning hair, we can create beautiful braids that work with your specific hair type. We'll assess your hair during the consultation to recommend the best approach.",
      category: "general"
    },

    // Booking & Appointments
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking 1-2 weeks in advance, especially for popular time slots like weekends and evenings. During peak seasons (holidays, summer), we suggest booking 2-3 weeks ahead. New clients may want to book a consultation first.",
      category: "booking"
    },
    {
      question: "Can I book online?",
      answer: "Yes! You can book appointments through our website booking system, call us at (832) 207-9386, or email braidsbyeva@gmail.com. Online booking is available 24/7 and shows real-time availability.",
      category: "booking"
    },
    {
      question: "What if I need to reschedule?",
      answer: "We understand that plans change! You can reschedule up to 24 hours before your appointment without any fees. Rescheduling within 24 hours may incur a 50% fee. Same-day changes are subject to availability and may require a fee.",
      category: "booking"
    },
    {
      question: "Do you offer consultations?",
      answer: "Yes! We offer 30-minute consultations for new clients at $25. During the consultation, we'll assess your hair, discuss style options, provide time and cost estimates, and answer any questions. The consultation fee is applied to your first service.",
      category: "booking"
    },

    // Pricing & Payment
    {
      question: "How much do your services cost?",
      answer: "Pricing varies based on the style, length, and complexity. Basic styles start around $80, while more complex styles can range from $150-$300. We provide detailed pricing during your consultation and on our services page. All prices include tax.",
      category: "pricing"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash (preferred), Zelle ((832) 207-9386), and major credit cards. Cash payments receive a 5% discount. For services over $200, we require a 50% deposit to secure your appointment.",
      category: "pricing"
    },
    {
      question: "Do you offer payment plans?",
      answer: "We don't offer traditional payment plans, but we do accept deposits for large services. You can pay a 50% deposit when booking and the remaining balance at your appointment. This helps make our services more accessible.",
      category: "pricing"
    },

    // Hair Care & Preparation
    {
      question: "How should I prepare my hair for braiding?",
      answer: "Wash and condition your hair 24-48 hours before your appointment. Don't apply heavy products like gels or oils. Make sure your hair is completely dry and detangled. Remove any previous braids or extensions. We'll provide specific instructions when you book.",
      category: "preparation"
    },
    {
      question: "Should I bring my own hair extensions?",
      answer: "You can bring your own extensions, or we can provide them for you. If you bring your own, make sure they're high-quality and the right length. We can recommend brands and help you choose the right extensions for your desired style.",
      category: "preparation"
    },
    {
      question: "How long will my appointment take?",
      answer: "Appointment times vary by style: simple cornrows (2-3 hours), medium box braids (4-6 hours), long complex styles (6-8 hours), and intricate designs (8+ hours). We'll give you an accurate time estimate during booking.",
      category: "preparation"
    },

    // Aftercare & Maintenance
    {
      question: "How do I take care of my braids?",
      answer: "Keep your scalp clean with a gentle shampoo, moisturize regularly with a light oil or spray, sleep with a satin scarf or pillowcase, avoid excessive manipulation, and don't leave them in longer than 8 weeks. We provide detailed aftercare instructions.",
      category: "aftercare"
    },
    {
      question: "Can I wash my braids?",
      answer: "Yes! You should wash your braids every 1-2 weeks to keep your scalp healthy. Use a gentle, sulfate-free shampoo and focus on your scalp. Be gentle when rinsing and let them air dry or use a cool setting on your blow dryer.",
      category: "aftercare"
    },
    {
      question: "What if my braids start to look frizzy?",
      answer: "Some frizz is normal, especially as your hair grows. You can use a light oil or edge control to smooth flyaways. If the frizz becomes excessive, you may need a touch-up appointment. We offer touch-ups within 7 days of your original service.",
      category: "aftercare"
    },

    // Policies & Procedures
    {
      question: "What's your cancellation policy?",
      answer: "Cancellations with 24+ hours notice are free. Cancellations within 4-24 hours incur a 50% fee. Same-day cancellations or no-shows are charged the full service fee. We understand emergencies happen and will work with you on a case-by-case basis.",
      category: "policies"
    },
    {
      question: "Do you offer touch-ups?",
      answer: "Yes! We offer minor touch-ups free of charge within 7 days of your original service, subject to availability. This includes fixing any loose braids or addressing minor issues. Major repairs may incur additional charges.",
      category: "policies"
    },
    {
      question: "What if I'm not satisfied with my service?",
      answer: "Your satisfaction is our priority! If you're not happy with your service, please contact us within 48 hours. We'll work with you to address any concerns and make it right. We want you to love your braids!",
      category: "policies"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'General' },
    { id: 'booking', name: 'Booking' },
    { id: 'pricing', name: 'Pricing' },
    { id: 'preparation', name: 'Preparation' },
    { id: 'aftercare', name: 'Aftercare' },
    { id: 'policies', name: 'Policies' }
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-secondary-600">
              Find answers to common questions about our braiding services, booking process, and policies.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-secondary-600 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="font-semibold text-secondary-900 pr-4">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-secondary-500 transition-transform duration-200 ${
                      openItems.includes(index) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-secondary-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
                Still Have Questions?
              </h2>
              <p className="text-secondary-600 mb-6">
                Can't find the answer you're looking for? We're here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+18322079386"
                  className="bg-primary-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
                >
                  Call (832) 207-9386
                </a>
                <a
                  href="mailto:braidsbyeva@gmail.com"
                  className="bg-gray-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
                >
                  Email Us
                </a>
                <a
                  href="/support"
                  className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Book Appointment</h3>
              <p className="text-secondary-600 text-sm mb-4">Ready to get your braids done?</p>
              <a href="/booking" className="text-primary-600 hover:text-primary-700 font-medium">
                Schedule Now →
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">View Services</h3>
              <p className="text-secondary-600 text-sm mb-4">See all our braiding styles</p>
              <a href="/services" className="text-primary-600 hover:text-primary-700 font-medium">
                Browse Styles →
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-secondary-900 mb-2">Get Support</h3>
              <p className="text-secondary-600 text-sm mb-4">Need personalized help?</p>
              <a href="/support" className="text-primary-600 hover:text-primary-700 font-medium">
                Contact Us →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
