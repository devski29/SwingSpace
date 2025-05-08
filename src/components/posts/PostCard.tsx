import React, { useState, useRef } from 'react';
import { format } from 'date-fns';
import { Heart, MessageCircle, MoreHorizontal, Lock, Share2, Image, X, FlowerIcon } from 'lucide-react';
import { Post, User, SubscriptionTier } from '../../types';
import ActionButton from '../buttons/ActionButton';
import { supabase } from '../../lib/supabase';

interface PostCardProps {
  post: Post;
  currentUserTier: SubscriptionTier;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  onSendRoses?: (postId: string, amount: number) => void;
  user: User;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUserTier,
  onLike,
  onComment,
  onSendRoses,
  user,
}) => {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showRoseModal, setShowRoseModal] = useState(false);
  const [roseAmount, setRoseAmount] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Check if the post is viewable based on subscription tier
  const isViewable = post.isPublic || (currentUserTier !== SubscriptionTier.TRIAL && currentUserTier !== SubscriptionTier.STANDARD);
  
  // Function to handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + selectedFiles.length > 4) {
      alert('You can only upload up to 4 images');
      return;
    }
    setSelectedFiles([...selectedFiles, ...files]);
  };

  // Function to remove selected file
  const handleRemoveFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };
  
  // Function to handle comment submission
  const handleSubmitComment = () => {
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };
  
  // Handle keypress (Enter) for comment submission
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmitComment();
    }
  };

  const handleSendRoses = () => {
    if (onSendRoses && roseAmount > 0) {
      onSendRoses(post.id, roseAmount);
      setShowRoseModal(false);
      setRoseAmount(1);
    }
  };
  
  return (
    <div className="card mb-4 overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <img 
              src={user.profileImages[0] || 'https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
              alt={user.displayName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium">{user.displayName}</h4>
            <p className="text-xs text-gray-400">
              {format(post.createdAt, 'MMM d, yyyy • h:mm a')}
            </p>
          </div>
        </div>
        
        {!post.isPublic && (
          <div className="flex items-center text-sm text-accent-gold">
            <Lock size={14} className="mr-1" />
            <span>Premium</span>
          </div>
        )}
      </div>
      
      {/* Post Content */}
      <div className="p-4">
        {isViewable ? (
          <>
            <p className="mb-4">{post.content}</p>
            
            {/* Post Images */}
            {post.images && post.images.length > 0 && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <img 
                  src={post.images[0]} 
                  alt="Post content" 
                  className="w-full object-cover max-h-96"
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 bg-primary-dark rounded-lg">
            <Lock size={36} className="text-accent-gold mb-3" />
            <h4 className="font-semibold mb-2">Premium Content</h4>
            <p className="text-center text-gray-400 mb-4">
              {currentUserTier === SubscriptionTier.TRIAL ? (
                "Upgrade to Standard or Premium to view premium content"
              ) : (
                "Upgrade to Premium to view this exclusive content"
              )}
            </p>
            <ActionButton
              onClick={() => {/* Handle subscription upgrade */}}
              variant="primary"
              size="sm"
            >
              Upgrade Now
            </ActionButton>
          </div>
        )}
      </div>
      
      {/* Post Actions */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800">
        <div className="flex items-center space-x-4">
          <button 
            className="flex items-center text-gray-400 hover:text-accent-gold transition-colors"
            onClick={() => onLike(post.id)}
          >
            <Heart size={18} className="mr-1" />
            <span>{post.likes}</span>
          </button>
          
          <button 
            className="flex items-center text-gray-400 hover:text-accent-gold transition-colors"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle size={18} className="mr-1" />
            <span>{post.comments.length}</span>
          </button>

          <button 
            className="flex items-center text-gray-400 hover:text-accent-gold transition-colors"
            onClick={() => setShowRoseModal(true)}
          >
            <FlowerIcon size={18} className="mr-1" />
            <span>Send Roses</span>
          </button>
        </div>
        
        <button className="text-gray-400 hover:text-accent-gold transition-colors">
          <Share2 size={18} />
        </button>
      </div>
      
      {/* Comments Section */}
      {showComments && (
        <div className="p-4 bg-primary-dark border-t border-gray-800">
          {/* Comment Input */}
          <div className="flex mb-4">
            <input
              type="text"
              className="input flex-1 mr-2"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <ActionButton
              onClick={handleSubmitComment}
              variant="secondary"
              size="sm"
              disabled={!commentText.trim()}
            >
              Post
            </ActionButton>
          </div>
          
          {/* Comment List */}
          <div className="space-y-3">
            {post.comments.map((comment) => (
              <div key={comment.id} className="bg-primary-light p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <h5 className="font-medium text-sm">User {comment.userId}</h5>
                  <span className="text-xs text-gray-400 ml-2">
                    {format(comment.createdAt, 'MMM d, h:mm a')}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rose Modal */}
      {showRoseModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="card p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Send Roses</h3>
            <p className="text-gray-300 mb-4">
              Send roses to show your appreciation for this post
            </p>
            
            <div className="flex items-center justify-center space-x-4 mb-6">
              <button
                onClick={() => setRoseAmount(Math.max(1, roseAmount - 1))}
                className="btn btn-outline"
              >
                -
              </button>
              <div className="flex items-center space-x-2">
                <FlowerIcon size={24} className="text-accent-gold" />
                <span className="text-2xl font-bold">{roseAmount}</span>
              </div>
              <button
                onClick={() => setRoseAmount(roseAmount + 1)}
                className="btn btn-outline"
              >
                +
              </button>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRoseModal(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <ActionButton
                onClick={handleSendRoses}
                variant="primary"
              >
                Send Roses
              </ActionButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;