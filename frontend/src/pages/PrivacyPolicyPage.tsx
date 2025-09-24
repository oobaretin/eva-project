import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-secondary-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">1. Information We Collect</h2>
              <p className="text-secondary-600 mb-4">
                At BraidsbyEva, we collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc list-inside text-secondary-600 mb-4 space-y-2">
                <li>Create an account or book an appointment</li>
                <li>Contact us for customer support</li>
                <li>Subscribe to our newsletter</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="text-secondary-600">
                This information may include your name, email address, phone number, hair preferences, 
                and appointment history.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-secondary-600 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-secondary-600 mb-4 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process appointments and send appointment confirmations</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Send you marketing communications (with your consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">3. Information Sharing</h2>
              <p className="text-secondary-600 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-secondary-600 mb-4 space-y-2">
                <li>With service providers who assist us in operating our business</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or acquisition</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">4. Data Security</h2>
              <p className="text-secondary-600 mb-4">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of 
                transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">5. Your Rights</h2>
              <p className="text-secondary-600 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-secondary-600 mb-4 space-y-2">
                <li>Access and update your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">6. Cookies and Tracking</h2>
              <p className="text-secondary-600 mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our website. 
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">7. Children's Privacy</h2>
              <p className="text-secondary-600 mb-4">
                Our services are not directed to children under 13. We do not knowingly collect 
                personal information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">8. Changes to This Policy</h2>
              <p className="text-secondary-600 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-secondary-900 mb-4">9. Contact Us</h2>
              <p className="text-secondary-600 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-secondary-600">
                  <strong>BraidsbyEva</strong><br />
                  Email: braidsbyevaofficial@gmail.com<br />
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

export default PrivacyPolicyPage;




