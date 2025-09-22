import React, { useState } from 'react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
  description: string;
}

const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Sample gallery data - in a real app, this would come from your backend
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: '/api/placeholder/400/500',
      alt: 'Box Braids Style',
      category: 'box-braids',
      title: 'Classic Box Braids',
      description: 'Beautiful shoulder-length box braids with natural hair color'
    },
    {
      id: 2,
      src: '/api/placeholder/400/500',
      alt: 'Knotless Box Braids',
      category: 'box-braids',
      title: 'Knotless Box Braids',
      description: 'Gentle knotless technique for maximum comfort and natural look'
    },
    {
      id: 3,
      src: '/api/placeholder/400/500',
      alt: 'Senegalese Twists',
      category: 'twists',
      title: 'Senegalese Twists',
      description: 'Elegant Senegalese twists with added length and volume'
    },
    {
      id: 4,
      src: '/api/placeholder/400/500',
      alt: 'Passion Twists',
      category: 'twists',
      title: 'Passion Twists',
      description: 'Soft and bouncy passion twists perfect for any occasion'
    },
    {
      id: 5,
      src: '/api/placeholder/400/500',
      alt: 'Goddess Locs',
      category: 'locs',
      title: 'Goddess Locs',
      description: 'Luxurious goddess locs with beautiful texture and movement'
    },
    {
      id: 6,
      src: '/api/placeholder/400/500',
      alt: 'Butterfly Locs',
      category: 'locs',
      title: 'Butterfly Locs',
      description: 'Trendy butterfly locs with unique texture and style'
    },
    {
      id: 7,
      src: '/api/placeholder/400/500',
      alt: 'Cornrows Pattern',
      category: 'cornrows',
      title: 'Creative Cornrows',
      description: 'Intricate cornrow pattern showcasing artistic braiding skills'
    },
    {
      id: 8,
      src: '/api/placeholder/400/500',
      alt: 'Lemonade Braids',
      category: 'cornrows',
      title: 'Lemonade Braids',
      description: 'Side-swept lemonade braids inspired by Beyoncé\'s iconic style'
    },
    {
      id: 9,
      src: '/api/placeholder/400/500',
      alt: 'Fulani Braids',
      category: 'traditional',
      title: 'Fulani Braids',
      description: 'Traditional Fulani braids with decorative elements and accessories'
    },
    {
      id: 10,
      src: '/api/placeholder/400/500',
      alt: 'Ghana Braids',
      category: 'traditional',
      title: 'Ghana Braids',
      description: 'Classic Ghana braids with beautiful geometric patterns'
    },
    {
      id: 11,
      src: '/api/placeholder/400/500',
      alt: 'Micro Braids',
      category: 'micro',
      title: 'Micro Braids',
      description: 'Delicate micro braids for a natural, lightweight look'
    },
    {
      id: 12,
      src: '/api/placeholder/400/500',
      alt: 'Jumbo Box Braids',
      category: 'jumbo',
      title: 'Jumbo Box Braids',
      description: 'Bold jumbo box braids making a statement with size and style'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Styles' },
    { id: 'box-braids', name: 'Box Braids' },
    { id: 'twists', name: 'Twists' },
    { id: 'locs', name: 'Locs' },
    { id: 'cornrows', name: 'Cornrows' },
    { id: 'traditional', name: 'Traditional' },
    { id: 'micro', name: 'Micro Braids' },
    { id: 'jumbo', name: 'Jumbo Braids' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-max section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-4">
              Our Gallery
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Explore our portfolio of beautiful braiding styles. Each piece is a work of art, 
              carefully crafted to enhance your natural beauty.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-secondary-600 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-[4/5] bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-primary-700 text-sm font-medium">Photo Coming Soon</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-secondary-900 mb-1">{image.title}</h3>
                  <p className="text-sm text-secondary-600">{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
              Love What You See?
            </h2>
            <p className="text-secondary-600 mb-6">
              Ready to get your own beautiful braids? Book an appointment with us today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/booking"
                className="bg-primary-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
              >
                Book Appointment
              </a>
              <a
                href="/services"
                className="bg-gray-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
              >
                View Services
              </a>
            </div>
          </div>

          {/* Image Modal */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
                <div className="relative">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="aspect-[4/5] bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-primary-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-primary-700 font-medium">Photo Coming Soon</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-secondary-900 mb-2">{selectedImage.title}</h3>
                  <p className="text-secondary-600 mb-4">{selectedImage.description}</p>
                  <div className="flex gap-4">
                    <a
                      href="/booking"
                      className="bg-primary-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
                    >
                      Book This Style
                    </a>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="bg-gray-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
