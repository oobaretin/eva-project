import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ClockIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { GalleryItem } from '../types';
import LoadingSpinner from '../components/UI/LoadingSpinner';
// import toast from 'react-hot-toast';

const GalleryPage: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(false); // Start with false for testing
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [kidsBoxBraidsIndex, setKidsBoxBraidsIndex] = useState(0);
  const navigate = useNavigate();

  const categories = ['All', 'Box Braids', 'Cornrows', 'Twists', 'Protective Styles', 'Kids Styles', 'Special Occasions'];

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, galleryItems]);

  // Auto-play carousel for Kids Box Braids (only when visible in filtered items)
  useEffect(() => {
    const kidsBoxBraidsImages = filteredItems.filter(
      item => item.id === '31' || item.id === '32' || item.id === '33'
    );

    if (kidsBoxBraidsImages.length === 0) return;

    const interval = setInterval(() => {
      setKidsBoxBraidsIndex((prev) => (prev + 1) % kidsBoxBraidsImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [filteredItems]);

  const fetchGalleryItems = () => {
    console.log('Fetching gallery items...');
    
      // Comprehensive gallery of beautiful braiding styles with accurate descriptions
      const mockGalleryItems: GalleryItem[] = [
        // Box Braids
        {
          id: '1',
          title: 'Knotless Box Braids',
          description: 'Gentle on your scalp with no tension at the roots. Natural-looking and comfortable for everyday wear.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2023,%202025%20-%2010_42PM.png',
          category: 'Box Braids',
          price: '$275',
          duration: '5-6 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Small Box Braids',
          description: 'Delicate, small-sized box braids for a refined look. Perfect for professional settings.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2023,%202025%20-%207_28PM.png',
          category: 'Box Braids',
          price: '$330',
          duration: '6-7 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Medium Box Braids',
          description: 'Classic medium-sized box braids with beautiful color options. Versatile and stylish.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2023,%202025%20-%2012_25PM.png',
          category: 'Box Braids',
          price: '$210',
          duration: '4-5 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '4',
          title: 'Large Box Braids',
          description: 'Bold, chunky box braids for a statement look. Quick installation and easy maintenance.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2023,%202025%20-%2012_21PM.png',
          category: 'Box Braids',
          price: '$158',
          duration: '3-4 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        
        // Cornrows
        {
          id: '5',
          title: 'Feed-in Cornrows',
          description: 'Clean, precise cornrows with a modern feed-in technique. Sleek and low maintenance.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2023,%202025%20-%207_52PM.png',
          category: 'Cornrows',
          price: '$100',
          duration: '2-3 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '6',
          title: 'Stitch Braids',
          description: 'Precisely defined parallel lines creating a sleek, polished look. Perfect for any occasion.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2023,%202025%20-%207_23PM.png',
          category: 'Cornrows',
          price: '$80',
          duration: '2-3 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '7',
          title: 'Ghana Braids',
          description: 'Traditional Ghana braids with intricate patterns. Cultural and beautifully detailed.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2023,%202025%20-%207_21PM.png',
          category: 'Cornrows',
          price: '$120',
          duration: '3-4 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        
        // Twists
        {
          id: '8',
          title: 'Passion Twists',
          description: 'Soft, bouncy passion twists that are gentle on your hair. Great for all hair types.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2023,%202025%20-%208_10PM.png',
          category: 'Twists',
          price: '$189',
          duration: '3-4 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '9',
          title: 'Senegalese Twists',
          description: 'Elegant rope-like twists with a neat, polished appearance. Timeless and sophisticated.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2023,%202025%20-%208_11PM.png',
          category: 'Twists',
          price: '$168',
          duration: '4-5 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '10',
          title: 'Twist Out Style',
          description: 'Beautiful twist out for natural hair. Defined curls and volume that lasts for days.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2023,%202025%20-%208_32PM.png',
          category: 'Twists',
          price: '$120',
          duration: '2-3 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        
        // Protective Styles
        {
          id: '11',
          title: 'Crochet Braids',
          description: 'Versatile protective style with various textures. Quick installation and endless styling options.',
          imageUrl: '/images/gallery/crochet-braids.jpg',
          category: 'Protective Styles',
          price: '$140',
          duration: '2-3 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '12',
          title: 'Butterfly Locs',
          description: 'Stunning butterfly locs styled with natural texture and flow. Long, voluminous locs that cascade beautifully over the shoulders for an elegant, carefree look that protects your natural hair.',
          imageUrl: '/images/gallery/butterfly-locs-portrait.jpg',
          category: 'Protective Styles',
          price: '$242',
          duration: '4-5 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '13',
          title: 'Faux Locs',
          description: 'Beautiful faux locs that mimic natural dreadlocks. Protective and stylish.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2023,%202025%20-%208_56PM.png',
          category: 'Protective Styles',
          price: '$210',
          duration: '4-6 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        
        // Kids Styles
        {
          id: '15',
          title: 'Kids Cornrows',
          description: 'Adorable cornrow styles for kids with fun patterns and accessories. Low maintenance.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2023,%202025%20-%209_08PM.png',
          category: 'Kids Styles',
          price: '$60',
          duration: '1-2 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        
        // Special Occasions
        {
          id: '16',
          title: 'Goddess Braids',
          description: 'Elegant goddess braids perfect for special occasions. Timeless and sophisticated.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2023,%202025%20-%209_50PM.png',
          category: 'Special Occasions',
          price: '$189',
          duration: '3-4 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '17',
          title: 'Fulani Braids',
          description: 'Traditional Fulani braids with decorative elements and accessories. Cultural and beautiful.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2023,%202025%20-%2010_06PM.png',
          category: 'Special Occasions',
          price: '$210',
          duration: '4-5 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '18',
          title: 'Halo Braid',
          description: 'Romantic halo braid that encircles the head. Perfect for weddings and special events.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2023,%202025%20-%2010_28PM.png',
          category: 'Special Occasions',
          price: '$150',
          duration: '2-3 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        
        // Additional Box Braids Styles
        {
          id: '19',
          title: 'Jumbo Box Braids',
          description: 'Extra large box braids for a bold, statement look. Quick installation and maximum impact.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2024,%202025%20-%2012_27PM.png',
          category: 'Box Braids',
          price: '$120',
          duration: '2-3 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        
        // Additional Twists
        {
          id: '21',
          title: 'Marley Twists',
          description: 'Natural-looking twists with a soft, bouncy texture. Great for all hair types and lengths.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2024,%202025%20-%2012_25PM.png',
          category: 'Twists',
          price: '$168',
          duration: '4-5 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '22',
          title: 'Spring Twists',
          description: 'Lightweight, bouncy twists that move naturally. Perfect for active lifestyles.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2024,%202025%20-%2012_30PM.png',
          category: 'Twists',
          price: '$189',
          duration: '3-4 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        
        // Additional Cornrows
        {
          id: '23',
          title: 'French Braids',
          description: 'Classic French braids with intricate patterns. Timeless and elegant styling.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2024,%202025%20-%2012_26PM.png',
          category: 'Cornrows',
          price: '$90',
          duration: '2-3 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '24',
          title: 'Dutch Braids',
          description: 'Reverse French braids that create a raised, 3D effect. Modern and eye-catching.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2024,%202025%20-%2012_28PM.png',
          category: 'Cornrows',
          price: '$100',
          duration: '2-3 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        
        // Additional Protective Styles
        {
          id: '25',
          title: 'Box Braids with Curls',
          description: 'Box braids with beautiful curly ends. Combines protection with stunning style.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2024,%202025%20-%201_06PM.png',
          category: 'Protective Styles',
          price: '$264',
          duration: '5-6 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '26',
          title: 'Lemonade Braids',
          description: 'Side-swept braids inspired by Beyoncé\'s iconic look. Trendy and glamorous.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2024,%202025%20-%201_22PM.png',
          category: 'Protective Styles',
          price: '$168',
          duration: '3-4 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        
        // Additional Kids Styles
        {
          id: '27',
          title: 'Kids Twists',
          description: 'Gentle twists designed specifically for children. Safe, comfortable, and fun.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2024,%202025%20-%201_09PM.png',
          category: 'Kids Styles',
          price: '$70',
          duration: '2-3 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '28',
          title: 'Kids Pigtails',
          description: 'Adorable pigtail styles with colorful accessories. Perfect for school and play.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2024,%202025%20-%201_13PM.png',
          category: 'Kids Styles',
          price: '$50',
          duration: '1-2 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        
        // Kids Box Braids - New Images
        {
          id: '31',
          title: 'Kids Box Braids Style 1',
          description: 'Beautiful box braids designed for children. Safe, comfortable, and stylish.',
          imageUrl: '/images/gallery/IMG_3143-removebg-preview.png',
          category: 'Kids Styles',
          price: '$80',
          duration: '2-3 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '32',
          title: 'Kids Box Braids Style 2',
          description: 'Adorable box braids perfect for young ones. Gentle on the scalp and long-lasting.',
          imageUrl: '/images/gallery/IMG_3146-removebg-preview.png',
          category: 'Kids Styles',
          price: '$80',
          duration: '2-3 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '33',
          title: 'Kids Box Braids Style 3',
          description: 'Cute and protective box braids for kids. Fun colors and comfortable wear.',
          imageUrl: '/images/gallery/IMG_3140-removebg-preview.png',
          category: 'Kids Styles',
          price: '$80',
          duration: '2-3 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        
        // Additional Special Occasions
        {
          id: '29',
          title: 'Crown Braids',
          description: 'Regal crown braids that frame the face beautifully. Perfect for formal events.',
          imageUrl: '/images/gallery/Generated%20Image%20September%2024,%202025%20-%201_41PM.png',
          category: 'Special Occasions',
          price: '$179',
          duration: '3-4 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        
        // Braids with Weave
        {
          id: '30',
          title: 'Braids with Weave',
          description: 'Beautiful combination of braids and weave for added length and volume. Perfect for achieving a fuller, more dramatic look.',
          imageUrl: '/images/gallery/braids-with-weave.jpg',
          category: 'Box Braids',
          price: '$200',
          duration: '4-5 hours',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
      ];
    
    console.log('Setting gallery items:', mockGalleryItems);
    setGalleryItems(mockGalleryItems);
    setIsLoading(false);
  };

  const handleImageClick = (item: GalleryItem) => {
    setSelectedImage(item);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleBookThisStyle = (item: GalleryItem) => {
    console.log('Booking style:', item);
    
    // Navigate directly to booking page with the selected style
    const selectedStyle = {
      category: item.category,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl
    };
    
    console.log('Navigating to booking with style:', selectedStyle);
    
    navigate('/booking', { 
      state: { 
        selectedStyle
      } 
    });
  };

  console.log('GalleryPage render - isLoading:', isLoading, 'galleryItems:', galleryItems.length, 'filteredItems:', filteredItems.length);
  console.log('Butterfly locs item:', galleryItems.find(item => item.id === '12'));
  console.log('All gallery items:', galleryItems.map(item => ({ id: item.id, title: item.title, imageUrl: item.imageUrl })));

  if (isLoading) {
    console.log('Showing loading spinner');
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading gallery..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gradient-primary text-white py-16">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
              Our Work Gallery
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Explore our portfolio of beautiful braiding styles. Each piece is crafted with care and attention to detail.
            </p>
          </motion.div>
          </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-secondary-50">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
                <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-secondary-700 hover:bg-primary-50 hover:text-primary-600 border border-secondary-200'
                }`}
              >
                {category}
                </button>
              ))}
            </div>
          </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-max">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-secondary-600">No items found in this category.</p>
              <p className="text-sm text-secondary-500 mt-2">Gallery items: {galleryItems.length}, Filtered: {filteredItems.length}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(() => {
                // Separate Kids Box Braids images from other items
                const kidsBoxBraidsImages = filteredItems.filter(
                  item => item.id === '31' || item.id === '32' || item.id === '33'
                );
                const otherItems = filteredItems.filter(
                  item => item.id !== '31' && item.id !== '32' && item.id !== '33'
                );

                // If we have Kids Box Braids images, show them as one carousel card
                const displayItems = kidsBoxBraidsImages.length > 0
                  ? [
                      { type: 'carousel', items: kidsBoxBraidsImages, id: 'kids-box-braids-carousel' },
                      ...otherItems.map(item => ({ type: 'regular', item }))
                    ]
                  : otherItems.map(item => ({ type: 'regular', item }));

                return displayItems.map((displayItem, index) => {
                  // Render carousel card for Kids Box Braids
                  if (displayItem.type === 'carousel') {
                    const kidsImages = displayItem.items;
                    const currentImage = kidsImages[kidsBoxBraidsIndex];

                    const nextSlide = (e: React.MouseEvent) => {
                      e.stopPropagation();
                      setKidsBoxBraidsIndex((prev) => (prev + 1) % kidsImages.length);
                    };

                    const prevSlide = (e: React.MouseEvent) => {
                      e.stopPropagation();
                      setKidsBoxBraidsIndex((prev) => (prev - 1 + kidsImages.length) % kidsImages.length);
                    };

                    return (
                      <motion.div
                        key={displayItem.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="card group hover:shadow-xl transition-all duration-300"
                      >
                        <div className="relative overflow-hidden">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={kidsBoxBraidsIndex}
                              initial={{ opacity: 0, x: 100 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -100 }}
                              transition={{ duration: 0.3 }}
                              className="relative"
                            >
                              <img
                                src={currentImage.imageUrl}
                                alt={currentImage.title}
                                className="w-full h-80 object-cover cursor-pointer"
                                onClick={() => handleImageClick(currentImage)}
                                onError={(e) => {
                                  console.log('❌ Carousel image failed to load:', currentImage.imageUrl);
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                              {/* Navigation Arrows */}
                              <button
                                onClick={prevSlide}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-secondary-900 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                                aria-label="Previous image"
                              >
                                <ChevronLeftIcon className="w-5 h-5" />
                              </button>
                              <button
                                onClick={nextSlide}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-secondary-900 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 z-10"
                                aria-label="Next image"
                              >
                                <ChevronRightIcon className="w-5 h-5" />
                              </button>
                              {/* Dots Indicator */}
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                {kidsImages.map((_, idx) => (
                                  <button
                                    key={idx}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setKidsBoxBraidsIndex(idx);
                                    }}
                                    className={`h-2 rounded-full transition-all duration-200 ${
                                      idx === kidsBoxBraidsIndex
                                        ? 'bg-primary-600 w-6'
                                        : 'bg-white/50 hover:bg-white/75 w-2'
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                  />
                                ))}
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-primary-600 bg-primary-100 px-3 py-1 rounded-full">
                              {currentImage.category}
                            </span>
                          </div>

                          <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                            Kids Box Braids
                          </h3>
                          
                          <p className="text-secondary-600 mb-4 line-clamp-2">
                            {currentImage.description}
                          </p>
                          
                          {/* Price and Duration */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="text-2xl font-bold text-primary-600">
                              {currentImage.price}
                            </div>
                            <div className="text-sm text-secondary-500 flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              {currentImage.duration}
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleBookThisStyle(currentImage)}
                            className="w-full btn-primary text-center"
                          >
                            Book This Style
                          </button>
                        </div>
                      </motion.div>
                    );
                  }

                  // Render regular gallery item
                  const item = displayItem.item;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="card group hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative overflow-hidden">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                          onClick={() => handleImageClick(item)}
                          onLoad={() => console.log('✅ Image loaded:', item.title, item.imageUrl)}
                          onError={(e) => {
                            console.log('❌ Image failed to load:', item.imageUrl);
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="h-80 bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center cursor-pointer" style={{display: 'none'}} onClick={() => handleImageClick(item)}>
                          <span className="text-6xl">💇‍♀️</span>
                        </div>
                        {/* Click to view full size overlay */}
                        <div 
                          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center cursor-pointer"
                          onClick={() => handleImageClick(item)}
                        >
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-3">
                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-primary-600 bg-primary-100 px-3 py-1 rounded-full">
                            {item.category}
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                          {item.title}
                        </h3>
                        
                        <p className="text-secondary-600 mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        
                        {/* Price and Duration */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-2xl font-bold text-primary-600">
                            {item.price}
                          </div>
                          <div className="text-sm text-secondary-500 flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {item.duration}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleBookThisStyle(item)}
                          className="w-full btn-primary text-center"
                        >
                          Book This Style
                        </button>
                      </div>
                    </motion.div>
                  );
                });
              })()}
            </div>
          )}
        </div>
      </section>

      {/* Love What You See? Section */}
      <section className="section-padding bg-gradient-secondary">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
              Love What You See?
            </h2>
            <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto">
              Explore our full range of services and find the perfect style for you. Each service is tailored to your unique hair type and preferences.
            </p>
            <div className="flex justify-center">
              <Link
                to="/booking"
                className="btn-primary inline-flex items-center"
              >
                Book Your Appointment
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full-Screen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="relative max-w-6xl max-h-[90vh] w-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 z-20 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Image container */}
            <div className="flex-1 flex items-center justify-center min-h-0 mb-4">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                style={{ maxHeight: '70vh' }}
                onError={(e) => {
                  console.log('❌ Modal image failed to load:', selectedImage.imageUrl);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            
            {/* Image details */}
            <div className="bg-white rounded-lg p-6 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary-600 bg-primary-100 px-3 py-1 rounded-full">
                  {selectedImage.category}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-secondary-600 mb-4">
                {selectedImage.description}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleBookThisStyle(selectedImage)}
                  className="btn-primary flex-1"
                >
                  Book This Style
                </button>
                <button
                  onClick={handleCloseModal}
                  className="btn-secondary flex-1"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GalleryPage;