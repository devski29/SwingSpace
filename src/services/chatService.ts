import { ChatRoom, Message } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock chat rooms database
const chatRooms: ChatRoom[] = [
  {
    id: '1',
    name: 'Lifestyle Discussions',
    description: 'Chat about alternative lifestyles, experiences, and advice.',
    category: 'lifestyle',
    memberCount: 245,
    createdAt: new Date('2022-09-15'),
    lastActive: new Date()
  },
  {
    id: '2',
    name: 'Fetish Fashion',
    description: 'Share and discuss your favorite fetish fashion, materials, and styles.',
    category: 'fashion',
    memberCount: 182,
    createdAt: new Date('2022-10-03'),
    lastActive: new Date('2023-05-09T21:45:00')
  },
  {
    id: '3',
    name: 'BDSM Community',
    description: 'Safe, sane, consensual discussions about BDSM practices and communities.',
    category: 'bdsm',
    memberCount: 310,
    createdAt: new Date('2022-08-22'),
    lastActive: new Date('2023-05-10T14:20:00')
  },
  {
    id: '4',
    name: 'Kink-Friendly Dating',
    description: 'Discuss navigating dating while being open about kinks and alternative lifestyles.',
    category: 'dating',
    memberCount: 198,
    createdAt: new Date('2022-11-05'),
    lastActive: new Date('2023-05-09T18:30:00')
  }
];

// Mock messages database
const messages: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1',
      senderId: '2',
      roomId: '1',
      content: 'Has anyone been to the lifestyle club in Soho? Looking for reviews before I check it out.',
      createdAt: new Date('2023-05-10T15:30:00'),
      read: true
    },
    {
      id: 'm2',
      senderId: '1',
      roomId: '1',
      content: 'I went last weekend! The atmosphere was amazing and the crowd was very welcoming. Highly recommend for newcomers.',
      createdAt: new Date('2023-05-10T15:32:00'),
      read: true
    },
    {
      id: 'm3',
      senderId: '2',
      roomId: '1',
      content: "Thanks for the info! I'll definitely check it out this weekend then.",
      createdAt: new Date('2023-05-10T15:35:00'),
      read: true
    }
  ],
  '2': [
    {
      id: 'm4',
      senderId: '1',
      roomId: '2',
      content: 'Just got a new leather harness that I absolutely love. Anyone have recommendations for matching accessories?',
      createdAt: new Date('2023-05-09T20:15:00'),
      read: true
    },
    {
      id: 'm5',
      senderId: '2',
      roomId: '2',
      content: 'Chokers or wrist cuffs in the same leather style would look amazing. I get mine from BlackRose Designs online.',
      createdAt: new Date('2023-05-09T20:18:00'),
      read: true
    }
  ],
  '3': [],
  '4': []
};

// Private messages database
const privateMessages: Message[] = [];

// Helper: delay to simulate network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch chat rooms
export const fetchChatRooms = async (): Promise<ChatRoom[]> => {
  await delay(800); // Simulate network delay
  return chatRooms;
};

// Fetch messages for a chat room
export const fetchMessages = async (roomId: string): Promise<Message[]> => {
  await delay(600); // Simulate network delay
  
  if (!messages[roomId]) {
    return [];
  }
  
  return messages[roomId].sort((a, b) => 
    a.createdAt.getTime() - b.createdAt.getTime()
  );
};

// Send a message to a chat room
export const sendMessage = async (
  roomId: string, 
  content: string
): Promise<Message> => {
  await delay(300); // Simulate network delay
  
  const newMessage: Message = {
    id: uuidv4(),
    senderId: '1', // Assuming current user
    roomId,
    content,
    createdAt: new Date(),
    read: false
  };
  
  if (!messages[roomId]) {
    messages[roomId] = [];
  }
  
  messages[roomId].push(newMessage);
  
  // Update the last active timestamp for the room
  const room = chatRooms.find(r => r.id === roomId);
  if (room) {
    room.lastActive = new Date();
  }
  
  return newMessage;
};

// Join a chat room
export const joinChatRoom = async (roomId: string): Promise<void> => {
  await delay(500); // Simulate network delay
  
  const room = chatRooms.find(r => r.id === roomId);
  
  if (!room) {
    throw new Error('Chat room not found');
  }
  
  // In a real app, we would add the user to the room's members
  room.memberCount += 1;
};

// Leave a chat room
export const leaveChatRoom = async (roomId: string): Promise<void> => {
  await delay(500); // Simulate network delay
  
  const room = chatRooms.find(r => r.id === roomId);
  
  if (!room) {
    throw new Error('Chat room not found');
  }
  
  // In a real app, we would remove the user from the room's members
  room.memberCount = Math.max(0, room.memberCount - 1);
};

// Send a private message
export const sendPrivateMessage = async (
  receiverId: string, 
  content: string
): Promise<Message> => {
  await delay(300); // Simulate network delay
  
  const newMessage: Message = {
    id: uuidv4(),
    senderId: '1', // Assuming current user
    receiverId,
    content,
    createdAt: new Date(),
    read: false
  };
  
  privateMessages.push(newMessage);
  return newMessage;
};

// Fetch private messages with a user
export const fetchPrivateMessages = async (userId: string): Promise<Message[]> => {
  await delay(600); // Simulate network delay
  
  // Get messages where the current user is either the sender or receiver
  return privateMessages
    .filter(msg => 
      (msg.senderId === '1' && msg.receiverId === userId) || 
      (msg.senderId === userId && msg.receiverId === '1')
    )
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
};