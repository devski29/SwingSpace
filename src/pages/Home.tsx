import React, { useEffect, useState, useRef } from 'react';
import { useAuthStore } from '../store/authStore';
import { useContentStore } from '../store/contentStore';
import { Post } from '../types';
import PostCard from '../components/posts/PostCard';
import ActionButton from '../components/buttons/ActionButton';
import { Plus, Filter, X, Image } from 'lucide-react';
import { supabase } from '../lib/supabase';

const HomePage: React.FC = () => {
  const { user } = useAuthStore();
  const { posts, isLoading, error, getPosts, addPost, toggleLike, addComment, setFilter } = useContentStore();
  
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [currentFilter, setCurrentFilter] = useState<'newest' | 'popular' | 'following'>('newest');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + selectedFiles.length > 4) {
      alert('You can only upload up to 4 images');
      return;
    }
    setSelectedFiles([...selectedFiles, ...files]);
  };

  // Remove selected file
  const handleRemoveFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };
  
  const handleAddPost = async () => {
    if (!newPostContent.trim()) return;
    
    setIsUploading(true);
    try {
      const imageUrls: string[] = [];
      
      // Upload images to Supabase Storage
      for (const file of selectedFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user?.id}/${fileName}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('post-images')
          .upload(filePath, file);
        
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('post-images')
          .getPublicUrl(filePath);
        
        imageUrls.push(publicUrl);
      }
      
      await addPost(newPostContent, imageUrls);
      setNewPostContent('');
      setSelectedFiles([]);
      setShowNewPostForm(false);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleFilterChange = (filter: 'newest' | 'popular' | 'following') => {
    setCurrentFilter(filter);
    setFilter(filter);
    getPosts();
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Create Post Button */}
        <div className="card p-4 mb-6">
          {showNewPostForm ? (
            <div className="space-y-4">
              <h3 className="font-bold">Create Post</h3>
              <textarea
                className="input w-full h-32 resize-none"
                placeholder="What's on your mind?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              ></textarea>
              
              {/* Image Upload */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="btn btn-outline flex items-center"
                    disabled={selectedFiles.length >= 4}
                  >
                    <Image size={18} className="mr-2" />
                    Add Images
                  </button>
                  <span className="text-sm text-gray-400">
                    {4 - selectedFiles.length} images remaining
                  </span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
              
              {/* Selected Images Preview */}
              {selectedFiles.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="absolute top-1 right-1 p-1 bg-primary-dark rounded-full"
                      >
                        <X size={16} className="text-accent-gold" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setShowNewPostForm(false);
                    setSelectedFiles([]);
                  }}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <ActionButton
                  onClick={handleAddPost}
                  variant="primary"
                  isLoading={isUploading}
                  disabled={!newPostContent.trim() || isUploading}
                >
                  Post
                </ActionButton>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowNewPostForm(true)}
              className="w-full flex items-center space-x-2 bg-primary-light hover:bg-primary-dark transition-colors p-4 rounded-lg"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={user?.profileImages[0]} 
                  alt={user?.displayName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-left text-gray-400">
                What's on your mind?
              </div>
              <Plus size={20} className="text-accent-gold" />
            </button>
          )}
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => handleFilterChange('newest')}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentFilter === 'newest' ? 'bg-accent-gold text-primary' : 'bg-primary-light text-white hover:bg-primary-dark'
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => handleFilterChange('popular')}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentFilter === 'popular' ? 'bg-accent-gold text-primary' : 'bg-primary-light text-white hover:bg-primary-dark'
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => handleFilterChange('following')}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentFilter === 'following' ? 'bg-accent-gold text-primary' : 'bg-primary-light text-white hover:bg-primary-dark'
            }`}
          >
            Following
          </button>
        </div>
        
        {/* Posts */}
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent-gold"></div>
          </div>
        ) : error ? (
          <div className="card p-6 text-center">
            <p className="text-error">{error}</p>
            <button
              onClick={getPosts}
              className="btn btn-primary mt-4"
            >
              Try Again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="card p-6 text-center">
            <h3 className="text-xl font-bold mb-2">No Posts Found</h3>
            <p className="text-gray-400 mb-4">
              Be the first to create a post!
            </p>
            <button
              onClick={() => setShowNewPostForm(true)}
              className="btn btn-primary"
            >
              Create Post
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUserTier={user?.subscriptionTier || 'free'}
                onLike={toggleLike}
                onComment={addComment}
                user={user!}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;