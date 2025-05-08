import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { SubscriptionTier } from '../types';
import SubscriptionButton from '../components/buttons/SubscriptionButton';
import { getUserSubscription, createSubscription, cancelSubscription, changeSubscriptionTier } from '../services/subscriptionService';
import { Crown, Check, X } from 'lucide-react';

const SubscriptionPage: React.FC = () => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(null);
  
  useEffect(() => {
    if (user) {
      const fetchSubscription = async () => {
        setIsLoading(true);
        try {
          const userSubscription = await getUserSubscription(user.id);
          setSubscription(userSubscription);
        } catch (error) {
          console.error('Failed to fetch subscription:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchSubscription();
    }
  }, [user]);
  
  const handleSelectTier = (tier: SubscriptionTier) => {
    if (user?.subscriptionTier === tier) return;
    setSelectedTier(tier);
    setShowPaymentModal(true);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-gold"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Experience</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock premium features and enhance your journey with our subscription plans.
          </p>
        </div>
        
        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="card p-6 hover:shadow-lg transition-all duration-300">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold mb-2">14-Day Trial</h3>
              <p className="text-2xl font-bold text-accent-gold">Free</p>
            </div>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <Check size={18} className="text-accent-gold mr-2" />
                <span>Access chat rooms</span>
              </li>
              <li className="flex items-center">
                <Check size={18} className="text-accent-gold mr-2" />
                <span>Post up to 2 times per day</span>
              </li>
              <li className="flex items-center">
                <Check size={18} className="text-accent-gold mr-2" />
                <span>Basic profile features</span>
              </li>
            </ul>
            
            <button
              onClick={() => handleSelectTier(SubscriptionTier.TRIAL)}
              className="btn btn-outline w-full"
              disabled={user?.subscriptionTier === SubscriptionTier.TRIAL}
            >
              {user?.subscriptionTier === SubscriptionTier.TRIAL ? 'Current Plan' : 'Start Trial'}
            </button>
          </div>
          
          <div className="card p-6 hover:shadow-lg transition-all duration-300">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold mb-2">Standard</h3>
              <p className="text-2xl font-bold text-accent-gold">£4.99/month</p>
            </div>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <Check size={18} className="text-accent-gold mr-2" />
                <span>All Trial features</span>
              </li>
              <li className="flex items-center">
                <Check size={18} className="text-accent-gold mr-2" />
                <span>Unlimited daily posts</span>
              </li>
              <li className="flex items-center">
                <Check size={18} className="text-accent-gold mr-2" />
                <span>Enhanced profile features</span>
              </li>
              <li className="flex items-center">
                <Check size={18} className="text-accent-gold mr-2" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center">
                <Check size={18} className="text-accent-gold mr-2" />
                <span>Events access</span>
              </li>
              <li className="flex items-center">
                <X size={18} className="text-gray-500 mr-2" />
                <span className="text-gray-400">Private messaging</span>
              </li>
            </ul>
            
            <button
              onClick={() => handleSelectTier(SubscriptionTier.STANDARD)}
              className="btn btn-primary w-full"
              disabled={user?.subscriptionTier === SubscriptionTier.STANDARD}
            >
              {user?.subscriptionTier === SubscriptionTier.STANDARD ? 'Current Plan' : 'Upgrade to Standard'}
            </button>
          </div>
          
          <div className="card card-premium p-6 hover:shadow-lg transition-all duration-300">
            <div className="absolute -top-3 right-4">
              <span className="bg-accent-gold text-primary text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </span>
            </div>
            
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p className="text-2xl font-bold text-accent-gold">£9.99/month</p>
            </div>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <Check size={18} className="text-accent-gold mr-2" />
                <span>All Standard features</span>
              </li>
              <li className="flex items-center">
                <Check size={18} className="text-accent-gold mr-2" />
                <span>Private messaging</span>
              </li>
              <li className="flex items-center">
                <Check size={18} className="text-accent-gold mr-2" />
                <span>Add friends</span>
              </li>
              <li className="flex items-center">
                <Check size={18} className="text-accent-gold mr-2" />
                <span>VIP events access</span>
              </li>
              <li className="flex items-center">
                <Check size={18} className="text-accent-gold mr-2" />
                <span>Exclusive content</span>
              </li>
            </ul>
            
            <button
              onClick={() => handleSelectTier(SubscriptionTier.PREMIUM)}
              className="btn btn-primary w-full"
              disabled={user?.subscriptionTier === SubscriptionTier.PREMIUM}
            >
              {user?.subscriptionTier === SubscriptionTier.PREMIUM ? 'Current Plan' : 'Upgrade to Premium'}
            </button>
          </div>
        </div>
        
        {/* Feature Comparison */}
        <div className="card p-6">
          <h3 className="text-xl font-bold mb-6">Feature Comparison</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-3 text-left">Feature</th>
                  <th className="py-3 text-center">Trial</th>
                  <th className="py-3 text-center">Standard</th>
                  <th className="py-3 text-center">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-3">Access chat rooms</td>
                  <td className="py-3 text-center"><Check size={18} className="mx-auto text-accent-gold" /></td>
                  <td className="py-3 text-center"><Check size={18} className="mx-auto text-accent-gold" /></td>
                  <td className="py-3 text-center"><Check size={18} className="mx-auto text-accent-gold" /></td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3">Daily posts</td>
                  <td className="py-3 text-center">2</td>
                  <td className="py-3 text-center">Unlimited</td>
                  <td className="py-3 text-center">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3">Priority support</td>
                  <td className="py-3 text-center"><X size={18} className="mx-auto text-gray-500" /></td>
                  <td className="py-3 text-center"><Check size={18} className="mx-auto text-accent-gold" /></td>
                  <td className="py-3 text-center"><Check size={18} className="mx-auto text-accent-gold" /></td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3">Events access</td>
                  <td className="py-3 text-center"><X size={18} className="mx-auto text-gray-500" /></td>
                  <td className="py-3 text-center"><Check size={18} className="mx-auto text-accent-gold" /></td>
                  <td className="py-3 text-center">VIP</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3">Private messaging</td>
                  <td className="py-3 text-center"><X size={18} className="mx-auto text-gray-500" /></td>
                  <td className="py-3 text-center"><X size={18} className="mx-auto text-gray-500" /></td>
                  <td className="py-3 text-center"><Check size={18} className="mx-auto text-accent-gold" /></td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3">Add friends</td>
                  <td className="py-3 text-center"><X size={18} className="mx-auto text-gray-500" /></td>
                  <td className="py-3 text-center"><X size={18} className="mx-auto text-gray-500" /></td>
                  <td className="py-3 text-center"><Check size={18} className="mx-auto text-accent-gold" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="card p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">
              Subscribe to {selectedTier?.charAt(0).toUpperCase() + selectedTier?.slice(1)}
            </h3>
            
            <div className="mb-6">
              <p className="text-gray-300 mb-4">
                You're about to subscribe to our {selectedTier} plan. 
                {selectedTier === SubscriptionTier.STANDARD ? ' £4.99/month' : ' £9.99/month'}
              </p>
              
              <div className="card bg-primary-dark p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span>Subscription</span>
                  <span>{selectedTier} Plan</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Price</span>
                  <span>
                    {selectedTier === SubscriptionTier.STANDARD ? '£4.99' : '£9.99'}/month
                  </span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-gray-700">
                  <span>Total</span>
                  <span>
                    {selectedTier === SubscriptionTier.STANDARD ? '£4.99' : '£9.99'}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-gray-400">
                Your subscription will renew automatically. You can cancel anytime.
              </p>
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
                  // Handle subscription
                  setShowPaymentModal(false);
                }}
                className="btn btn-primary"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;