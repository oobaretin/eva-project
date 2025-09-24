import React from 'react';

const BookingPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-8">
            Booking Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-secondary-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">1. Appointment Booking</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <p className="text-blue-800">
                  <strong>How to Book:</strong> Appointments can be scheduled through our website, by calling (832) 207-9386, 
                  or by emailing braidsbyeva@gmail.com.
                </p>
              </div>
              
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Booking Requirements</h3>
              <ul className="list-disc list-inside text-secondary-600 mb-4 space-y-2">
                <li>Valid contact information (name, phone number, email)</li>
                <li>Service selection and preferred date/time</li>
                <li>Hair length and texture information</li>
                <li>Any allergies or sensitivities</li>
                <li>Previous braiding experience details</li>
              </ul>

              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Advance Booking</h3>
              <ul className="list-disc list-inside text-secondary-600 mb-4 space-y-2">
                <li>Appointments can be booked up to 4 weeks in advance</li>
                <li>Popular time slots (weekends, evenings) book quickly</li>
                <li>Holiday periods require 2-3 weeks advance notice</li>
                <li>New clients are encouraged to book consultation appointments</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">2. Confirmation Process</h2>
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                <p className="text-green-800">
                  <strong>Confirmation:</strong> All appointments are confirmed via text message and email 24-48 hours before your scheduled time.
                </p>
              </div>
              
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Confirmation Timeline</h3>
              <ul className="list-disc list-inside text-secondary-600 mb-4 space-y-2">
                <li><strong>48 hours before:</strong> Initial confirmation sent</li>
                <li><strong>24 hours before:</strong> Reminder with preparation instructions</li>
                <li><strong>2 hours before:</strong> Final reminder text</li>
                <li><strong>No response:</strong> Appointment may be released to waitlist</li>
              </ul>

              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Required Response</h3>
              <p className="text-secondary-600 mb-4">
                Please confirm your appointment by replying "YES" to our confirmation text. 
                If you don't respond within 4 hours, we may contact you by phone.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">3. Preparation Requirements</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-yellow-800">
                  <strong>Important:</strong> Please arrive with clean, dry hair unless otherwise instructed. 
                  Failure to follow preparation guidelines may result in service delays or rescheduling.
                </p>
              </div>
              
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Hair Preparation</h3>
              <ul className="list-disc list-inside text-secondary-600 mb-4 space-y-2">
                <li>Wash and condition hair 24-48 hours before appointment</li>
                <li>Do not apply heavy products (gels, oils, creams)</li>
                <li>Hair should be completely dry</li>
                <li>Remove any previous braids or extensions</li>
                <li>Detangle hair thoroughly</li>
              </ul>

              <h3 className="text-xl font-semibold text-secondary-900 mb-3">What to Bring</h3>
              <ul className="list-disc list-inside text-secondary-600 mb-4 space-y-2">
                <li>Hair extensions (if not purchasing from us)</li>
                <li>Preferred hair products (if you have sensitivities)</li>
                <li>Comfortable clothing</li>
                <li>Entertainment (books, tablets, etc.)</li>
                <li>Snacks and drinks (long appointments)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">4. Service Duration & Timing</h2>
              
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Typical Service Times</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-secondary-900">Short Styles (2-4 hours)</h4>
                  <ul className="text-sm text-secondary-600 mt-2 space-y-1">
                    <li>• Cornrows</li>
                    <li>• Simple box braids (shoulder length)</li>
                    <li>• Touch-ups</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-secondary-900">Medium Styles (4-6 hours)</h4>
                  <ul className="text-sm text-secondary-600 mt-2 space-y-1">
                    <li>• Box braids (mid-back)</li>
                    <li>• Senegalese twists</li>
                    <li>• Passion twists</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-secondary-900">Long Styles (6-8 hours)</h4>
                  <ul className="text-sm text-secondary-600 mt-2 space-y-1">
                    <li>• Long box braids</li>
                    <li>• Goddess locs</li>
                    <li>• Butterfly locs</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-secondary-900">Complex Styles (8+ hours)</h4>
                  <ul className="text-sm text-secondary-600 mt-2 space-y-1">
                    <li>• Micro braids</li>
                    <li>• Intricate cornrow patterns</li>
                    <li>• Combination styles</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Arrival Guidelines</h3>
              <ul className="list-disc list-inside text-secondary-600 mb-4 space-y-2">
                <li>Arrive 10-15 minutes early for check-in</li>
                <li>Late arrivals may result in shortened service time</li>
                <li>Appointments over 30 minutes late may be rescheduled</li>
                <li>Plan for the full estimated time plus 30 minutes buffer</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">5. Special Circumstances</h2>
              
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">New Clients</h3>
              <ul className="list-disc list-inside text-secondary-600 mb-4 space-y-2">
                <li>Consultation appointment recommended (30 minutes, $25)</li>
                <li>Hair assessment and style recommendations</li>
                <li>Time and cost estimates provided</li>
                <li>Consultation fee applied to first service</li>
              </ul>

              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Children's Appointments</h3>
              <ul className="list-disc list-inside text-secondary-600 mb-4 space-y-2">
                <li>Parent or guardian must be present</li>
                <li>Age-appropriate services only</li>
                <li>Breaks scheduled for comfort</li>
                <li>Special pricing for children under 12</li>
              </ul>

              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Group Bookings</h3>
              <ul className="list-disc list-inside text-secondary-600 mb-4 space-y-2">
                <li>Multiple appointments require advance notice</li>
                <li>Group discounts available for 3+ people</li>
                <li>Special event bookings (weddings, parties) require deposit</li>
                <li>Custom scheduling available for groups</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">6. Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-secondary-600 mb-4">
                  For questions about our booking policy or to schedule an appointment:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-secondary-900">Phone</p>
                    <p className="text-secondary-600">(832) 207-9386</p>
                    <p className="text-sm text-secondary-500">Mon-Sat: 9AM-7PM</p>
                  </div>
                  <div>
                    <p className="font-semibold text-secondary-900">Email</p>
                    <p className="text-secondary-600">braidsbyeva@gmail.com</p>
                    <p className="text-sm text-secondary-500">Response within 24 hours</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPolicyPage;




