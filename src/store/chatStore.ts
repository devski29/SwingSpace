import { create } from 'zustand';
import { ChatRoom, Message } from '../types';
import { 
  fetchChatRooms,
  fetchMessages,
  sendMessage,
  joinChatRoom,
  leaveChatRoom
} from '../services/chatService';

interface ChatState {
  chatRooms: ChatRoom[];
  activeRoom: ChatRoom | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  
  // Chat room actions
  getChatRooms: () => Promise<void>;
  setActiveRoom: (roomId: string) => Promise<void>;
  joinRoom: (roomId: string) => Promise<void>;
  leaveRoom: (roomId: string) => Promise<void>;
  
  // Message actions
  getMessages: (roomId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  
  clearError: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chatRooms: [],
  activeRoom: null,
  messages: [],
  isLoading: false,
  error: null,
  
  getChatRooms: async () => {
    set({ isLoading: true, error: null });
    try {
      const chatRooms = await fetchChatRooms();
      set({ chatRooms, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch chat rooms', 
        isLoading: false 
      });
    }
  },
  
  setActiveRoom: async (roomId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { chatRooms } = get();
      const activeRoom = chatRooms.find(room => room.id === roomId) || null;
      
      if (activeRoom) {
        const messages = await fetchMessages(roomId);
        set({ activeRoom, messages, isLoading: false });
      } else {
        throw new Error('Chat room not found');
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to set active room', 
        isLoading: false 
      });
    }
  },
  
  joinRoom: async (roomId: string) => {
    set({ isLoading: true, error: null });
    try {
      await joinChatRoom(roomId);
      
      // Update room member count
      const { chatRooms } = get();
      const updatedRooms = chatRooms.map(room => {
        if (room.id === roomId) {
          return { ...room, memberCount: room.memberCount + 1 };
        }
        return room;
      });
      
      set({ chatRooms: updatedRooms, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to join chat room', 
        isLoading: false 
      });
    }
  },
  
  leaveRoom: async (roomId: string) => {
    set({ isLoading: true, error: null });
    try {
      await leaveChatRoom(roomId);
      
      // Update room member count
      const { chatRooms, activeRoom } = get();
      const updatedRooms = chatRooms.map(room => {
        if (room.id === roomId) {
          return { ...room, memberCount: room.memberCount - 1 };
        }
        return room;
      });
      
      // Clear active room if it's the one we're leaving
      if (activeRoom && activeRoom.id === roomId) {
        set({ activeRoom: null, messages: [] });
      }
      
      set({ chatRooms: updatedRooms, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to leave chat room', 
        isLoading: false 
      });
    }
  },
  
  getMessages: async (roomId: string) => {
    set({ isLoading: true, error: null });
    try {
      const messages = await fetchMessages(roomId);
      set({ messages, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch messages', 
        isLoading: false 
      });
    }
  },
  
  sendMessage: async (content: string) => {
    const { activeRoom } = get();
    if (!activeRoom) {
      set({ error: 'No active chat room selected' });
      return;
    }
    
    try {
      const newMessage = await sendMessage(activeRoom.id, content);
      const { messages } = get();
      set({ messages: [...messages, newMessage] });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to send message'
      });
    }
  },
  
  clearError: () => set({ error: null }),
}));