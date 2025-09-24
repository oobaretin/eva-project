import React, { useState } from 'react';

const CancellationPage: React.FC = () => {
  const [cancellationData, setCancellationData] = useState({
    appointmentId: '',
    name: '',
    email: '',
    phone: '',
    reason: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the cancellation request to your backend
    alert('Your cancellation request has been submitted. We will contact you to confirm.');
    setCancellationData({ appointmentId: '', name: '', email: '', phone: '', reason: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCancellationData({
      ...cancellationData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-4">
              Cancellation Policy
            </h1>
            <p className="text-xl text-secondary-600">
              We understand that sometimes plans change. Here's our cancellation policy and how to reschedule.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Policy Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-6">Cancellation Policy</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-green-400 bg-green-50 p-4">
                    <h3 className="font-semibold text-green-900 mb-2">24+ Hours Notice</h3>
                    <p className="text-green-800">Full refund or free rescheduling</p>
                  </div>
                  
                  <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                    <h3 className="font-semibold text-yellow-900 mb-2">4-24 Hours Notice</h3>
                    <p className="text-yellow-800">50% service fee applies</p>
                  </div>
                  
                  <div className="border-l-4 border-red-400 bg-red-50 p-4">
                    <h3 className="font-semibold text-red-900 mb-2">Less than 4 Hours / No-Show</h3>
                    <p className="text-red-800">Full service fee applies</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-secondary-900 mb-3">Important Notes</h3>
                  <ul className="text-sm text-secondary-600 space-y-2">
                    <li>• Cancellation fees are charged to the card on file</li>
                    <li>• Emergency cancellations are handled case-by-case</li>
                    <li>• Multiple cancellations may require a deposit for future bookings</li>
                    <li>• Rescheduling is preferred over cancellation when possible</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-secondary-900 mb-6">How to Cancel</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Call Us</h3>
                      <p className="text-secondary-600">(832) 207-9386 - Fastest method</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Use the Form Below</h3>
                      <p className="text-secondary-600">Submit cancellation request online</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">Email Us</h3>
                      <p className="text-secondary-600">braidsbyeva@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Emergency Cancellations</h3>
                    <p className="text-blue-800 text-sm">
                      We understand emergencies happen. For medical emergencies, family emergencies, 
                      or severe weather, please contact us as soon as possible. We'll work with you 
                      to reschedule without penalty.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancellation Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-6">Cancel Appointment</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="appointmentId" className="block text-sm font-medium text-secondary-700 mb-2">
                    Appointment ID (if available)
                  </label>
                  <input
                    type="text"
                    id="appointmentId"
                    name="appointmentId"
                    value={cancellationData.appointmentId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., APT-2024-001"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={cancellationData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your full name"
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
                      required
                      value={cancellationData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="(832) 207-9386"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={cancellationData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-secondary-700 mb-2">
                    Reason for Cancellation *
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    required
                    value={cancellationData.reason}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select a reason</option>
                    <option value="schedule-conflict">Schedule Conflict</option>
                    <option value="emergency">Emergency</option>
                    <option value="illness">Illness</option>
                    <option value="weather">Weather</option>
                    <option value="financial">Financial</option>
                    <option value="found-other-stylist">Found Another Stylist</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                    Additional Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={cancellationData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Please provide any additional details about your cancellation..."
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <p className="text-yellow-800 text-sm">
                      <strong>Note:</strong> Cancellation fees may apply based on timing. 
                      We'll contact you to confirm the cancellation and discuss any applicable fees.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
                >
                  Submit Cancellation Request
                </button>
              </form>
            </div>
          </div>

          {/* Rescheduling Option */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
                Prefer to Reschedule Instead?
              </h2>
              <p className="text-secondary-600 mb-6">
                If you need to change your appointment time, rescheduling is often easier than canceling.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/booking"
                  className="bg-primary-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
                >
                  Reschedule Appointment
                </a>
                <a
                  href="tel:+18322079386"
                  className="bg-gray-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
                >
                  Call to Reschedule
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationPage;




