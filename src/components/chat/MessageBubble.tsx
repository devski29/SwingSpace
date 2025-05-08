import React from 'react';
import { format } from 'date-fns';
import { Message, User } from '../../types';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  sender?: User;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isCurrentUser,
  sender,
}) => {
  // Format the message timestamp
  const timeString = format(message.createdAt, 'h:mm a');
  
  return (
    <div className={`flex mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {/* Avatar (only show for other users) */}
      {!isCurrentUser && (
        <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
          <img 
            src={sender?.profileImages[0] || 'https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
            alt={sender?.displayName || 'User'} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Message content */}
      <div className="max-w-[70%]">
        {/* Username (only for other users) */}
        {!isCurrentUser && sender && (
          <p className="text-xs text-gray-400 mb-1">{sender.displayName}</p>
        )}
        
        {/* Message bubble */}
        <div className={`p-3 rounded-lg ${
          isCurrentUser 
            ? 'bg-accent-gold text-primary rounded-tr-none' 
            : 'bg-primary-light text-white rounded-tl-none'
        }`}>
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        </div>
        
        {/* Message time */}
        <p className={`text-xs text-gray-400 mt-1 ${
          isCurrentUser ? 'text-right' : 'text-left'
        }`}>
          {timeString}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;