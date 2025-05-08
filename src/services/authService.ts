import { User, UserRole, SubscriptionTier } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock user database
const users: User[] = [
  {
    id: '1',
    username: 'stella_noir',
    email: 'stella@example.com',
    displayName: 'Stella Noir',
    bio: 'Living life on the edge. Premium content creator and lifestyle enthusiast.',
    location: 'London, UK',
    age: 28,
    profileImages: [
      'https://i.postimg.cc/MTWFppKX/photo-3-2025-05-03-23-00-01.png',
      'https://i.postimg.cc/t4qZD0TW/ch5.png',
      'https://i.postimg.cc/3J7dJM2V/photo-9-2025-05-02-21-08-07.png',
      'https://i.postimg.cc/J0KmzFLC/20.png',
      'https://i.postimg.cc/66cMYK6f/ch8.png'
    ],
    coverImage: 'https://i.postimg.cc/bvXXpPt2/photo-20-2025-05-02-21-08-07.png',
    role: UserRole.USER,
    subscriptionTier: SubscriptionTier.PREMIUM,
    createdAt: new Date('2023-01-15'),
    lastLogin: new Date(),
    postCount: 47,
    lastPosted: new Date('2023-05-10')
  },
  {
    id: '2',
    username: 'dark_enigma',
    email: 'enigma@example.com',
    displayName: 'Enigma',
    bio: 'Mystery is my specialty. Join my premium experience for exclusive content.',
    location: 'Berlin, DE',
    age: 32,
    profileImages: [
      'https://i.postimg.cc/qqDYYHrq/photo-13-2025-05-02-21-08-07.png'
    ],
    role: UserRole.USER,
    subscriptionTier: SubscriptionTier.STANDARD,
    createdAt: new Date('2022-11-20'),
    lastLogin: new Date('2023-05-01'),
    postCount: 23,
    lastPosted: new Date('2023-04-28')
  }
];

// Mock auth tokens
const authTokens: Record<string, string> = {};

// Helper: delay to simulate network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Login
export const loginUser = async (email: string, password: string): Promise<User> => {
  await delay(800); // Simulate network delay
  
  const user = users.find(u => u.email === email);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  // In a real app, we would verify the password here
  // For demo purposes, we'll skip password verification
  
  // Create a token
  const token = uuidv4();
  authTokens[user.id] = token;
  
  // Update last login
  user.lastLogin = new Date();
  
  return user;
};

// Register
export const registerUser = async (
  email: string, 
  password: string, 
  username: string
): Promise<User> => {
  await delay(1000); // Simulate network delay
  
  if (users.some(u => u.email === email)) {
    throw new Error('Email already in use');
  }
  
  if (users.some(u => u.username === username)) {
    throw new Error('Username already taken');
  }
  
  const trialEndsAt = new Date();
  trialEndsAt.setDate(trialEndsAt.getDate() + 14); // 14-day trial
  
  const newUser: User = {
    id: uuidv4(),
    username,
    email,
    displayName: username,
    profileImages: [],
    role: UserRole.USER,
    subscriptionTier: SubscriptionTier.TRIAL,
    createdAt: new Date(),
    lastLogin: new Date(),
    postCount: 0,
    trialEndsAt
  };
  
  users.push(newUser);
  
  // Create a token
  const token = uuidv4();
  authTokens[newUser.id] = token;
  
  return newUser;
};

// Logout
export const logoutUser = async (): Promise<void> => {
  await delay(300); // Simulate network delay
  // In a real app, we would invalidate the token on the server
};

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  await delay(500); // Simulate network delay
  
  // In a real app, we would validate the token and return the user
  // For demo purposes, we'll return the first user
  return users[0];
};

// Update user
export const updateUserProfile = async (
  userId: string, 
  userData: Partial<User>
): Promise<User> => {
  await delay(800); // Simulate network delay
  
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  // Update user data
  users[userIndex] = {
    ...users[userIndex],
    ...userData,
  };
  
  return users[userIndex];
};

// Update subscription
export const updateSubscription = async (
  userId: string, 
  tier: SubscriptionTier
): Promise<User> => {
  await delay(800); // Simulate network delay
  
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  // Update subscription tier
  users[userIndex].subscriptionTier = tier;
  
  return users[userIndex];
};