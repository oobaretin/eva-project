import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-secondary-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-secondary-600 mb-4">
                By accessing and using BraidsbyEva's services, you accept and agree to be bound by the 
                terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">2. Services Description</h2>
              <p className="text-secondary-600 mb-4">
                BraidsbyEva provides professional braiding services including but not limited to:
              </p>
              <ul className="list-disc list-inside text-secondary-600 mb-4 space-y-2">
                <li>Box braids and knotless box braids</li>
                <li>Senegalese twists and passion twists</li>
                <li>Goddess locs and butterfly locs</li>
                <li>Cornrows and lemonade braids</li>
                <li>Fulani braids and Ghana braids</li>
                <li>Micro braids and jumbo box braids</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">3. Appointment Booking and Cancellation</h2>
              <p className="text-secondary-600 mb-4">
                <strong>Booking:</strong> Appointments can be booked through our website or by calling (832) 207-9386.
              </p>
              <p className="text-secondary-600 mb-4">
                <strong>Cancellation Policy:</strong>
              </p>
              <ul className="list-disc list-inside text-secondary-600 mb-4 space-y-2">
                <li>24-hour notice required for cancellations</li>
                <li>Same-day cancellations may incur a 50% fee</li>
                <li>No-show appointments will be charged the full service fee</li>
                <li>Rescheduling is allowed up to 2 hours before your appointment</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">4. Payment Terms</h2>
              <p className="text-secondary-600 mb-4">
                <strong>Payment Methods:</strong> We accept cash, Zelle, and major credit cards.
              </p>
              <p className="text-secondary-600 mb-4">
                <strong>Payment Policy:</strong>
              </p>
              <ul className="list-disc list-inside text-secondary-600 mb-4 space-y-2">
                <li>Payment is due at the time of service</li>
                <li>Deposits may be required for appointments over $200</li>
                <li>All prices are subject to change without notice</li>
                <li>Additional charges may apply for hair extensions or special requests</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">5. Client Responsibilities</h2>
              <p className="text-secondary-600 mb-4">
                As a client, you agree to:
              </p>
              <ul className="list-disc list-inside text-secondary-600 mb-4 space-y-2">
                <li>Arrive on time for your appointment</li>
                <li>Come with clean, dry hair unless otherwise instructed</li>
                <li>Inform us of any allergies or sensitivities</li>
                <li>Follow aftercare instructions provided</li>
                <li>Treat our staff with respect and courtesy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">6. Service Guarantees</h2>
              <p className="text-secondary-600 mb-4">
                <strong>Quality Assurance:</strong> We strive to provide the highest quality services. 
                If you are not satisfied with your service, please contact us within 48 hours.
              </p>
              <p className="text-secondary-600 mb-4">
                <strong>Touch-ups:</strong> Minor touch-ups may be provided free of charge within 7 days 
                of the original service, subject to availability.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">7. Health and Safety</h2>
              <p className="text-secondary-600 mb-4">
                <strong>Health Conditions:</strong> Please inform us of any health conditions, medications, 
                or allergies that may affect your service.
              </p>
              <p className="text-secondary-600 mb-4">
                <strong>Hair Health:</strong> While we take every precaution to protect your hair, 
                we cannot guarantee against damage if your hair is already compromised.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-secondary-600 mb-4">
                BraidsbyEva shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                or other intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">9. Intellectual Property</h2>
              <p className="text-secondary-600 mb-4">
                All content, trademarks, and other intellectual property on our website and in our 
                marketing materials are the property of BraidsbyEva and are protected by copyright laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">10. Privacy</h2>
              <p className="text-secondary-600 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs 
                your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">11. Changes to Terms</h2>
              <p className="text-secondary-600 mb-4">
                We reserve the right to modify these terms at any time. We will notify clients of 
                significant changes via email or through our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">12. Contact Information</h2>
              <p className="text-secondary-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-secondary-600">
                  <strong>BraidsbyEva</strong><br />
                  Email: braidsbyeva@gmail.com<br />
                  Phone: (832) 207-9386<br />
                  Location: Katy, Texas
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;




