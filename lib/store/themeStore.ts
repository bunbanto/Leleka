import { create } from 'zustand';

type Theme = 'girl' | 'boy' | 'anything';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>(set => ({
  theme: 'anything',
  setTheme: theme => set({ theme }),
}));
