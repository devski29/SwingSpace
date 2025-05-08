import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { SubscriptionTier } from '../types';
import { Lock, Crown, ArrowUpRight } from 'lucide-react';
import ActionButton from '../components/buttons/ActionButton';
import { Link } from 'react-router-dom';

const MessagesPage: React.FC = () => {
  const { user } = useAuthStore();
  
  // Check if user can access this feature
  const canAccessMessages = user?.subscriptionTier === SubscriptionTier.PREMIUM;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {canAccessMessages ? (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Private Messages</h2>
          
          <div className="card p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
            <p className="text-gray-400 mb-4">
              Direct messaging functionality is coming soon. As a Premium subscriber, you'll be the first to access this feature.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-lg mx-auto">
          <div className="card-premium p-6 bg-gradient-to-br from-primary-light to-primary border-accent-gold text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary-dark flex items-center justify-center">
                <Lock size={32} className="text-accent-gold" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
            <p className="text-gray-300 mb-6">
              Direct messaging is a premium feature available exclusively to Premium subscribers.
            </p>
            
            <div className="bg-primary-dark p-4 rounded-lg mb-6">
              <h3 className="flex items-center justify-center text-xl font-bold mb-3">
                <Crown size={20} className="text-accent-gold mr-2" />
                Premium Benefits
              </h3>
              <ul className="space-y-2 text-left">
                <li className="flex items-center">
                  <span className="text-accent-gold mr-2">✓</span>
                  <span>Send private messages to any user</span>
                </li>
                <li className="flex items-center">
                  <span className="text-accent-gold mr-2">✓</span>
                  <span>Create private chat groups</span>
                </li>
                <li className="flex items-center">
                  <span className="text-accent-gold mr-2">✓</span>
                  <span>Share exclusive content with friends</span>
                </li>
                <li className="flex items-center">
                  <span className="text-accent-gold mr-2">✓</span>
                  <span>Enhanced profile visibility</span>
                </li>
              </ul>
            </div>
            
            <Link to="/subscription">
              <ActionButton
                onClick={() => {}}
                variant="primary"
                className="w-full"
                icon={<ArrowUpRight size={16} />}
              >
                Upgrade to Premium
              </ActionButton>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;