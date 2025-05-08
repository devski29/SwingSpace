import React from 'react';
import { User, SubscriptionTier } from '../../types';
import { format } from 'date-fns';
import { MapPin, Calendar, Image } from 'lucide-react';
import ActionButton from '../buttons/ActionButton';

interface UserProfileCardProps {
  user: User;
  isCurrentUser?: boolean;
  onEditProfile?: () => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  user,
  isCurrentUser = false,
  onEditProfile,
}) => {
  // Get the first profile image as the main display image
  const profileImage = user.profileImages && user.profileImages.length > 0
    ? user.profileImages[0]
    : 'https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  
  // Subscription tier badge
  const subscriptionBadge = {
    [SubscriptionTier.FREE]: {
      text: 'Free User',
      className: 'badge-outline',
    },
    [SubscriptionTier.STANDARD]: {
      text: 'Standard',
      className: 'badge-purple',
    },
    [SubscriptionTier.PREMIUM]: {
      text: 'Premium',
      className: 'badge-gold',
    },
  };
  
  const badge = subscriptionBadge[user.subscriptionTier];
  
  return (
    <div className={`card ${user.subscriptionTier === SubscriptionTier.PREMIUM ? 'card-premium' : ''} overflow-hidden`}>
      {/* Cover Image */}
      <div className="h-32 bg-primary-light overflow-hidden">
        {user.coverImage ? (
          <img 
            src={user.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-accent-purple/30 to-accent-gold/30"></div>
        )}
      </div>
      
      {/* Profile Content */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center">
          {/* Profile Image */}
          <div className="relative -mt-16 mb-4 md:mb-0 md:mr-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow-lg">
              <img 
                src={profileImage} 
                alt={user.displayName} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Subscription Badge */}
            <span className={`badge ${badge.className} absolute -bottom-2 -right-2`}>
              {badge.text}
            </span>
          </div>
          
          <div className="flex-1">
            {/* User Info */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-bold">{user.displayName}</h3>
                <p className="text-gray-400">@{user.username}</p>
              </div>
              
              {isCurrentUser && onEditProfile && (
                <ActionButton
                  onClick={onEditProfile}
                  variant="outline"
                  size="sm"
                  className="mt-2 md:mt-0"
                >
                  Edit Profile
                </ActionButton>
              )}
            </div>
            
            {/* User Details */}
            <div className="mt-4 space-y-2">
              {user.bio && (
                <p className="text-gray-300">{user.bio}</p>
              )}
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                {user.location && (
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1 text-accent-gold" />
                    <span>{user.location}</span>
                  </div>
                )}
                
                {user.age && (
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1 text-accent-gold" />
                    <span>{user.age} years old</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Image size={16} className="mr-1 text-accent-gold" />
                  <span>{user.profileImages.length} photos</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1 text-accent-gold" />
                  <span>Joined {format(user.createdAt, 'MMM yyyy')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;