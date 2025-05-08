import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-accent-gold">404</h1>
        <h2 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/"
          className="btn btn-outline inline-flex items-center"
        >
          <ChevronLeft size={18} className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;