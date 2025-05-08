import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { ExtraFeature } from '../types';
import { Rocket, Eye, Crown, Gift, Trophy, FlowerIcon } from 'lucide-react';
import ActionButton from '../components/buttons/ActionButton';

const StorePage: React.FC = () => {
  const { user } = useAuthStore();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<ExtraFeature | null>(null);

  const features: ExtraFeature[] = [
    {
      id: 'profile-boost',
      name: 'Profile Boost',
      description: 'Get more visibility in search results and recommendations for 1 week',
      price: 4.99,
      duration: '1 week',
      type: 'boost'
    },
    {
      id: 'profile-viewers',
      name: 'Profile Viewers',
      description: 'See who views your profile for 30 days',
      price: 0.99,
      duration: '30 days',
      type: 'viewers'
    },
    {
      id: 'roses-small',
      name: '250 Roses',
      description: 'Send roses to other members and compete for monthly prizes',
      price: 5.99,
      type: 'roses',
      quantity: 250
    },
    {
      id: 'roses-medium',
      name: '500 Roses',
      description: 'Best value! Send roses to other members',
      price: 11.99,
      type: 'roses',
      quantity: 500
    },
    {
      id: 'roses-large',
      name: '1000 Roses',
      description: 'Maximum impact! Show your appreciation',
      price: 17.99,
      type: 'roses',
      quantity: 1000
    }
  ];

  const handlePurchase = (feature: ExtraFeature) => {
    setSelectedFeature(feature);
    setShowPaymentModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">SwingSpace Store</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Enhance your experience with exclusive features and gifts
          </p>
        </div>

        {/* User's Roses Balance */}
        <div className="card p-6 mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <FlowerIcon size={24} className="text-accent-gold mr-2" />
            <span className="text-2xl font-bold">{user?.roses || 0}</span>
          </div>
          <p className="text-gray-400">Your Rose Balance</p>
          {user?.subscriptionTier === 'premium' && (
            <div className="mt-2 flex items-center justify-center text-sm">
              <Crown size={16} className="text-accent-gold mr-1" />
              <span>Verified Premium Member</span>
            </div>
          )}
        </div>

        {/* Monthly Competition */}
        <div className="card card-premium p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Trophy size={24} className="text-accent-gold mr-3" />
              <div>
                <h3 className="text-lg font-bold">Monthly Rose Competition</h3>
                <p className="text-sm text-gray-400">
                  Top rose receiver wins exclusive prizes!
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Time Remaining</p>
              <p className="font-bold">14 days</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Boost */}
          <div className="card p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-accent-purple/20 flex items-center justify-center mr-4">
                <Rocket size={24} className="text-accent-purple" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Profile Boost</h3>
                <p className="text-sm text-gray-400">1 Week Duration</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Get more visibility in search results and recommendations
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-accent-gold">£4.99</span>
              <ActionButton
                onClick={() => handlePurchase(features[0])}
                variant="primary"
                size="sm"
              >
                Boost Profile
              </ActionButton>
            </div>
          </div>

          {/* Profile Viewers */}
          <div className="card p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center mr-4">
                <Eye size={24} className="text-accent-gold" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Profile Viewers</h3>
                <p className="text-sm text-gray-400">30 Days Access</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              See who views your profile
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-accent-gold">£0.99</span>
              <ActionButton
                onClick={() => handlePurchase(features[1])}
                variant="primary"
                size="sm"
              >
                Unlock Viewers
              </ActionButton>
            </div>
          </div>
        </div>

        {/* Roses Packages */}
        <h2 className="text-2xl font-bold mt-12 mb-6">Rose Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.filter(f => f.type === 'roses').map((package_, index) => (
            <div key={package_.id} className="card p-6 hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-accent-gold/20 flex items-center justify-center mx-auto mb-4">
                  <FlowerIcon size={32} className="text-accent-gold" />
                </div>
                <h3 className="text-lg font-bold">{package_.name}</h3>
                <p className="text-sm text-gray-400">Send roses to other members</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-accent-gold">£{package_.price}</span>
              </div>
              <ActionButton
                onClick={() => handlePurchase(package_)}
                variant={index === 1 ? 'primary' : 'outline'}
                className="w-full"
              >
                Buy Roses
              </ActionButton>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedFeature && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="card p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">
              Purchase {selectedFeature.name}
            </h3>
            
            <div className="mb-6">
              <p className="text-gray-300 mb-4">
                {selectedFeature.description}
              </p>
              
              <div className="card bg-primary-dark p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span>Item</span>
                  <span>{selectedFeature.name}</span>
                </div>
                {selectedFeature.duration && (
                  <div className="flex justify-between mb-2">
                    <span>Duration</span>
                    <span>{selectedFeature.duration}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold pt-2 border-t border-gray-700">
                  <span>Total</span>
                  <span>£{selectedFeature.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Payment Form */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle purchase
                  setShowPaymentModal(false);
                }}
                className="btn btn-primary"
              >
                Purchase Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorePage;