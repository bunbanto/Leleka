'use client';
import { useAuthStore } from '@/lib/store/authStore';
import { useThemeStore } from '@/lib/store/themeStore';
import { useEffect } from 'react';

export default function ThemeBodyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // STORE

  const theme = useThemeStore(state => state.theme);
  const { user } = useAuthStore();

  const setTheme = useThemeStore(state => state.setTheme);

  useEffect(() => {
    if (user?.gender) {
      switch (user.gender) {
        case 'дівчинка':
          setTheme('girl');
          break;
        case 'хлопчик':
          setTheme('boy');
          break;
        default:
          setTheme('anything');
      }
    }
  }, [user?.gender, setTheme]);

  return <body className={`theme-${theme}`}>{children}</body>;
}
