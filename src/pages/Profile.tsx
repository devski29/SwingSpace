import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { format } from 'date-fns';
import { Edit, Plus, Trash, X } from 'lucide-react';
import UserProfileCard from '../components/user/UserProfileCard';
import PostCard from '../components/posts/PostCard';
import ActionButton from '../components/buttons/ActionButton';
import { fetchUserPosts } from '../services/contentService';
import { Post } from '../types';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [age, setAge] = useState<number | undefined>(undefined);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [profileImages, setProfileImages] = useState<string[]>([]);
  
  useEffect(() => {
    if (user) {
      // Initialize form with user data
      setDisplayName(user.displayName);
      setBio(user.bio || '');
      setLocation(user.location || '');
      setAge(user.age);
      setProfileImages(user.profileImages || []);
      
      // Fetch user posts
      const loadPosts = async () => {
        setIsLoading(true);
        try {
          const posts = await fetchUserPosts(user.id);
          setUserPosts(posts);
        } catch (error) {
          console.error('Failed to fetch user posts:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadPosts();
    }
  }, [user]);
  
  const handleEditProfile = () => {
    setIsEditing(true);
  };
  
  const handleCancelEdit = () => {
    // Reset form data to current user data
    if (user) {
      setDisplayName(user.displayName);
      setBio(user.bio || '');
      setLocation(user.location || '');
      setAge(user.age);
      setProfileImages(user.profileImages || []);
    }
    setIsEditing(false);
  };
  
  const handleAddImage = () => {
    if (newImageUrl.trim() && profileImages.length < 5) {
      setProfileImages([...profileImages, newImageUrl]);
      setNewImageUrl('');
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setProfileImages(profileImages.filter((_, i) => i !== index));
  };
  
  const handleSaveProfile = async () => {
    if (!user) return;
    
    // Update user data
    await updateUser({
      displayName,
      bio,
      location,
      age,
      profileImages,
    });
    
    setIsEditing(false);
  };
  
  if (!user) {
    return <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-gold"></div>
    </div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        {!isEditing ? (
          <UserProfileCard 
            user={user} 
            isCurrentUser={true}
            onEditProfile={handleEditProfile}
          />
        ) : (
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  className="input w-full"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  className="input w-full h-24 resize-none"
                  placeholder="Tell us about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="input w-full"
                    placeholder="City, Country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="age" className="block text-sm font-medium mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    className="input w-full"
                    placeholder="Your age"
                    min={18}
                    max={120}
                    value={age || ''}
                    onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Profile Images ({profileImages.length}/5)
                </label>
                
                {/* Current images */}
                {profileImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                    {profileImages.map((image, index) => (
                      <div key={index} className="relative rounded-md overflow-hidden">
                        <img src={image} alt="Profile" className="w-full h-24 object-cover" />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-primary-dark rounded-full p-1"
                        >
                          <X size={16} className="text-accent-gold" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add new image */}
                {profileImages.length < 5 && (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      className="input flex-1"
                      placeholder="Image URL"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                    />
                    <button
                      onClick={handleAddImage}
                      className="btn btn-outline"
                      disabled={!newImageUrl.trim()}
                    >
                      Add Image
                    </button>
                  </div>
                )}
                
                <p className="text-xs text-gray-500 mt-1">
                  You can add up to 5 profile images
                </p>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={handleCancelEdit}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <ActionButton
                  onClick={handleSaveProfile}
                  variant="primary"
                >
                  Save Changes
                </ActionButton>
              </div>
            </div>
          </div>
        )}
        
        {/* Profile Navigation */}
        <div className="border-b border-gray-800 mt-8 mb-6">
          <nav className="flex space-x-8">
            <button className="px-4 py-2 border-b-2 border-accent-gold text-accent-gold font-medium">
              Posts
            </button>
            <button className="px-4 py-2 border-b-2 border-transparent hover:text-accent-gold transition-colors">
              Photos
            </button>
            <button className="px-4 py-2 border-b-2 border-transparent hover:text-accent-gold transition-colors">
              Saved
            </button>
          </nav>
        </div>
        
        {/* User Posts */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent-gold"></div>
            </div>
          ) : userPosts.length === 0 ? (
            <div className="card p-6 text-center">
              <h3 className="text-xl font-bold mb-2">No Posts Yet</h3>
              <p className="text-gray-400 mb-4">
                You haven't created any posts. Start sharing with the community!
              </p>
              <ActionButton
                onClick={() => {/* Navigate to home or open post modal */}}
                variant="primary"
              >
                Create Your First Post
              </ActionButton>
            </div>
          ) : (
            userPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUserTier={user.subscriptionTier}
                onLike={() => {/* Handle like */}}
                onComment={() => {/* Handle comment */}}
                user={user}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;