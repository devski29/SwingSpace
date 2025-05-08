import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, MessageSquare, Home, Heart, Settings, ChevronDown, Gift } from 'lucide-react';
import { User as UserType, SubscriptionTier } from '../../types';
import { useAuthStore } from '../../store/authStore';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Get auth state
  const { user, isAuthenticated, logout } = useAuthStore();
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Toggle profile dropdown
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };
  
  // Check if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Get the appropriate style for the user's subscription tier
  const getSubscriptionStyle = (tier: SubscriptionTier) => {
    switch (tier) {
      case SubscriptionTier.PREMIUM:
        return 'text-accent-gold border-accent-gold';
      case SubscriptionTier.STANDARD:
        return 'text-accent-purple border-accent-purple';
      default:
        return 'text-gray-400 border-gray-600';
    }
  };
  
  return (
    <nav className="bg-primary-dark border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-heading text-white tracking-wider">
              Swing<span className="text-accent-gold">Space</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/" 
                  className={`text-sm font-medium transition-colors hover:text-accent-gold ${
                    isActive('/') ? 'text-accent-gold' : 'text-gray-300'
                  }`}
                >
                  Feed
                </Link>
                <Link 
                  to="/chat" 
                  className={`text-sm font-medium transition-colors hover:text-accent-gold ${
                    isActive('/chat') ? 'text-accent-gold' : 'text-gray-300'
                  }`}
                >
                  Chat Rooms
                </Link>
                {user?.subscriptionTier === SubscriptionTier.PREMIUM && (
                  <Link 
                    to="/messages" 
                    className={`text-sm font-medium transition-colors hover:text-accent-gold ${
                      isActive('/messages') ? 'text-accent-gold' : 'text-gray-300'
                    }`}
                  >
                    Messages
                  </Link>
                )}
                <Link 
                  to="/subscription" 
                  className={`text-sm font-medium transition-colors hover:text-accent-gold ${
                    isActive('/subscription') ? 'text-accent-gold' : 'text-gray-300'
                  }`}
                >
                  Subscription
                </Link>
                <Link 
                  to="/store" 
                  className={`text-sm font-medium transition-colors hover:text-accent-gold ${
                    isActive('/store') ? 'text-accent-gold' : 'text-gray-300'
                  }`}
                >
                  Store
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-gray-300 hover:text-accent-gold transition-colors"
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary btn-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          {/* User Menu (Desktop) */}
          {isAuthenticated && user && (
            <div className="hidden md:flex items-center">
              <div className="relative">
                <button 
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-700">
                    <img 
                      src={user.profileImages[0]} 
                      alt={user.displayName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`text-sm font-medium border-l-2 pl-2 ${getSubscriptionStyle(user.subscriptionTier)}`}>
                    {user.displayName}
                  </div>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${isProfileMenuOpen ? 'transform rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-primary-light rounded-md shadow-lg py-1 border border-gray-800">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-primary hover:text-accent-gold"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User size={16} className="mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-primary hover:text-accent-gold"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-primary hover:text-accent-gold"
                    >
                      <LogOut size={16} className="mr-2" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-gray-300 hover:text-accent-gold focus:outline-none"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800">
          <div className="container mx-auto px-4 py-3">
            {isAuthenticated && user ? (
              <>
                {/* User Profile */}
                <div className="flex items-center space-x-3 px-4 py-3 border-b border-gray-800">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700">
                    <img 
                      src={user.profileImages[0]} 
                      alt={user.displayName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{user.displayName}</p>
                    <p className={`text-xs ${getSubscriptionStyle(user.subscriptionTier)}`}>
                      {user.subscriptionTier} Tier
                    </p>
                  </div>
                </div>
                
                {/* Navigation Links */}
                <div className="space-y-1 pt-2 pb-3">
                  <Link
                    to="/"
                    className="flex items-center px-4 py-2 text-base font-medium hover:bg-primary-light rounded-md"
                    onClick={toggleMenu}
                  >
                    <Home size={20} className="mr-3 text-accent-gold" />
                    Feed
                  </Link>
                  <Link
                    to="/chat"
                    className="flex items-center px-4 py-2 text-base font-medium hover:bg-primary-light rounded-md"
                    onClick={toggleMenu}
                  >
                    <MessageSquare size={20} className="mr-3 text-accent-gold" />
                    Chat Rooms
                  </Link>
                  {user.subscriptionTier === SubscriptionTier.PREMIUM && (
                    <Link
                      to="/messages"
                      className="flex items-center px-4 py-2 text-base font-medium hover:bg-primary-light rounded-md"
                      onClick={toggleMenu}
                    >
                      <MessageSquare size={20} className="mr-3 text-accent-gold" />
                      Messages
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-base font-medium hover:bg-primary-light rounded-md"
                    onClick={toggleMenu}
                  >
                    <User size={20} className="mr-3 text-accent-gold" />
                    Profile
                  </Link>
                  <Link
                    to="/subscription"
                    className="flex items-center px-4 py-2 text-base font-medium hover:bg-primary-light rounded-md"
                    onClick={toggleMenu}
                  >
                    <Heart size={20} className="mr-3 text-accent-gold" />
                    Subscription
                  </Link>
                  <Link
                    to="/store"
                    className="flex items-center px-4 py-2 text-base font-medium hover:bg-primary-light rounded-md"
                    onClick={toggleMenu}
                  >
                    <Gift size={20} className="mr-3 text-accent-gold" />
                    Store
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-base font-medium hover:bg-primary-light rounded-md"
                    onClick={toggleMenu}
                  >
                    <Settings size={20} className="mr-3 text-accent-gold" />
                    Settings
                  </Link>
                </div>
                
                {/* Logout Button */}
                <div className="pt-4 pb-3 border-t border-gray-800">
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="flex items-center w-full px-4 py-2 text-base font-medium text-gray-300 hover:bg-primary-light hover:text-accent-gold rounded-md"
                  >
                    <LogOut size={20} className="mr-3 text-accent-gold" />
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-3 pt-2 pb-3 flex flex-col">
                <Link
                  to="/login"
                  className="px-4 py-2 text-center text-base font-medium text-white hover:text-accent-gold rounded-md border border-gray-700"
                  onClick={toggleMenu}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-center text-base font-medium text-primary bg-accent-gold hover:bg-accent-gold-light rounded-md"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;