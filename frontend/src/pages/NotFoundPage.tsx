import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="text-3xl font-serif font-bold text-secondary-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-secondary-600 mb-8">
            The page you're looking for doesn't exist.
          </p>
        </div>
        
        <Link
          to="/"
          className="btn-primary inline-flex items-center"
        >
          <HomeIcon className="w-5 h-5 mr-2" />
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
