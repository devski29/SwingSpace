import { create } from 'zustand';
import { Post, Comment } from '../types';
import { 
  fetchPosts, 
  createPost, 
  deletePost, 
  likePost, 
  createComment, 
  deleteComment 
} from '../services/contentService';

interface ContentState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  filter: 'newest' | 'popular' | 'following';
  category: string | null;
  
  // Actions
  getPosts: () => Promise<void>;
  addPost: (content: string, images?: string[]) => Promise<void>;
  removePost: (postId: string) => Promise<void>;
  toggleLike: (postId: string) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<void>;
  removeComment: (postId: string, commentId: string) => Promise<void>;
  setFilter: (filter: 'newest' | 'popular' | 'following') => void;
  setCategory: (category: string | null) => void;
  clearError: () => void;
}

export const useContentStore = create<ContentState>((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,
  filter: 'newest',
  category: null,
  
  getPosts: async () => {
    const { filter, category } = get();
    set({ isLoading: true, error: null });
    try {
      const posts = await fetchPosts(filter, category);
      set({ posts, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch posts', 
        isLoading: false 
      });
    }
  },
  
  addPost: async (content: string, images?: string[]) => {
    set({ isLoading: true, error: null });
    try {
      const newPost = await createPost(content, images);
      const { posts } = get();
      set({ posts: [newPost, ...posts], isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create post', 
        isLoading: false 
      });
    }
  },
  
  removePost: async (postId: string) => {
    set({ isLoading: true, error: null });
    try {
      await deletePost(postId);
      const { posts } = get();
      set({ posts: posts.filter(post => post.id !== postId), isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete post', 
        isLoading: false 
      });
    }
  },
  
  toggleLike: async (postId: string) => {
    try {
      await likePost(postId);
      const { posts } = get();
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      });
      set({ posts: updatedPosts });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to like post'
      });
    }
  },
  
  addComment: async (postId: string, content: string) => {
    try {
      const newComment = await createComment(postId, content);
      const { posts } = get();
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      });
      set({ posts: updatedPosts });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add comment'
      });
    }
  },
  
  removeComment: async (postId: string, commentId: string) => {
    try {
      await deleteComment(postId, commentId);
      const { posts } = get();
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return { 
            ...post, 
            comments: post.comments.filter(comment => comment.id !== commentId) 
          };
        }
        return post;
      });
      set({ posts: updatedPosts });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to remove comment'
      });
    }
  },
  
  setFilter: (filter) => set({ filter }),
  setCategory: (category) => set({ category }),
  clearError: () => set({ error: null }),
}));