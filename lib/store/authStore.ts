import { create } from 'zustand';
import { User } from '@/types/user'; // адаптуй шлях до типу

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  isLoaded: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  setIsLoaded: (loaded: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(set => ({
  isAuthenticated: false,
  user: null,
  isLoaded: false,

  setUser: (user: User) => {
    set(() => ({
      user,
      isAuthenticated: true,
      isLoaded: true,
    }));
  },

  clearIsAuthenticated: () => {
    set(() => ({
      user: null,
      isAuthenticated: false,
      isLoaded: false,
    }));
  },

  setIsLoaded: (loaded: boolean) => {
    set(() => ({ isLoaded: loaded }));
  },
}));
