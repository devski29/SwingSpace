import { Subscription, SubscriptionTier, User } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { updateSubscription } from './authService';

// Mock subscriptions database
const subscriptions: Subscription[] = [
  {
    id: '1',
    userId: '1',
    tier: SubscriptionTier.PREMIUM,
    startDate: new Date('2023-01-15'),
    endDate: new Date('2024-01-15'),
    autoRenew: true,
    paymentMethod: 'card',
    amount: 9.99
  },
  {
    id: '2',
    userId: '2',
    tier: SubscriptionTier.STANDARD,
    startDate: new Date('2023-03-10'),
    endDate: new Date('2023-06-10'),
    autoRenew: true,
    paymentMethod: 'card',
    amount: 4.99
  }
];

// Helper: delay to simulate network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get user subscription
export const getUserSubscription = async (userId: string): Promise<Subscription | null> => {
  await delay(600); // Simulate network delay
  
  const subscription = subscriptions.find(s => s.userId === userId);
  return subscription || null;
};

// Create subscription
export const createSubscription = async (
  userId: string,
  tier: SubscriptionTier,
  paymentMethod: string,
  autoRenew: boolean = true
): Promise<Subscription> => {
  await delay(1000); // Simulate network delay and payment processing
  
  // Calculate amount based on tier
  let amount = 0;
  switch (tier) {
    case SubscriptionTier.STANDARD:
      amount = 4.99;
      break;
    case SubscriptionTier.PREMIUM:
      amount = 9.99;
      break;
    default:
      amount = 0;
  }
  
  // Create subscription end date (1 month from now)
  const now = new Date();
  const endDate = new Date(now);
  endDate.setMonth(endDate.getMonth() + 1);
  
  const newSubscription: Subscription = {
    id: uuidv4(),
    userId,
    tier,
    startDate: now,
    endDate,
    autoRenew,
    paymentMethod,
    amount
  };
  
  // Add to subscriptions database
  subscriptions.push(newSubscription);
  
  // Update user subscription tier
  await updateSubscription(userId, tier);
  
  return newSubscription;
};

// Start trial
export const startTrial = async (userId: string): Promise<void> => {
  await delay(500);
  
  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + 14); // 14-day trial
  
  await updateSubscription(userId, SubscriptionTier.TRIAL);
};

// Cancel subscription
export const cancelSubscription = async (subscriptionId: string): Promise<void> => {
  await delay(800); // Simulate network delay
  
  const subscriptionIndex = subscriptions.findIndex(s => s.id === subscriptionId);
  
  if (subscriptionIndex === -1) {
    throw new Error('Subscription not found');
  }
  
  // Turn off auto-renew
  subscriptions[subscriptionIndex].autoRenew = false;
};

// Change subscription tier
export const changeSubscriptionTier = async (
  subscriptionId: string,
  newTier: SubscriptionTier
): Promise<Subscription> => {
  await delay(800); // Simulate network delay
  
  const subscriptionIndex = subscriptions.findIndex(s => s.id === subscriptionId);
  
  if (subscriptionIndex === -1) {
    throw new Error('Subscription not found');
  }
  
  // Update amount based on tier
  let amount = 0;
  switch (newTier) {
    case SubscriptionTier.STANDARD:
      amount = 4.99;
      break;
    case SubscriptionTier.PREMIUM:
      amount = 9.99;
      break;
    default:
      amount = 0;
  }
  
  // Update subscription
  subscriptions[subscriptionIndex].tier = newTier;
  subscriptions[subscriptionIndex].amount = amount;
  
  // Update user's subscription tier
  await updateSubscription(subscriptions[subscriptionIndex].userId, newTier);
  
  return subscriptions[subscriptionIndex];
};

// Check if user can post
export const canUserPost = async (userId: string): Promise<boolean> => {
  await delay(300); // Simulate network delay
  
  const subscription = await getUserSubscription(userId);
  
  if (!subscription) {
    // Trial users can post up to 2 times per day
    // In a real app, we would check the user's post count for today
    return true; // For demo purposes, always allow
  }
  
  if (subscription.tier === SubscriptionTier.TRIAL) {
    // Trial users can post up to 2 times per day
    // In a real app, we would check the user's post count for today
    return true; // For demo purposes, always allow
  }
  
  // Paid users have unlimited posts
  return true;
};