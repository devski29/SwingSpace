import React, { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../store/authStore';
import { Bell, Moon, Sun, Shield, User, Trash2, AlertTriangle, Eye, Lock, Upload } from 'lucide-react';
import ActionButton from '../components/buttons/ActionButton';
import { supabase } from '../lib/supabase';

const SettingsPage: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    bio: user?.bio || '',
    location: user?.location || '',
    emailNotifications: true,
    smsNotifications: false,
    inAppNotifications: true,
    profileVisibility: 'everyone',
    searchable: true
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        displayName: user.displayName,
        email: user.email,
        bio: user.bio || '',
        location: user.location || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const showMessage = (message: string, isError = false) => {
    if (isError) {
      setErrorMessage(message);
      setSuccessMessage('');
    } else {
      setSuccessMessage(message);
      setErrorMessage('');
    }
    setTimeout(() => {
      setErrorMessage('');
      setSuccessMessage('');
    }, 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showMessage('Please upload an image file', true);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showMessage('Image size should be less than 5MB', true);
      return;
    }

    setIsLoading(true);
    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user?.id}/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);

      // Update user profile
      if (user) {
        const updatedImages = [...(user.profileImages || [])];
        updatedImages[0] = publicUrl; // Replace main profile image

        await updateUser({
          profileImages: updatedImages
        });

        showMessage('Profile picture updated successfully');
      }
    } catch (error) {
      showMessage('Failed to upload image', true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      if (user) {
        await updateUser({
          displayName: formData.displayName,
          bio: formData.bio,
          location: formData.location
        });
        showMessage('Profile updated successfully');
      }
    } catch (error) {
      showMessage('Failed to update profile', true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      showMessage('Passwords do not match', true);
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword
      });

      if (error) throw error;
      showMessage('Password updated successfully');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      showMessage('Failed to update password', true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      // In a real app, we would implement proper account deletion logic
      showMessage('Account deletion is disabled in demo mode');
    } catch (error) {
      showMessage('Failed to delete account', true);
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Settings</h1>
        
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="bg-success/20 border border-success text-white p-4 rounded-lg mb-6">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-error/20 border border-error text-white p-4 rounded-lg mb-6 flex items-center">
            <AlertTriangle size={20} className="text-error mr-2" />
            {errorMessage}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="card p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                    activeTab === 'profile' ? 'bg-accent-gold text-primary' : 'hover:bg-primary-light'
                  }`}
                >
                  <User size={18} className="mr-2" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                    activeTab === 'notifications' ? 'bg-accent-gold text-primary' : 'hover:bg-primary-light'
                  }`}
                >
                  <Bell size={18} className="mr-2" />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                    activeTab === 'privacy' ? 'bg-accent-gold text-primary' : 'hover:bg-primary-light'
                  }`}
                >
                  <Shield size={18} className="mr-2" />
                  Privacy
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="card p-6">
              {/* Theme Toggle */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary-light hover:bg-primary-dark transition-colors"
                  aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDarkMode ? (
                    <Sun size={18} className="text-accent-gold" />
                  ) : (
                    <Moon size={18} className="text-accent-gold" />
                  )}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
              
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
                  
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-4">
                    <div className="relative group">
                      <div className="w-20 h-20 rounded-full overflow-hidden">
                        <img
                          src={user?.profileImages[0] || 'https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Upload size={20} className="text-white" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">
                        Click the image to upload a new profile picture
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum file size: 5MB
                      </p>
                    </div>
                  </div>
                  
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="displayName" className="block text-sm font-medium mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        id="displayName"
                        name="displayName"
                        className="input w-full"
                        value={formData.displayName}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium mb-2">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        className="input w-full h-24 resize-none"
                        value={formData.bio}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        className="input w-full"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <ActionButton
                      onClick={handleSaveProfile}
                      variant="primary"
                      isLoading={isLoading}
                    >
                      Save Changes
                    </ActionButton>
                  </div>
                  
                  {/* Password Change */}
                  <div className="pt-6 border-t border-gray-800">
                    <h3 className="text-lg font-bold mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          className="input w-full"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          className="input w-full"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          className="input w-full"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <ActionButton
                        onClick={handlePasswordChange}
                        variant="outline"
                        isLoading={isLoading}
                      >
                        Update Password
                      </ActionButton>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-400">Receive updates via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          className="sr-only peer"
                          checked={formData.emailNotifications}
                          onChange={handleInputChange}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">SMS Notifications</h3>
                        <p className="text-sm text-gray-400">Receive updates via SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="smsNotifications"
                          className="sr-only peer"
                          checked={formData.smsNotifications}
                          onChange={handleInputChange}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">In-App Notifications</h3>
                        <p className="text-sm text-gray-400">Receive updates within the app</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="inAppNotifications"
                          className="sr-only peer"
                          checked={formData.inAppNotifications}
                          onChange={handleInputChange}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Privacy Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="profileVisibility" className="block text-sm font-medium mb-2">
                        Profile Visibility
                      </label>
                      <select
                        id="profileVisibility"
                        name="profileVisibility"
                        className="input w-full"
                        value={formData.profileVisibility}
                        onChange={handleInputChange}
                      >
                        <option value="everyone">Everyone</option>
                        <option value="friends">Friends Only</option>
                        <option value="none">No One</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Search Engine Visibility</h3>
                        <p className="text-sm text-gray-400">Allow search engines to index your profile</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="searchable"
                          className="sr-only peer"
                          checked={formData.searchable}
                          onChange={handleInputChange}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-gold"></div>
                      </label>
                    </div>
                  </div>
                  
                  {/* Account Management */}
                  <div className="pt-6 border-t border-gray-800">
                    <h3 className="text-lg font-bold mb-4">Account Management</h3>
                    
                    <div className="space-y-4">
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex items-center text-error hover:text-error-light transition-colors"
                      >
                        <Trash2 size={18} className="mr-2" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="card p-6 max-w-md w-full">
            <div className="flex items-center mb-4 text-error">
              <AlertTriangle size={24} className="mr-2" />
              <h3 className="text-xl font-bold">Delete Account</h3>
            </div>
            
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
              All your data will be permanently removed.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <ActionButton
                onClick={handleDeleteAccount}
                variant="primary"
                isLoading={isLoading}
                className="bg-error hover:bg-error-light"
              >
                Delete Account
              </ActionButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;