export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  bio?: string;
  location?: string;
  age?: number;
  profileImages: string[];
  coverImage?: string;
  role: UserRole;
  subscriptionTier: SubscriptionTier;
  createdAt: Date;
  lastLogin?: Date;
  postCount: number;
  lastPosted?: Date;
  trialEndsAt?: Date;
  roses: number;
  profileViews: number;
  isVerified?: boolean;
  profileBoostUntil?: Date;
  viewersEnabled?: boolean;
  viewersEnabledUntil?: Date;
  friends?: Friend[];
}

export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  status: FriendStatus;
  createdAt: Date;
  friend?: User;
}

export enum FriendStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  BLOCKED = 'blocked',
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

export enum SubscriptionTier {
  TRIAL = 'trial',
  STANDARD = 'standard',
  PREMIUM = 'premium',
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  images?: string[];
  likes: number;
  comments: Comment[];
  createdAt: Date;
  isPublic: boolean;
  category?: string;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  createdAt: Date;
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  createdAt: Date;
  lastActive: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId?: string;
  roomId?: string;
  content: string;
  createdAt: Date;
  read: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  paymentMethod: string;
  amount: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt: Date;
  relatedId?: string;
}

export enum NotificationType {
  LIKE = 'like',
  COMMENT = 'comment',
  FOLLOW = 'follow',
  MESSAGE = 'message',
  SYSTEM = 'system',
  ROSE = 'rose',
}

export interface ExtraFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  duration?: string;
  type: 'boost' | 'viewers' | 'roses';
  quantity?: number;
}