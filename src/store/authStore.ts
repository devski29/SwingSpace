import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, SubscriptionTier } from '../types';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../services/authService';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const user = await loginUser(email, password);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to login', 
            isLoading: false,
            isAuthenticated: false 
          });
        }
      },
      
      register: async (email: string, password: string, username: string) => {
        set({ isLoading: true, error: null });
        try {
          const user = await registerUser(email, password, username);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to register', 
            isLoading: false,
            isAuthenticated: false 
          });
        }
      },
      
      logout: async () => {
        set({ isLoading: true });
        try {
          await logoutUser();
          set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to logout', 
            isLoading: false 
          });
        }
      },
      
      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const user = await getCurrentUser();
          if (user) {
            set({ user, isAuthenticated: true, isLoading: false });
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false });
          }
        } catch (error) {
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: error instanceof Error ? error.message : 'Authentication check failed' 
          });
        }
      },
      
      clearError: () => set({ error: null }),
      
      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...userData } });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);