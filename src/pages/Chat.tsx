import React, { useEffect, useState, useRef } from 'react';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';
import { Send, Search } from 'lucide-react';
import ChatRoomCard from '../components/chat/ChatRoomCard';
import MessageBubble from '../components/chat/MessageBubble';

const ChatPage: React.FC = () => {
  const { 
    chatRooms, 
    activeRoom, 
    messages, 
    isLoading, 
    error, 
    getChatRooms, 
    setActiveRoom, 
    joinRoom, 
    leaveRoom, 
    sendMessage: sendChatMessage
  } = useChatStore();
  
  const { user } = useAuthStore();
  
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [joinedRooms, setJoinedRooms] = useState<string[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Fetch chat rooms on mount
  useEffect(() => {
    getChatRooms();
  }, [getChatRooms]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Handle joining a chat room
  const handleJoinRoom = async (roomId: string) => {
    if (joinedRooms.includes(roomId)) {
      // Already joined, so set as active
      await setActiveRoom(roomId);
    } else {
      // Join the room first, then set as active
      await joinRoom(roomId);
      setJoinedRooms([...joinedRooms, roomId]);
      await setActiveRoom(roomId);
    }
  };
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (messageText.trim() && activeRoom) {
      sendChatMessage(messageText);
      setMessageText('');
    }
  };
  
  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Filter chat rooms based on search query
  const filteredChatRooms = chatRooms.filter(room => 
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chat Room List */}
        <div className="md:col-span-1">
          <div className="card p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Chat Rooms</h2>
            
            {/* Search */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                className="input pl-10 w-full"
                placeholder="Search chat rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Room List */}
            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent-gold"></div>
              </div>
            ) : error ? (
              <div className="p-4 text-center">
                <p className="text-error mb-2">{error}</p>
                <button
                  onClick={getChatRooms}
                  className="btn btn-primary btn-sm"
                >
                  Try Again
                </button>
              </div>
            ) : filteredChatRooms.length === 0 ? (
              <div className="p-4 text-center">
                <p className="text-gray-400">No chat rooms found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredChatRooms.map((room) => (
                  <ChatRoomCard
                    key={room.id}
                    chatRoom={room}
                    onJoin={handleJoinRoom}
                    isJoined={joinedRooms.includes(room.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="md:col-span-2">
          <div className="card overflow-hidden flex flex-col h-[70vh]">
            {activeRoom ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-primary-light">
                  <div>
                    <h3 className="font-bold">{activeRoom.name}</h3>
                    <p className="text-sm text-gray-400">{activeRoom.memberCount} members</p>
                  </div>
                  <div className="text-sm">
                    <span className="badge badge-outline">
                      {activeRoom.category}
                    </span>
                  </div>
                </div>
                
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 bg-primary/50">
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <p className="text-gray-400 mb-2">No messages yet</p>
                        <p className="text-sm text-gray-500">Be the first to send a message!</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {messages.map((message) => (
                        <MessageBubble
                          key={message.id}
                          message={message}
                          isCurrentUser={message.senderId === user?.id}
                        />
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>
                
                {/* Message Input */}
                <div className="p-3 border-t border-gray-800 bg-primary-light">
                  <div className="flex">
                    <input
                      type="text"
                      className="input flex-1 mr-2"
                      placeholder="Type your message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <button
                      onClick={handleSendMessage}
                      className="btn btn-primary"
                      disabled={!messageText.trim()}
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center px-8">
                  <h3 className="text-xl font-bold mb-2">Select a Chat Room</h3>
                  <p className="text-gray-400 mb-4">
                    Join a chat room from the list to start messaging
                  </p>
                  <p className="text-sm text-gray-500">
                    Chat rooms are categorized by interests and themes.
                    All members can participate in public chat rooms.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;