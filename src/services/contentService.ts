import { Post, Comment } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock posts database
const posts: Post[] = [
  {
    id: '1',
    userId: '1',
    content: 'Just added some exclusive new content to my premium gallery! Check it out and let me know what you think. 🔥',
    images: ['https://i.postimg.cc/brZSx1NM/photo-18-2025-05-02-21-08-07.png'],
    likes: 48,
    comments: [
      {
        id: 'c1',
        userId: '2',
        postId: '1',
        content: 'Amazing as always! Can\'t wait to see more.',
        createdAt: new Date('2023-05-08T15:30:00')
      }
    ],
    createdAt: new Date('2023-05-08T14:20:00'),
    isPublic: true
  },
  {
    id: '2',
    userId: '1',
    content: 'Feeling playful today! 💋',
    images: ['https://i.postimg.cc/t4qZD0TW/ch5.png'],
    likes: 92,
    comments: [],
    createdAt: new Date('2023-05-07T23:45:00'),
    isPublic: false
  },
  {
    id: '3',
    userId: '1',
    content: 'New video drop! 💋 Premium subscribers, check your inbox for the full version!',
    video: 'https://media-hosting.imagekit.io/2e9b7140dc8e48b9/website.MP4',
    likes: 76,
    comments: [
      {
        id: 'c2',
        userId: '2',
        postId: '3',
        content: 'Absolutely stunning!',
        createdAt: new Date('2023-05-06T10:15:00')
      }
    ],
    createdAt: new Date('2023-05-06T09:30:00'),
    isPublic: false
  },
  {
    id: '4',
    userId: '1',
    content: 'Strike a pose 📸✨',
    images: ['https://i.postimg.cc/3J7dJM2V/photo-9-2025-05-02-21-08-07.png'],
    likes: 124,
    comments: [],
    createdAt: new Date('2023-05-05T18:20:00'),
    isPublic: true
  },
  {
    id: '5',
    userId: '1',
    content: 'Premium content alert! 🔥 Check out my latest photoshoot',
    images: ['https://i.postimg.cc/J0KmzFLC/20.png'],
    likes: 156,
    comments: [],
    createdAt: new Date('2023-05-04T15:45:00'),
    isPublic: false
  },
  {
    id: '6',
    userId: '1',
    content: 'Living my best life 💫',
    images: ['https://i.postimg.cc/66cMYK6f/ch8.png'],
    likes: 88,
    comments: [],
    createdAt: new Date('2023-05-03T12:30:00'),
    isPublic: true
  }
];

// Helper: delay to simulate network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch posts
export const fetchPosts = async (
  filter: 'newest' | 'popular' | 'following' = 'newest'
): Promise<Post[]> => {
  await delay(800); // Simulate network delay
  
  let filteredPosts = [...posts];
  
  // Apply sorting based on filter
  switch (filter) {
    case 'popular':
      return filteredPosts.sort((a, b) => b.likes - a.likes);
    case 'following':
      // In a real app, we would filter by followed users
      // For demo, return as is
      return filteredPosts;
    case 'newest':
    default:
      return filteredPosts.sort((a, b) => 
        b.createdAt.getTime() - a.createdAt.getTime()
      );
  }
};

// Create post
export const createPost = async (
  content: string, 
  images?: string[]
): Promise<Post> => {
  await delay(600); // Simulate network delay
  
  const newPost: Post = {
    id: uuidv4(),
    userId: '1', // Assuming current user is the first user
    content,
    images,
    likes: 0,
    comments: [],
    createdAt: new Date(),
    isPublic: true
  };
  
  posts.unshift(newPost);
  return newPost;
};

// Delete post
export const deletePost = async (postId: string): Promise<void> => {
  await delay(500); // Simulate network delay
  
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex === -1) {
    throw new Error('Post not found');
  }
  
  posts.splice(postIndex, 1);
};

// Like post
export const likePost = async (postId: string): Promise<void> => {
  await delay(300); // Simulate network delay
  
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    throw new Error('Post not found');
  }
  
  post.likes += 1;
};

// Create comment
export const createComment = async (
  postId: string, 
  content: string
): Promise<Comment> => {
  await delay(400); // Simulate network delay
  
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    throw new Error('Post not found');
  }
  
  const newComment: Comment = {
    id: uuidv4(),
    userId: '1', // Assuming current user
    postId,
    content,
    createdAt: new Date()
  };
  
  post.comments.push(newComment);
  return newComment;
};

// Delete comment
export const deleteComment = async (
  postId: string, 
  commentId: string
): Promise<void> => {
  await delay(400); // Simulate network delay
  
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    throw new Error('Post not found');
  }
  
  const commentIndex = post.comments.findIndex(c => c.id === commentId);
  
  if (commentIndex === -1) {
    throw new Error('Comment not found');
  }
  
  post.comments.splice(commentIndex, 1);
};

// Fetch user posts
export const fetchUserPosts = async (userId: string): Promise<Post[]> => {
  await delay(700); // Simulate network delay
  
  return posts
    .filter(post => post.userId === userId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};