import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Users, ArrowUpRight } from 'lucide-react';
import { ChatRoom } from '../../types';
import ActionButton from '../buttons/ActionButton';

interface ChatRoomCardProps {
  chatRoom: ChatRoom;
  onJoin: (roomId: string) => void;
  isJoined?: boolean;
}

const ChatRoomCard: React.FC<ChatRoomCardProps> = ({
  chatRoom,
  onJoin,
  isJoined = false,
}) => {
  // Calculate how recent the last activity was
  const lastActiveText = formatDistanceToNow(chatRoom.lastActive, { addSuffix: true });
  
  // Get the category badge color based on the category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lifestyle':
        return 'bg-accent-purple text-white';
      case 'fashion':
        return 'bg-pink-500 text-white';
      case 'bdsm':
        return 'bg-red-600 text-white';
      case 'dating':
        return 'bg-accent-gold text-primary';
      default:
        return 'bg-gray-700 text-white';
    }
  };
  
  const categoryClass = getCategoryColor(chatRoom.category);
  
  return (
    <div className="card hover:shadow-md transition-all duration-300">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-bold text-lg">{chatRoom.name}</h4>
          <span className={`badge ${categoryClass}`}>
            {chatRoom.category}
          </span>
        </div>
        
        <p className="text-gray-400 text-sm mb-4">{chatRoom.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-400">
            <Users size={16} className="mr-1" />
            <span>{chatRoom.memberCount} members</span>
            <span className="mx-2">•</span>
            <span>Active {lastActiveText}</span>
          </div>
          
          <ActionButton
            onClick={() => onJoin(chatRoom.id)}
            variant={isJoined ? "outline" : "primary"}
            size="sm"
            icon={isJoined ? undefined : <ArrowUpRight size={16} />}
          >
            {isJoined ? 'Joined' : 'Join'}
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomCard;