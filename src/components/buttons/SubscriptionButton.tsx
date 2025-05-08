import React from 'react';
import { SubscriptionTier } from '../../types';

interface SubscriptionButtonProps {
  tier: SubscriptionTier;
  isCurrentTier?: boolean;
  onSelect: (tier: SubscriptionTier) => void;
}

const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  tier,
  isCurrentTier = false,
  onSelect,
}) => {
  // Define tier-specific details
  const tierDetails = {
    [SubscriptionTier.TRIAL]: {
      name: '14-Day Trial',
      price: 'Free',
      features: [
        'Access chat rooms',
        'Post up to 2 times per day',
        'Basic profile features',
      ],
      buttonClass: 'btn-outline',
    },
    [SubscriptionTier.STANDARD]: {
      name: 'Standard',
      price: '£4.99/month',
      features: [
        'View premium content',
        'Unlimited daily posts',
        'Enhanced profile features',
        'Priority support',
        'Events access',
      ],
      buttonClass: 'btn-secondary',
    },
    [SubscriptionTier.PREMIUM]: {
      name: 'Premium',
      price: '£9.99/month',
      features: [
        'Private messaging',
        'Add friends',
        'All standard features',
        'VIP events access',
        'Exclusive content',
      ],
      buttonClass: 'btn-primary',
    },
  };

  const details = tierDetails[tier];

  return (
    <div className={`card ${tier === SubscriptionTier.PREMIUM ? 'card-premium' : ''} p-6 hover:shadow-lg transition-all duration-300`}>
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold mb-2">{details.name}</h3>
        <p className="text-2xl font-bold text-accent-gold">{details.price}</p>
      </div>
      
      <ul className="space-y-2 mb-6">
        {details.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="text-accent-gold mr-2">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <button
        onClick={() => onSelect(tier)}
        className={`btn w-full ${details.buttonClass} ${
          isCurrentTier ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isCurrentTier}
      >
        {isCurrentTier ? 'Current Plan' : `Select ${details.name}`}
      </button>
    </div>
  );
};

export default SubscriptionButton;