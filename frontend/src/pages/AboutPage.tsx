import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-max section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif font-bold text-secondary-900 mb-6">
              About Awa
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Meet the talented braider behind BraidsbyEva, dedicated to creating beautiful, 
              protective hairstyles that celebrate your natural beauty.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* About Content */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-secondary-900 mb-6">
                My Story
              </h2>
              <div className="space-y-4 text-secondary-600 leading-relaxed">
                <p>
                  Hello! I'm Awa, the founder and lead braider at BraidsbyEva. My journey in the 
                  beauty industry began over 8 years ago when I discovered my passion for creating 
                  beautiful, protective hairstyles that not only look stunning but also promote 
                  healthy hair growth.
                </p>
                <p>
                  Growing up, I was always fascinated by the art of braiding and the way it could 
                  transform someone's appearance while protecting their natural hair. This passion 
                  led me to pursue extensive training in various braiding techniques, from traditional 
                  African styles to modern protective hairstyles.
                </p>
                <p>
                  What sets me apart is my commitment to understanding each client's unique hair type, 
                  lifestyle, and personal style. I believe that every braid should be a work of art 
                  that reflects the individual wearing it.
                </p>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-primary-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-primary-700 font-medium">Professional Photo Coming Soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Expertise */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-secondary-900 text-center mb-12">
              My Expertise
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">8+ Years Experience</h3>
                <p className="text-secondary-600">
                  Over 8 years of professional braiding experience with thousands of satisfied clients.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">Hair Health Focus</h3>
                <p className="text-secondary-600">
                  Specialized in protective styles that promote healthy hair growth and minimize damage.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">Versatile Styles</h3>
                <p className="text-secondary-600">
                  Expert in all types of braids, from traditional African styles to modern protective hairstyles.
                </p>
              </div>
            </div>
          </div>

          {/* Philosophy */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-16">
            <h2 className="text-3xl font-serif font-bold text-secondary-900 text-center mb-8">
              My Philosophy
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">Beauty & Health</h3>
                <p className="text-secondary-600 leading-relaxed">
                  I believe that beautiful hair starts with healthy hair. Every style I create is 
                  designed to protect your natural hair while making you look and feel amazing. 
                  My goal is to enhance your natural beauty while promoting hair health.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">Personal Touch</h3>
                <p className="text-secondary-600 leading-relaxed">
                  Every client is unique, and so should be their hairstyle. I take the time to 
                  understand your lifestyle, hair type, and personal style to create a look that's 
                  perfect for you. Your satisfaction and comfort are my top priorities.
                </p>
              </div>
            </div>
          </div>

          {/* Services Overview */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-secondary-900 text-center mb-12">
              What I Offer
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-600 font-bold">B</span>
                </div>
                <h3 className="font-semibold text-secondary-900 mb-2">Box Braids</h3>
                <p className="text-sm text-secondary-600">Classic and knotless styles</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-600 font-bold">T</span>
                </div>
                <h3 className="font-semibold text-secondary-900 mb-2">Twists</h3>
                <p className="text-sm text-secondary-600">Senegalese and passion twists</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-600 font-bold">L</span>
                </div>
                <h3 className="font-semibold text-secondary-900 mb-2">Locs</h3>
                <p className="text-sm text-secondary-600">Goddess and butterfly locs</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-600 font-bold">C</span>
                </div>
                <h3 className="font-semibold text-secondary-900 mb-2">Cornrows</h3>
                <p className="text-sm text-secondary-600">Traditional and creative patterns</p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-primary-600 rounded-lg shadow-md p-8 text-center text-white">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Ready to Transform Your Hair?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's create a beautiful, protective style that's perfect for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/booking"
                className="bg-white text-primary-600 py-3 px-8 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Book Appointment
              </a>
              <a
                href="/services"
                className="bg-primary-700 text-white py-3 px-8 rounded-lg font-semibold hover:bg-primary-800 transition-colors duration-200 border border-primary-500"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;




