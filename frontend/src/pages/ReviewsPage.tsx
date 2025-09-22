import React, { useState } from 'react';

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  verified: boolean;
}

const ReviewsPage: React.FC = () => {
  const [filterRating, setFilterRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Sample reviews data - in a real app, this would come from your backend
  const reviews: Review[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      service: "Box Braids",
      comment: "Awa did an amazing job with my box braids! They look so natural and feel comfortable. The attention to detail is incredible, and she made sure I was comfortable throughout the entire process. I've gotten so many compliments!",
      verified: true
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      rating: 5,
      date: "2024-01-10",
      service: "Senegalese Twists",
      comment: "I've been coming to Awa for over a year now, and she never disappoints. My Senegalese twists are beautiful and last so long. She's professional, friendly, and really knows what she's doing. Highly recommend!",
      verified: true
    },
    {
      id: 3,
      name: "Jessica Williams",
      rating: 5,
      date: "2024-01-08",
      service: "Goddess Locs",
      comment: "Awa transformed my hair with these gorgeous goddess locs! The process was long but worth every minute. She's so patient and explains everything she's doing. My hair has never looked better!",
      verified: true
    },
    {
      id: 4,
      name: "Ashley Brown",
      rating: 5,
      date: "2024-01-05",
      service: "Passion Twists",
      comment: "Love my passion twists! Awa is so talented and really listens to what you want. The salon is clean and comfortable, and she makes sure you're happy with the result. Will definitely be back!",
      verified: true
    },
    {
      id: 5,
      name: "Taylor Davis",
      rating: 5,
      date: "2024-01-02",
      service: "Cornrows",
      comment: "Awa created the most beautiful cornrow pattern for me. She's an artist! The braids are neat, even, and exactly what I asked for. The experience was relaxing and professional. Can't wait for my next appointment!",
      verified: true
    },
    {
      id: 6,
      name: "Kimberly Wilson",
      rating: 5,
      date: "2023-12-28",
      service: "Knotless Box Braids",
      comment: "These knotless braids are everything! So much more comfortable than regular box braids. Awa took her time to make sure each braid was perfect. I've been wearing them for weeks and they still look fresh.",
      verified: true
    },
    {
      id: 7,
      name: "Nicole Anderson",
      rating: 5,
      date: "2023-12-20",
      service: "Butterfly Locs",
      comment: "Awa is simply the best! My butterfly locs are stunning and so unique. She's very knowledgeable about different hair types and always gives great advice on maintenance. The salon atmosphere is so welcoming.",
      verified: true
    },
    {
      id: 8,
      name: "Amanda Thompson",
      rating: 5,
      date: "2023-12-15",
      service: "Fulani Braids",
      comment: "I love the traditional Fulani braids Awa did for me! She incorporated beautiful accessories and the pattern is so intricate. She's clearly passionate about her craft and it shows in her work.",
      verified: true
    },
    {
      id: 9,
      name: "Rachel Garcia",
      rating: 5,
      date: "2023-12-10",
      service: "Lemonade Braids",
      comment: "Awa nailed the lemonade braids! They look exactly like the picture I showed her. She's so skilled and really takes pride in her work. The braids are comfortable and look amazing. Highly recommend!",
      verified: true
    },
    {
      id: 10,
      name: "Stephanie Martinez",
      rating: 5,
      date: "2023-12-05",
      service: "Micro Braids",
      comment: "The micro braids Awa did are so delicate and beautiful! She's incredibly patient and precise. The process took a while but the result is worth it. My hair looks so natural and healthy.",
      verified: true
    }
  ];

  const filteredReviews = filterRating === 0 
    ? reviews 
    : reviews.filter(review => review.rating === filterRating);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => 
    reviews.filter(review => review.rating === rating).length
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-max section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-4">
              Client Reviews
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              See what our amazing clients have to say about their experience with BraidsbyEva.
            </p>
          </div>

          {/* Rating Summary */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-secondary-900 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(averageRating))}
                </div>
                <p className="text-secondary-600">
                  Based on {reviews.length} verified reviews
                </p>
              </div>
              
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating, index) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-secondary-700 w-8">{rating}</span>
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${(ratingCounts[index] / reviews.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-secondary-600 w-8">{ratingCounts[index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Filter and Add Review */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-secondary-700 font-medium">Filter by rating:</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilterRating(0)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filterRating === 0 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All
                </button>
                {[5, 4, 3, 2, 1].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setFilterRating(rating)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filterRating === rating 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {rating}★
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-primary-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200"
            >
              Write a Review
            </button>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {filteredReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-secondary-900">{review.name}</h3>
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-secondary-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <span className="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
                    {review.service}
                  </span>
                </div>
                
                <p className="text-secondary-600 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
              Ready to Experience Excellence?
            </h2>
            <p className="text-secondary-600 mb-6">
              Join our satisfied clients and book your appointment today!
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

          {/* Review Form Modal */}
          {showReviewForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-secondary-900">Write a Review</h3>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-secondary-900 mb-2">Review Form Coming Soon</h4>
                  <p className="text-secondary-600 mb-4">
                    We're working on adding a review form. For now, please share your experience on Google or Facebook!
                  </p>
                  <div className="flex gap-3 justify-center">
                    <a
                      href="https://www.google.com/search?q=BraidsbyEva+Katy+Texas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                    >
                      Google Reviews
                    </a>
                    <a
                      href="https://www.facebook.com/braidsbyeva"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-800 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-900 transition-colors duration-200"
                    >
                      Facebook
                    </a>
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

export default ReviewsPage;
