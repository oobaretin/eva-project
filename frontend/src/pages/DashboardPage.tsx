import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <div className="container-max section-padding">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-secondary-900 mb-4">
            Welcome, {user?.firstName}!
          </h1>
          <p className="text-xl text-secondary-600">
            Your dashboard is coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
