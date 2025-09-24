import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  StarIcon, 
  MapPinIcon,
  ClockIcon,
  HeartIcon
} from '@heroicons/react/24/solid';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <HeartIcon className="w-8 h-8 text-primary-600" />,
      title: 'Hair Health Focus',
      description: 'Protective styles that promote healthy hair growth and minimize damage.'
    },
    {
      icon: <StarIcon className="w-8 h-8 text-primary-600" />,
      title: '15+ Years Experience',
      description: 'Professional expertise with thousands of satisfied clients.'
    },
    {
      icon: <MapPinIcon className="w-8 h-8 text-primary-600" />,
      title: 'Katy, Texas Location',
      description: 'Conveniently located to serve Katy and surrounding areas.'
    },
    {
      icon: <ClockIcon className="w-8 h-8 text-primary-600" />,
      title: 'Flexible Scheduling',
      description: 'Appointments available Monday through Sunday to fit your schedule.'
    }
  ];


  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Awa is absolutely amazing! My braids look perfect and she was so gentle with my hair. I will definitely be back!',
      service: 'Box Braids'
    },
    {
      name: 'Maria Rodriguez',
      rating: 5,
      comment: 'Professional service and beautiful results. Awa really knows what she\'s doing. Highly recommend!',
      service: 'Passion Twists'
    },
    {
      name: 'Jennifer Smith',
      rating: 5,
      comment: 'Best braiding experience I\'ve ever had. Awa is patient, skilled, and the salon is clean and comfortable.',
      service: 'Goddess Braids'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                Professional Braiding Services in{' '}
                <span className="text-accent-300">Katy, Texas</span>
              </h1>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                Transform your hair with Awa's expert braiding services. 
                Protective styles that promote healthy hair growth while keeping you looking beautiful.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/booking"
                  className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center group"
                >
                  Book Your Appointment
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="w-full max-w-md mx-auto mb-6 shadow-lg rounded-lg overflow-hidden">
                    <img 
                      src="/images/gallery/IMG_4073.png" 
                      alt="Awa Obaretin - Professional Braider" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-2">Awa Obaretin</h3>
                  <p className="text-primary-100 mb-4">Professional Braider</p>
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-accent-300" />
                    ))}
                  </div>
                  <p className="text-primary-100 text-sm">
                    "Your hair's health is my priority"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
              Why Choose BraidsbyEva?
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Experience the difference that professional expertise and genuine care can make for your hair.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-accent-400" />
                  ))}
                </div>
                <p className="text-secondary-700 mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div className="border-t border-secondary-200 pt-4">
                  <p className="font-semibold text-secondary-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-secondary-600">
                    {testimonial.service}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready to Transform Your Hair?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Book your appointment today and experience the difference that professional braiding can make.
            </p>
            <div className="flex justify-center">
              <Link
                to="/booking"
                className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
              >
                Book Now
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
